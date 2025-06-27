'use client';

import { useState } from 'react';
import NewMeetingDialog from './new-meeting-dialog';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { useTRPC } from '@/trpc/client';
import { useSuspenseQuery } from '@tanstack/react-query';

const MeetingsListHeader = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const trpc = useTRPC();
  void useSuspenseQuery(trpc.meetings.getMany.queryOptions({}));

  return (
    <>
      <NewMeetingDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} />

      <MeetingsListHeaderTemplate
        onNewMeetingClick={() => setIsDialogOpen(true)}
      />
    </>
  );
};

export default MeetingsListHeader;

interface MeetingsListHeaderTemplateProps {
  disabled?: boolean;
  onNewMeetingClick?: () => void;
}

const MeetingsListHeaderTemplate = ({
  disabled,
  onNewMeetingClick,
}: MeetingsListHeaderTemplateProps) => {
  return (
    <div className='flex items-center justify-between h-9'>
      <h5 className='text-lg font-semibold'>My Meetings</h5>
      <Button onClick={onNewMeetingClick} disabled={disabled}>
        <Plus />
        New Meeting
      </Button>
    </div>
  );
};

export const MeetingsListHeaderLoading = () => (
  <MeetingsListHeaderTemplate disabled />
);
