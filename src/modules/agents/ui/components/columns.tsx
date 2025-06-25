'use client';

import { ColumnDef } from '@tanstack/react-table';
import { AgentGetOne } from '../../types';
import UserAvatar from '@/components/user-avatar';
import { CornerDownRight } from 'lucide-react';

export const columns: ColumnDef<AgentGetOne>[] = [
  {
    accessorKey: 'name',
    header: 'Agent Name',
    cell: ({ row }) => (
      <div className='flex flex-col gap-1 md:p-1'>
        <div className='flex gap-2 items-center'>
          <UserAvatar
            name={row.original.name}
            style='thumbs'
            className='size-8 border border-border/20 rounded-sm'
          />
          <h6 className='text-base font-medium'>{row.original.name}</h6>
        </div>

        <div className='flex items-center gap-2 pl-4'>
          <CornerDownRight className='size-4 text-muted-foreground' />
          <p className='text-sm text-muted-foreground max-w-96 truncate'>
            {row.original.instructions}
          </p>
        </div>
      </div>
    ),
  },
];
