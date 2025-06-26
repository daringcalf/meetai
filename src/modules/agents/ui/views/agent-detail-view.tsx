'use client';

import StatusDisplay from '@/components/status-display';
import { useTRPC } from '@/trpc/client';
import { useSuspenseQuery } from '@tanstack/react-query';
import AgentDetailHeader from '../components/agent-detail-header';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import UserAvatar from '@/components/user-avatar';

interface AgentDetailViewProps {
  agentId: string;
}

const AgentDetailView = ({ agentId }: AgentDetailViewProps) => {
  const trpc = useTRPC();

  const { data: agent } = useSuspenseQuery(
    trpc.agents.getOne.queryOptions({ id: agentId })
  );

  return (
    <>
      <AgentDetailHeader
        agentName={agent.name}
        onEdit={() => {}}
        onDelete={() => {}}
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
        </CardHeader>

        <CardContent className='px-4 md:px-8'>
          <h3 className='text-base font-semibold mb-2'>Instructions</h3>

          {agent.instructions}
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
