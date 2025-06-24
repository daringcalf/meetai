'use client';

import StatusDisplay from '@/components/status-display';
import { useTRPC } from '@/trpc/client';
import { useSuspenseQuery } from '@tanstack/react-query';

const AgentsView = () => {
  const trpc = useTRPC();

  const { data } = useSuspenseQuery(trpc.agents.getMany.queryOptions());

  return <div>{JSON.stringify(data, null, 2)}</div>;
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
