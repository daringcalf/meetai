'use client';

import { Card, CardContent } from '@/components/ui/card';
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
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { signUp } from '@/lib/auth-client';
import { toast } from 'sonner';
import AuthBrandColumn from '../components/auth-brand-column';
import AuthSeparator from '../components/auth-separator';
import AuthFooter from '../components/auth-footer';
import AuthToggle from '../components/auth-toggle';
import SocialSignOn from '../components/social-sign-on';
import { redirectURL } from './sign-in-view';

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
        router.push(redirectURL);
      },
    });
  };

  return (
    <div className='flex flex-col gap-6'>
      <Card className='p-0 overflow-hidden'>
        <CardContent className='grid p-0 md:grid-cols-2'>
          {/* Left Column: Sign Up Form */}
          <div className='flex flex-col gap-6 p-6 md:p-8'>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className='flex flex-col gap-6'
                // https://github.com/vercel/next.js/issues/77710
                suppressHydrationWarning
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

            <AuthSeparator />

            <SocialSignOn pending={authPending} />

            <AuthToggle
              promptText='Already have an account?'
              linkText='Sign In'
              href='/sign-in'
              disabled={authPending}
            />
          </div>

          <AuthBrandColumn />
        </CardContent>
      </Card>

      <AuthFooter />
    </div>
  );
};

export default SignUpView;
