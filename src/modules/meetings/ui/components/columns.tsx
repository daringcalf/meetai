'use client';

import { ColumnDef } from '@tanstack/react-table';
import { MeetingGetMany } from '../../types';
import UserAvatar from '@/components/user-avatar';
import {
  CircleCheck,
  CircleX,
  ClockArrowUp,
  ClockFading,
  CornerDownRight,
  Loader,
} from 'lucide-react';
import { format } from 'date-fns';
import { cn, formatDuration } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

const statusIconMap = {
  upcoming: ClockArrowUp,
  active: Loader,
  completed: CircleCheck,
  processing: Loader,
  cancelled: CircleX,
};

const statusColorMap = {
  upcoming: 'bg-yellow-500/20  text-yellow-800 border-yellow-800/5',
  active: 'bg-blue-500/20 text-blue-800 border-blue-800/5',
  completed: 'bg-emerald-500/20 text-emerald-800 border-emerald-800/5',
  processing: 'bg-gray-300/20 text-gray-800 border-gray-800/5',
  cancelled: 'bg-rose-500/20 text-rose-800 border-rose-800/5',
};

type Meeting = MeetingGetMany[number];

export const columns: ColumnDef<Meeting>[] = [
  {
    accessorKey: 'name',
    header: 'Meeting Name',
    cell: ({ row }) => (
      <div className='flex flex-col gap-1 md:p-1'>
        <h2 className='text-base font-medium'>{row.original.name}</h2>

        <div className='flex items-center gap-2 pl-4'>
          <CornerDownRight className='size-4 text-muted-foreground' />

          <div className='flex items-center gap-2'>
            <p className='text-sm text-muted-foreground max-w-96 truncate'>
              {row.original.agent.name}
            </p>

            <UserAvatar
              name={row.original.agent.name}
              style='thumbs'
              className='size-6 border border-border/20 rounded-sm'
            />
          </div>

          <span className='text-sm text-muted-foreground'>
            {row.original.startedAt && format(row.original.startedAt, 'MMM dd')}
          </span>
        </div>
      </div>
    ),
  },

  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const status = row.original.status;
      const Icon = statusIconMap[status];

      return (
        <Badge className={cn('capitalize', statusColorMap[status])}>
          <Icon className={cn({ 'animate-spin': status === 'processing' })} />
          {status}
        </Badge>
      );
    },
  },

  {
    accessorKey: 'duration',
    header: 'Duration',
    cell: ({ row }) => (
      <Badge variant='outline'>
        <ClockFading />
        {row.original.duration
          ? formatDuration(row.original.duration)
          : 'No Duration'}
      </Badge>
    ),
  },
];
