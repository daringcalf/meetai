import { auth } from '@/lib/auth';
import { loadSearchParams } from '@/modules/agents/params';
import AgentsListHeader, {
  AgentsListHeaderLoading,
} from '@/modules/agents/ui/components/agents-list-header';
import AgentsSearchFilter from '@/modules/agents/ui/components/agents-search-filter';
import AgentsView, {
  AgentsViewError,
  AgentsViewLoading,
} from '@/modules/agents/ui/views/agents-view';
import { getQueryClient, trpc } from '@/trpc/server';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { type SearchParams } from 'nuqs/server';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

const AgentsPage = async ({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect('/sign-in');
  }

  const filters = await loadSearchParams(searchParams);

  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(
    trpc.agents.getMany.queryOptions({
      ...filters,
    })
  );

  return (
    <>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<AgentsListHeaderLoading />}>
          <ErrorBoundary fallback={<AgentsListHeaderLoading />}>
            <AgentsListHeader />
          </ErrorBoundary>
        </Suspense>
      </HydrationBoundary>

      <AgentsSearchFilter />

      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<AgentsViewLoading />}>
          <ErrorBoundary fallback={<AgentsViewError />}>
            <AgentsView />
          </ErrorBoundary>
        </Suspense>
      </HydrationBoundary>
    </>
  );
};

export default AgentsPage;
