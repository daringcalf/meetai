import { Button } from '@/components/ui/button';
import { signIn } from '@/lib/auth-client';
import { useState } from 'react';
import { toast } from 'sonner';
import BrandIcon from '@/components/brand-icon';

type Provider = 'google' | 'github';
const callbackURL = '/';

interface SocialSignOnProps {
  pending?: boolean;
}

const SocialSignOn = ({ pending }: SocialSignOnProps) => {
  const [disabled, setDisabled] = useState<boolean>(false);

  const onSocialSignOn = async (provider: Provider) => {
    setDisabled(true);

    await signIn.social(
      {
        provider,
        callbackURL,
      },
      {
        onError: (error) => {
          toast.error(
            error?.error?.message || `Failed to sign in with ${provider}`,
            {
              description: 'Please try again.',
              duration: 5000,
            }
          );
        },
        // Don't use onSuccess for social sign-in
        // The success handling happens after OAuth redirect
      }
    );
  };

  return (
    <div className='grid grid-cols-2 gap-4'>
      <Button
        variant='outline'
        disabled={pending || disabled}
        onClick={() => onSocialSignOn('google')}
      >
        <BrandIcon name='siGoogle' />
        Google
      </Button>
      <Button
        variant='outline'
        disabled={pending || disabled}
        onClick={() => onSocialSignOn('github')}
        className='flex items-center gap-2'
      >
        <BrandIcon name='siGithub' />
        GitHub
      </Button>
    </div>
  );
};

export default SocialSignOn;
