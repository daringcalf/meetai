import { auth } from '@/lib/auth';
import AgentsListHeader, {
  AgentsListHeaderLoading,
} from '@/modules/agents/ui/components/agents-list-header';
import AgentsView, {
  AgentsViewError,
  AgentsViewLoading,
} from '@/modules/agents/ui/views/agents-view';
import { getQueryClient, trpc } from '@/trpc/server';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

const AgentsPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect('/sign-in');
  }

  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(trpc.agents.getMany.queryOptions());

  return (
    <div className='flex flex-col gap-4 p-4 md:px-8 flex-1'>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<AgentsListHeaderLoading />}>
          <ErrorBoundary fallback={<AgentsListHeaderLoading />}>
            <AgentsListHeader />
          </ErrorBoundary>
        </Suspense>

        <Suspense fallback={<AgentsViewLoading />}>
          <ErrorBoundary fallback={<AgentsViewError />}>
            <AgentsView />
          </ErrorBoundary>
        </Suspense>
      </HydrationBoundary>
    </div>
  );
};

export default AgentsPage;
