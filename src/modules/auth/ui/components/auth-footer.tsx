import Link from 'next/link';

const AuthFooter = () => {
  return (
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
  );
};

export default AuthFooter;
