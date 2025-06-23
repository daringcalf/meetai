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
import { useState } from 'react';
import { signIn } from '@/lib/auth-client';
import { toast } from 'sonner';
import AuthBrandColumn from '../components/auth-brand-column';
import AuthSeparator from '../components/auth-separator';
import AuthFooter from '../components/auth-footer';
import AuthToggle from '../components/auth-toggle';
import SocialSignOn from '../components/social-sign-on';

const formSchema = z.object({
  email: z.email(),
  password: z.string().min(1, 'Password is required'),
});

export const callbackURL = '/';

const SignInView = () => {
  const [authPending, setAuthPending] = useState<boolean>(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setAuthPending(true);

    await signIn.email(
      {
        ...data,
        callbackURL,
      },
      {
        onError: (error) => {
          toast.error(error?.error?.message || 'Sign in failed', {
            description: 'Please check your credentials and try again.',
            duration: 5000,
          });
          setAuthPending(false);
        },
      }
    );
  };

  return (
    <div className='flex flex-col gap-6'>
      <Card className='p-0 overflow-hidden'>
        <CardContent className='grid p-0 md:grid-cols-2'>
          {/* Left Column: Sign In Form */}
          <div className='flex flex-col gap-6 p-6 md:p-8'>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className='flex flex-col gap-6'
              >
                <header className='flex flex-col items-center justify-center'>
                  <h1 className='text-2xl font-bold'>Welcome back</h1>
                  <p className='text-muted-foreground text-sm'>
                    Please sign in to your account
                  </p>
                </header>

                <div className='grid gap-3'>
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
                </div>

                <Button type='submit' disabled={authPending}>
                  {authPending && <Loader2 className='animate-spin' />}
                  {authPending ? 'Signing In...' : 'Sign In'}
                </Button>
              </form>
            </Form>

            <AuthSeparator />

            <SocialSignOn />

            <AuthToggle
              promptText="Don't have an account?"
              linkText='Sign Up'
              href='/sign-up'
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

export default SignInView;
