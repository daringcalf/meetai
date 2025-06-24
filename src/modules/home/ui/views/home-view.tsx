'use client';

import { useTRPC } from '@/trpc/client';
import { useQuery } from '@tanstack/react-query';

export default function HomeView() {
  const trpc = useTRPC();
  const { data } = useQuery(trpc.hello.queryOptions({ text: 'haha' }));

  return (
    <div className='flex flex-col items-center justify-center p-4 gap-4'>
      <h1 className='text-2xl font-bold'>Welcome to the Home View</h1>
      <p className='text-gray-600'>{data?.greeting}</p>
    </div>
  );
}
