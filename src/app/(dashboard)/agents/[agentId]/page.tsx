import AgentDetailView, {
  AgentDetailViewError,
  AgentDetailViewLoading,
} from '@/modules/agents/ui/views/agent-detail-view';
import { getQueryClient, trpc } from '@/trpc/server';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

const AgentPage = async ({
  params,
}: {
  params: Promise<{ agentId: string }>;
}) => {
  const { agentId } = await params;

  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(
    trpc.agents.getOne.queryOptions({ id: agentId })
  );

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<AgentDetailViewLoading />}>
        <ErrorBoundary fallback={<AgentDetailViewError />}>
          <AgentDetailView agentId={agentId} />
        </ErrorBoundary>
      </Suspense>
    </HydrationBoundary>
  );
};

export default AgentPage;
