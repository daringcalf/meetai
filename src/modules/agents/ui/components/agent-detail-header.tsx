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

/**
 * Props for the AgentDetailHeader component
 * @param agentName - The name of the agent to display in breadcrumb
 * @param agentsListPath - The path to the agents list page, defaults to '/agents'
 * @param onEdit - Callback function triggered when edit action is clicked
 * @param onDelete - Callback function triggered when delete action is clicked
 */
interface AgentDetailHeaderProps {
  agentName?: string;
  agentsListPath?: string;
  onEdit?: () => void;
  onDelete?: () => void;
}

const AgentDetailHeader = ({
  agentName,
  agentsListPath = '/agents',
  onEdit,
  onDelete,
}: AgentDetailHeaderProps) => {
  const isMobile = useIsMobile();

  return (
    <header className='flex items-center justify-between h-9'>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem className='text-lg font-semibold'>
            <BreadcrumbLink href={agentsListPath}>My Agents</BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage className='font-semibold text-base'>
              {agentName !== undefined ? (
                agentName
              ) : (
                <Skeleton className='h-4 w-24' />
              )}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {isMobile ? (
        // without modal={false}, the dialog that this dropdown opens cause the page to get unclickable
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild>
            <Button variant='outline' size='icon' aria-label='More actions'>
              <MoreVertical />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align='end'>
            <DropdownMenuItem
              onClick={onEdit}
              className='h-12'
              aria-label='Edit agent'
            >
              <Edit />
              Edit
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem
              onClick={onDelete}
              className='h-12'
              aria-label='Delete agent'
            >
              <Trash2 className='text-destructive' />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <div className='flex gap-3'>
          <Button
            variant='outline'
            size='sm'
            onClick={onDelete}
            aria-label='Delete agent'
          >
            <Trash2 className='text-destructive' />
            Delete
          </Button>

          <Button
            variant='outline'
            size='sm'
            onClick={onEdit}
            aria-label='Edit agent'
          >
            <Edit />
            Edit
          </Button>
        </div>
      )}
    </header>
  );
};

export default AgentDetailHeader;
