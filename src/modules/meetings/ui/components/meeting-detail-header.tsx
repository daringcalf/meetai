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

/**
 * Props for the MeetingDetailHeader component
 * @param meetingName - The name of the meeting to display in breadcrumb
 * @param meetingsListPath - The path to the meetings list page, defaults to '/meetings'
 * @param onEdit - Callback function triggered when edit action is clicked
 * @param onDelete - Callback function triggered when delete action is clicked
 */
interface MeetingDetailHeaderProps {
  meetingName?: string;
  meetingsListPath?: string;
  onEdit?: () => void;
  onDelete?: () => void;
}

const MeetingDetailHeader = ({
  meetingName,
  meetingsListPath = '/meetings',
  onEdit,
  onDelete,
}: MeetingDetailHeaderProps) => {
  return (
    <header className='flex items-center justify-between h-9'>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem className='text-lg font-semibold'>
            <BreadcrumbLink href={meetingsListPath}>My Meetings</BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage className='font-semibold text-base'>
              {meetingName !== undefined ? (
                meetingName
              ) : (
                <Skeleton className='h-4 w-24' />
              )}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Mobile dropdown - hidden on desktop */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild disabled={!onEdit && !onDelete}>
          <Button
            variant='outline'
            size='icon'
            aria-label='More actions'
            className='md:hidden'
          >
            <MoreVertical />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align='end'>
          <DropdownMenuItem
            onClick={onEdit}
            className='h-12'
            aria-label='Edit meeting'
          >
            <Edit />
            Edit
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem
            onClick={onDelete}
            className='h-12'
            aria-label='Delete meeting'
          >
            <Trash2 className='text-destructive' />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Desktop buttons - hidden on mobile */}
      <div className='hidden md:flex gap-3'>
        <Button
          variant='outline'
          size='sm'
          onClick={onEdit}
          aria-label='Edit meeting'
          disabled={!onEdit}
        >
          <Edit />
          Edit
        </Button>

        <Button
          variant='outline'
          size='sm'
          onClick={onDelete}
          aria-label='Delete meeting'
          disabled={!onDelete}
        >
          <Trash2 className='text-destructive' />
          Delete
        </Button>
      </div>
    </header>
  );
};

export default MeetingDetailHeader;
