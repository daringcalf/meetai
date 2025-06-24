import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

interface SidebarSeparatorProps {
  className?: string;
}

const SidebarSeparator = ({ className }: SidebarSeparatorProps) => {
  return (
    <div className={cn('px-4 py-2', className)}>
      <Separator className='opacity-10 text-[#5D6B68]' />
    </div>
  );
};

export default SidebarSeparator;
