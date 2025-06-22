'use client';

import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { z } from 'zod/v4';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { signUp } from '@/lib/auth-client';
import { toast } from 'sonner';

const formSchema = z
  .object({
    name: z.string().min(1, 'Name is required'),
    email: z.email(),
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters long')
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        'Password must contain at least one uppercase letter, one lowercase letter, and one number'
      ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

const SignUpView = () => {
  const router = useRouter();

  const [authPending, setAuthPending] = useState<boolean>(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setAuthPending(true);

    await signUp.email(data, {
      onError: (error) => {
        toast.error(error?.error?.message || 'Sign up failed', {
          description: 'Please check your credentials and try again.',
          duration: 5000,
        });
        setAuthPending(false);
      },
      onSuccess: () => {
        router.push('/');
      },
    });
  };

  return (
    <div className='flex flex-col gap-6'>
      <Card className='p-0 overflow-hidden'>
        <CardContent className='grid p-0 md:grid-cols-2'>
          <div className='flex flex-col gap-6 p-6 md:p-8'>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className='flex flex-col gap-6'
              >
                <header className='flex flex-col items-center justify-center'>
                  <h1 className='text-2xl font-bold'>Let's get you started</h1>
                  <p className='text-muted-foreground text-sm'>
                    Create your account
                  </p>
                </header>

                <div className='grid gap-3'>
                  <FormField
                    control={form.control}
                    name='name'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder='Your name' />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name='email'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type='email'
                            placeholder='your-email@example.com'
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name='password'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input {...field} type='password' placeholder='***' />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name='confirmPassword'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Confirm Password</FormLabel>
                        <FormControl>
                          <Input {...field} type='password' placeholder='***' />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <Button type='submit' disabled={authPending}>
                  {authPending && <Loader2 className='animate-spin' />}
                  {authPending ? 'Signing Up...' : 'Sign Up'}
                </Button>
              </form>
            </Form>

            <div className='flex items-center gap-2'>
              <Separator className='flex-1' />
              <span className='text-muted-foreground text-sm'>
                Or continue with
              </span>
              <Separator className='flex-1' />
            </div>

            <div className='grid grid-cols-2 gap-4'>
              <Button variant='outline' disabled={true}>
                Google (Coming Soon)
              </Button>
              <Button variant='outline' disabled={true}>
                GitHub (Coming Soon)
              </Button>
            </div>

            <p className='text-muted-foreground text-sm text-center'>
              Already have an account?{' '}
              <Button
                variant='link'
                size='sm'
                disabled={authPending}
                onClick={() => router.push('/sign-in')}
              >
                Sign In
              </Button>
            </p>
          </div>

          <div className='relative hidden md:flex flex-col items-center justify-center bg-radial from-emerald-700 to-emerald-900'>
            <Image
              src='logo.svg'
              alt='Logo'
              width={200}
              height={200}
              className='size-24'
            />

            <p className='text-white text-2xl font-semibold'>Meet・AI</p>
          </div>
        </CardContent>
      </Card>

      <footer>
        <p className='text-xs text-muted-foreground text-center'>
          By clicking continue, you agree to our{' '}
          <Link
            href='/terms'
            className='underline hover:text-primary'
            target='_blank'
            rel='noopener noreferrer'
          >
            Terms of Service
          </Link>{' '}
          and{' '}
          <Link
            href='/privacy'
            className='underline hover:text-primary'
            target='_blank'
            rel='noopener noreferrer'
          >
            Privacy Policy
          </Link>
          .
        </p>
      </footer>
    </div>
  );
};

export default SignUpView;
