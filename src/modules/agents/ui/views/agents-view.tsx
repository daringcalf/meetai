'use client';

import StatusDisplay from '@/components/status-display';
import { useTRPC } from '@/trpc/client';
import { useSuspenseQuery } from '@tanstack/react-query';
import { DataTable } from '../components/data-table';
import { columns } from '../components/columns';
import { useAgentFilters } from '../../hooks/use-agent-filters';

const AgentsView = () => {
  const [filters] = useAgentFilters();
  const trpc = useTRPC();

  const { data } = useSuspenseQuery(
    trpc.agents.getMany.queryOptions({
      ...filters,
    })
  );

  return (
    <div className=''>
      <DataTable columns={columns} data={data.items} />
      {data.items.length === 0 && (
        <StatusDisplay
          title='Create your agents'
          description='Create agents to join your meeting. Each agent can have its own set of instructions and can interact with participants during the call.'
          type='empty'
          className='max-w-md'
        />
      )}
    </div>
  );
};

export default AgentsView;

export const AgentsViewLoading = () => (
  <StatusDisplay
    title='Loading Agents'
    description='This may take a few seconds...'
  />
);

export const AgentsViewError = () => (
  <StatusDisplay
    title='Error loading agents'
    description='Please try again later.'
    type='error'
  />
);
