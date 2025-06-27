'use client';

import StatusDisplay from '@/components/status-display';
import { useTRPC } from '@/trpc/client';
import { useSuspenseQuery } from '@tanstack/react-query';
import { DataTable } from '@/components/data-table';
import { columns } from '../components/columns';

const MeetingsView = () => {
  const trpc = useTRPC();

  const { data } = useSuspenseQuery(trpc.meetings.getMany.queryOptions({}));

  return (
    <div className=''>
      <DataTable columns={columns} data={data.items} />

      {data.items.length === 0 && (
        <StatusDisplay
          title='Create your meetings'
          description='Schedule a meeting to connect with others. Each meeting lets you collaborate with participants in real-time.'
          type='empty'
          className='max-w-md'
        />
      )}
    </div>
  );
};

export default MeetingsView;

export const MeetingsViewLoading = () => (
  <StatusDisplay
    title='Loading Meetings'
    description='This may take a few seconds...'
  />
);

export const MeetingsViewError = () => (
  <StatusDisplay
    title='Error loading meetings'
    description='Please try again later.'
    type='error'
  />
);
