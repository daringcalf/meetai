import { Separator } from '@/components/ui/separator';

const AuthSeparator = () => {
  return (
    <div className='flex items-center gap-2'>
      <Separator className='flex-1' />
      <span className='text-muted-foreground text-sm'>Or continue with</span>
      <Separator className='flex-1' />
    </div>
  );
};

export default AuthSeparator;
