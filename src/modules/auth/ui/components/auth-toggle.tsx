import { Button } from '@/components/ui/button';

interface AuthToggleProps {
  promptText: string;
  linkText: string;
  disabled?: boolean;
  onClick: () => void;
}

const AuthToggle = ({
  promptText: text,
  linkText,
  disabled = false,
  onClick,
}: AuthToggleProps) => {
  return (
    <p className='text-muted-foreground text-sm text-center'>
      {text}
      <Button variant='link' size='sm' disabled={disabled} onClick={onClick}>
        {linkText}
      </Button>
    </p>
  );
};

export default AuthToggle;
