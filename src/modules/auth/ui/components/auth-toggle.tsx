'use client';

import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

interface AuthToggleProps {
  promptText: string;
  linkText: string;
  href: string;
  disabled?: boolean;
}

const AuthToggle = ({
  promptText: text,
  linkText,
  href,
  disabled = false,
}: AuthToggleProps) => {
  const router = useRouter();

  return (
    <p className='text-muted-foreground text-sm text-center'>
      {text}
      <Button
        variant='link'
        size='sm'
        disabled={disabled}
        onClick={() => router.push(href)}
      >
        {linkText}
      </Button>
    </p>
  );
};

export default AuthToggle;
