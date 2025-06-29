import { auth } from '@/lib/auth';
import MeetingDetailView, {
  MeetingDetailViewError,
  MeetingDetailViewLoading,
} from '@/modules/meetings/ui/views/meeting-detail-view';
import { getQueryClient, trpc } from '@/trpc/server';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

const MeetingDetailPage = async ({
  params,
}: {
  params: Promise<{ meetingId: string }>;
}) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect('/sign-in');
  }

  const { meetingId } = await params;

  const queryClient = getQueryClient();

  void queryClient.prefetchQuery(
    trpc.meetings.getOne.queryOptions({
      id: meetingId,
    })
  );

  // TODO: prefetch meeting transcripts

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<MeetingDetailViewLoading />}>
        <ErrorBoundary fallback={<MeetingDetailViewError />}>
          <MeetingDetailView meetingId={meetingId} />
        </ErrorBoundary>
      </Suspense>
    </HydrationBoundary>
  );
};

export default MeetingDetailPage;
