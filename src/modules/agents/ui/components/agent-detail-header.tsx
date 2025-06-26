'use client';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Skeleton } from '@/components/ui/skeleton';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Edit, Trash2, MoreVertical } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

interface AgentDetailHeaderProps {
  agentName?: string;
  onEdit?: () => void;
  onDelete?: () => void;
}

const AgentDetailHeader = ({
  agentName,
  onEdit,
  onDelete,
}: AgentDetailHeaderProps) => {
  const isMobile = useIsMobile();

  return (
    <header className='flex items-center justify-between h-9'>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem className='text-lg font-semibold'>
            <BreadcrumbLink href='/agents'>My Agents</BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage className='font-semibold text-base'>
              {agentName ? agentName : <Skeleton className='h-4 w-24' />}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {isMobile ? (
        // without modal={false}, the dialog that this dropdown opens cause the page to get unclickable
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild>
            <Button variant='outline' size='icon'>
              <MoreVertical />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align='end'>
            <DropdownMenuItem onClick={onEdit} className='h-12'>
              <Edit />
              Edit
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem onClick={onDelete} className='h-12'>
              <Trash2 className='text-destructive' />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <div className='flex gap-3'>
          <Button variant='outline' size='sm' onClick={onDelete}>
            <Trash2 className='text-destructive' />
            Delete
          </Button>

          <Button variant='outline' size='sm' onClick={onEdit}>
            <Edit />
            Edit
          </Button>
        </div>
      )}
    </header>
  );
};

export default AgentDetailHeader;
