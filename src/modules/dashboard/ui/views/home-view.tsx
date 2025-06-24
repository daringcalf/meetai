'use client';

import { Button } from '@/components/ui/button';
import { useSession, signOut } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';

export default function HomeView() {
  const router = useRouter();

  const { data: session } = useSession();

  if (!session) {
    return (
      <div className='flex flex-col items-center justify-center min-h-dvh gap-4'>
        <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900'></div>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className='flex flex-col items-center justify-center p-4 gap-4'>
      <h1>Welcome, {session.user.name}!</h1>
      <p>Email: {session.user.email}</p>
      <Button
        onClick={() =>
          signOut({
            fetchOptions: {
              onSuccess: () => {
                router.push('/sign-in');
              },
            },
          })
        }
      >
        Sign Out
      </Button>
    </div>
  );
}
