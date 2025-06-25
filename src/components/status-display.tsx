import { Loader2, AlertCircle, Bot } from 'lucide-react';
import { Card } from './ui/card';
import { cn } from '@/lib/utils';

interface StatusDisplayProps {
  title: string;
  description: string;
  type?: 'loading' | 'error' | 'empty';
  className?: string;
}

const StatusDisplay = ({
  title,
  description,
  type = 'loading',
  className,
}: StatusDisplayProps) => {
  if (type === 'empty') {
    return (
      <div className='flex items-center justify-center h-full'>
        <Card className={cn('p-8 border-none bg-white shadow-none', className)}>
          <div className='flex flex-col items-center gap-3'>
            <Bot />
            <h6 className='text-base font-medium text-gray-800'>{title}</h6>
            <p className='text-sm text-gray-500 text-center'>{description}</p>
          </div>
        </Card>
      </div>
    );
  }

  const isError = type === 'error';

  return (
    <div className='grid place-items-center h-full'>
      <Card
        className={cn(
          'p-8 border-none shadow-sm',
          isError
            ? 'bg-gradient-to-br from-rose-50 to-rose-100'
            : 'bg-gradient-to-br from-emerald-50 to-emerald-100'
        )}
      >
        <div className='flex items-center space-x-4'>
          {isError ? (
            <AlertCircle className='h-8 w-8 text-rose-600' />
          ) : (
            <Loader2 className='h-8 w-8 text-emerald-600 animate-spin' />
          )}
          <div className='flex flex-col space-y-1'>
            <h6 className='text-lg font-semibold text-gray-800'>{title}</h6>
            <p className='text-sm text-gray-600'>{description}</p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default StatusDisplay;
