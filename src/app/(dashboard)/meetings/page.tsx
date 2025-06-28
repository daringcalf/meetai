import { auth } from '@/lib/auth';
import { loadSearchParams } from '@/modules/meetings/params';
import MeetingsFilters from '@/modules/meetings/ui/components/filters/meetings-filters';
import MeetingsListHeader, {
  MeetingsListHeaderLoading,
} from '@/modules/meetings/ui/components/meetings-list-header';
import MeetingsView, {
  MeetingsViewError,
  MeetingsViewLoading,
} from '@/modules/meetings/ui/views/meetings-view';
import { getQueryClient, trpc } from '@/trpc/server';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { type SearchParams } from 'nuqs/server';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

const MeetingsPage = async ({
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
    trpc.meetings.getMany.queryOptions({
      ...filters,
    })
  );

  return (
    <>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<MeetingsListHeaderLoading />}>
          <ErrorBoundary fallback={<MeetingsListHeaderLoading />}>
            <MeetingsListHeader />
          </ErrorBoundary>
        </Suspense>
      </HydrationBoundary>

      <MeetingsFilters />

      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<MeetingsViewLoading />}>
          <ErrorBoundary fallback={<MeetingsViewError />}>
            <MeetingsView />
          </ErrorBoundary>
        </Suspense>
      </HydrationBoundary>
    </>
  );
};

export default MeetingsPage;
