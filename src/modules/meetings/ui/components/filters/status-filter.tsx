'use client';

import {
  CircleCheck,
  CircleX,
  ClockArrowUp,
  Loader,
  Video,
  X,
} from 'lucide-react';
import { MeetingStatus } from '../../../types';
import { useMeetingFilters } from '../../../hooks/use-meeting-filters';
import ComboBoxResponsive from '@/components/combobox-responsive';
import { Button } from '@/components/ui/button';

const options = [
  {
    status: MeetingStatus.Upcoming,
    icon: ClockArrowUp,
  },
  {
    status: MeetingStatus.Completed,
    icon: CircleCheck,
  },
  {
    status: MeetingStatus.Active,
    icon: Video,
  },
  {
    status: MeetingStatus.Processing,
    icon: Loader,
  },
  {
    status: MeetingStatus.Cancelled,
    icon: CircleX,
  },
];

interface StatusFilterProps {
  disabled?: boolean;
}

const StatusFilter = ({ disabled }: StatusFilterProps) => {
  const [filters, setFilters] = useMeetingFilters();

  const onClearFilters = () => {
    setFilters({ status: null });
  };

  return (
    <div className='flex items-center gap-2 max-w-sm'>
      <ComboBoxResponsive
        options={options.map((option) => ({
          label: (
            <div className='flex items-center gap-2'>
              <option.icon />
              {option.status}
            </div>
          ),
          value: option.status,
        }))}
        onSelect={(value) => {
          setFilters({ status: value as MeetingStatus });
        }}
        value={filters.status ?? ''}
        placeholder='Status'
      />

      <Button
        variant='outline'
        onClick={onClearFilters}
        disabled={disabled || !filters.status}
        className='gap-1'
      >
        <X />
        Clear
      </Button>
    </div>
  );
};

export default StatusFilter;
