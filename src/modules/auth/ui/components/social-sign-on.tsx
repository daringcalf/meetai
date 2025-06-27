import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '@/components/ui/dialog';
import { signIn } from '@/lib/auth-client';
import { useState } from 'react';
import { toast } from 'sonner';
import BrandIcon from '@/components/brand-icon';
import StatusDisplay from '@/components/status-display';
import * as siIcons from 'simple-icons/icons';

const callbackURL = '/';
interface Provider {
  name: 'google' | 'github';
  label: string;
  siName: keyof typeof siIcons;
}

const providers: Provider[] = [
  {
    name: 'google',
    label: 'Google',
    siName: 'siGoogle',
  },
  {
    name: 'github',
    label: 'GitHub',
    siName: 'siGithub',
  },
];

interface SocialSignOnProps {
  pending?: boolean;
}

const SocialSignOn = ({ pending }: SocialSignOnProps) => {
  const [isRedirecting, setIsRedirecting] = useState<boolean>(false);
  const [authProvider, setAuthProvider] = useState<Provider | null>(null);

  const onSocialSignOn = async (provider: Provider) => {
    setIsRedirecting(true);
    setAuthProvider(provider);

    await signIn.social(
      {
        provider: provider.name,
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
          setIsRedirecting(false);
        },
        // Don't use onSuccess for social sign-in
        // The success handling happens after OAuth redirect
      }
    );
  };

  return (
    <>
      <Dialog open={isRedirecting}>
        <DialogTitle className='sr-only'>
          Redirecting to {authProvider?.label}
        </DialogTitle>
        <DialogDescription className='sr-only'>
          Redirecting to {authProvider?.label} for authentication.
        </DialogDescription>

        <DialogContent
          className='border-none shadow-none p-0 w-fit bg-transparent focus-visible:outline-none'
          showCloseButton={false}
        >
          <StatusDisplay
            title='Redirecting...'
            description={`Redirecting to ${authProvider?.label} for authentication.`}
            type='loading'
          />
        </DialogContent>
      </Dialog>

      <div className='grid grid-cols-2 gap-4'>
        {providers.map((provider) => (
          <Button
            key={provider.name}
            variant='outline'
            disabled={pending || isRedirecting}
            onClick={() => onSocialSignOn(provider)}
          >
            <BrandIcon name={provider.siName} />
            {provider.label}
          </Button>
        ))}
      </div>
    </>
  );
};

export default SocialSignOn;
