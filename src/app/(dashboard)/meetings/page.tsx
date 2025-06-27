import { auth } from '@/lib/auth';
import { loadSearchParams } from '@/modules/agents/params';
import MeetingsListHeader, {
  MeetingsListHeaderLoading,
} from '@/modules/meetings/ui/components/meetings-list-header';
import MeetingsSearchFilter from '@/modules/meetings/ui/components/meetings-search-filter';
import MeetingsView, {
  MeetingsViewError,
  MeetingsViewLoading,
} from '@/modules/meetings/ui/views/meetings-view';
import { getQueryClient, trpc } from '@/trpc/server';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { type SearchParams } from 'nuqs';
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

  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(trpc.meetings.getMany.queryOptions({}));

  return (
    <>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<MeetingsListHeaderLoading />}>
          <ErrorBoundary fallback={<MeetingsListHeaderLoading />}>
            <MeetingsListHeader />
          </ErrorBoundary>
        </Suspense>
      </HydrationBoundary>

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
