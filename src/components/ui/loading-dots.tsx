import { cn } from '@/lib/utils';

interface LoadingDotsProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const LoadingDots = ({ className, size = 'md' }: LoadingDotsProps) => {
  const dotSizes = {
    sm: 'w-1 h-1',
    md: 'w-1.5 h-1.5',
    lg: 'w-2 h-2',
  };

  const gaps = {
    sm: 'gap-1',
    md: 'gap-1.5',
    lg: 'gap-2',
  };

  return (
    <div className={cn('flex', gaps[size], className)}>
      <div
        className={cn(
          dotSizes[size],
          'bg-muted-foreground rounded-full animate-pulse'
        )}
      />
      <div
        className={cn(
          dotSizes[size],
          'bg-muted-foreground rounded-full animate-pulse delay-200'
        )}
      />
      <div
        className={cn(
          dotSizes[size],
          'bg-muted-foreground rounded-full animate-pulse delay-400'
        )}
      />
    </div>
  );
};

export default LoadingDots;
