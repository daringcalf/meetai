'use client';

import StatusDisplay from '@/components/status-display';
import { useTRPC } from '@/trpc/client';
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from '@tanstack/react-query';
import MeetingDetailHeader from '../components/meeting-detail-header';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import UserAvatar from '@/components/user-avatar';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import useConfirm from '@/hooks/use-confirm';
import { useState } from 'react';
import UpdateMeetingDialog from '../components/update-meeting-dialog';

interface MeetingDetailViewProps {
  meetingId: string;
}

const MeetingDetailView = ({ meetingId }: MeetingDetailViewProps) => {
  const trpc = useTRPC();
  const router = useRouter();
  const queryClient = useQueryClient();

  const { data: meeting } = useSuspenseQuery(
    trpc.meetings.getOne.queryOptions({ id: meetingId })
  );

  const [isDeleting, setIsDeleting] = useState(false);

  const deleteMutation = useMutation(
    trpc.meetings.deleteOne.mutationOptions({
      onSuccess: (meeting) => {
        queryClient.invalidateQueries(trpc.meetings.getMany.queryOptions({}));
        setIsDeleting(false);
        toast.success('Meeting deleted successfully', {
          description: `The meeting "${meeting.name}" has been deleted.`,
          id: 'delete-meeting',
        });
        // TODO: invalidate free tier usage
        router.push('/meetings');
      },
      onError: (error) => {
        setIsDeleting(false);
        toast.error(error.message || 'Failed to delete meeting', {
          description: 'Please try again later.',
          id: 'delete-meeting',
        });
      },
    })
  );

  const [DeleteConfirmation, deleteConfirm] = useConfirm(
    'Delete Meeting',
    `Are you sure you want to delete the meeting "${meeting.name}"? This action cannot be undone.`
  );

  const [UpdateMeetingDialogOpen, setUpdateMeetingDialogOpen] = useState(false);

  const handleDelete = async () => {
    const confirmed = await deleteConfirm();
    if (!confirmed) return;

    setIsDeleting(true);
    toast.loading('Deleting meeting...', {
      description: 'Please wait',
      id: 'delete-meeting',
    });

    deleteMutation.mutate({ id: meetingId });
  };

  const handleEdit = () => {
    setUpdateMeetingDialogOpen(true);
  };

  return (
    <>
      <DeleteConfirmation />

      <UpdateMeetingDialog
        open={UpdateMeetingDialogOpen}
        onOpenChange={setUpdateMeetingDialogOpen}
        initialValues={meeting}
      />

      <MeetingDetailHeader
        meetingName={meeting.name}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <Card className='px-0 py-4 md:py-8 gap-4 md:gap-8 shadow-none'>
        {isDeleting ? (
          <StatusDisplay
            title='Deleting Meeting'
            description='This may take a few seconds...'
            type='loading'
          />
        ) : (
          <>
            <CardHeader className='px-4 md:px-8'>
              <CardTitle className='flex items-center gap-4'>
                <UserAvatar
                  name={meeting.agent.name}
                  style='thumbs'
                  className='size-16 border border-border/20'
                />

                <h2 className='text-xl'>{meeting.name}</h2>
              </CardTitle>
            </CardHeader>

            <CardContent className='px-4 md:px-8'>
              <h3 className='text-base font-semibold mb-2'>Instructions</h3>

              <div className='whitespace-pre-wrap'>
                {meeting.agent.instructions}
              </div>
            </CardContent>
          </>
        )}
      </Card>
    </>
  );
};

export default MeetingDetailView;

export const MeetingDetailViewLoading = () => (
  <>
    <MeetingDetailHeader />

    <StatusDisplay
      title='Loading Meeting Details'
      description='This may take a few seconds...'
    />
  </>
);

export const MeetingDetailViewError = () => (
  <>
    <MeetingDetailHeader />

    <StatusDisplay
      title='Error loading meeting details'
      description='Please try again later.'
      type='error'
    />
  </>
);
