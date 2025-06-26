'use client';

import StatusDisplay from '@/components/status-display';
import { useTRPC } from '@/trpc/client';
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from '@tanstack/react-query';
import AgentDetailHeader from '../components/agent-detail-header';
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
import UpdateAgentDialog from '../components/update-agent-dialog';

interface AgentDetailViewProps {
  agentId: string;
}

const AgentDetailView = ({ agentId }: AgentDetailViewProps) => {
  const trpc = useTRPC();
  const router = useRouter();
  const queryClient = useQueryClient();

  const { data: agent } = useSuspenseQuery(
    trpc.agents.getOne.queryOptions({ id: agentId })
  );

  const deleteMutation = useMutation(
    trpc.agents.deleteOne.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries(trpc.agents.getMany.queryOptions({}));
        // TODO: invalidate free tier usage
        router.push('/agents');
      },
      onError: (error) => {
        toast.error(error.message || 'Failed to delete agent', {
          description: 'Please try again later.',
        });
      },
    })
  );

  const [DeleteConfirmation, deleteConfirm] = useConfirm(
    'Delete Agent',
    `Are you sure you want to delete the agent "${agent.name}"? This action cannot be undone.`
  );

  const [UpdateAgentDialogOpen, setUpdateAgentDialogOpen] = useState(false);

  const handleDelete = async () => {
    const confirmed = await deleteConfirm();
    if (!confirmed) return;

    deleteMutation.mutate({ id: agentId });
  };

  const handleEdit = () => {
    setUpdateAgentDialogOpen(true);
  };

  return (
    <>
      <DeleteConfirmation />

      <UpdateAgentDialog
        open={UpdateAgentDialogOpen}
        onOpenChange={setUpdateAgentDialogOpen}
        initialValues={agent}
      />

      <AgentDetailHeader
        agentName={agent.name}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <Card className='px-0 py-4 md:py-8 gap-4 md:gap-8 shadow-none'>
        <CardHeader className='px-4 md:px-8'>
          <CardTitle className='flex items-center gap-4'>
            <UserAvatar
              name={agent.name}
              style='thumbs'
              className='size-16 border border-border/20'
            />

            <h2 className='text-xl'>{agent.name}</h2>
          </CardTitle>

          <CardDescription></CardDescription>
          {/* CardDescription intentionally empty - reserved for future use */}
        </CardHeader>

        <CardContent className='px-4 md:px-8'>
          <h3 className='text-base font-semibold mb-2'>Instructions</h3>

          <div className='whitespace-pre-wrap'>{agent.instructions}</div>
        </CardContent>
      </Card>
    </>
  );
};

export default AgentDetailView;

export const AgentDetailViewLoading = () => (
  <>
    <AgentDetailHeader />

    <StatusDisplay
      title='Loading Agent Details'
      description='This may take a few seconds...'
    />
  </>
);

export const AgentDetailViewError = () => (
  <>
    <AgentDetailHeader />

    <StatusDisplay
      title='Error loading agent details'
      description='Please try again later.'
      type='error'
    />
  </>
);
