'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { signUp, useSession, signOut, signIn } from '@/lib/auth-client';
import { useState } from 'react';

export default function Home() {
  const { data: session } = useSession();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleCreateUser = async () => {
    const { data, error } = await signUp.email(
      { name, email, password },
      {
        onError: (ctx) => {
          console.error('Error signing up:', ctx.error);
        },
        onSuccess: () => {
          console.log('User created successfully');
        },
      }
    );
  };

  const handleSignIn = async () => {
    const { data, error } = await signIn.email(
      { email, password },
      {
        onError: (ctx) => {
          console.error('Error signing in:', ctx.error);
        },
        onSuccess: () => {
          console.log('User signed in successfully');
        },
      }
    );
  };

  if (session) {
    return (
      <div className='flex flex-col items-center justify-center p-4 gap-4'>
        <h1>Welcome, {session.user.name}!</h1>
        <p>Email: {session.user.email}</p>
        <Button onClick={() => signOut()}>Sign Out</Button>
      </div>
    );
  }

  return (
    <div className='flex flex-col items-center justify-center p-4 gap-4'>
      <Input
        placeholder='name'
        value={name}
        onChange={(e) => setName(e.target.value)}
        name='signUpName'
        id='signUpName'
      />
      <Input
        placeholder='email'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        name='signUpEmail'
      />
      <Input
        placeholder='password'
        type='password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        name='signUpPassword'
      />

      <Button onClick={handleCreateUser}>Create User</Button>

      <Input
        placeholder='email'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        name='signInEmail'
      />
      <Input
        placeholder='password'
        type='password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        name='signInPassword'
      />

      <Button onClick={handleSignIn}>Sign In</Button>
    </div>
  );
}
