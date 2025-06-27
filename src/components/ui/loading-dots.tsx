import { cn } from '@/lib/utils';

const dotAnimation = 'animate-bounce';
const delays = {
  sm: ['', 'delay-75', 'delay-150'],
  md: ['', 'delay-100', 'delay-200'],
  lg: ['', 'delay-150', 'delay-300'],
};

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
      {delays[size].map((delay, index) => (
        <div
          key={index}
          className={cn(
            dotSizes[size],
            'bg-muted-foreground rounded-full',
            dotAnimation,
            delay
          )}
        />
      ))}
    </div>
  );
};

export default LoadingDots;
