'use client';

import { useMeetingFilters } from '@/modules/meetings/hooks/use-meeting-filters';
import AgentIdFilter from './agent-id-filter';
import MeetingsSearchFilter from './search-filter';
import StatusFilter from './status-filter';
import { Button } from '@/components/ui/button';

const MeetingsFilters = () => {
  const [filters, setFilters] = useMeetingFilters();

  const onClearFilters = () => {
    setFilters({
      agentId: null,
      status: null,
      search: '',
      page: 1,
    });
  };

  return (
    <div className='flex items-center gap-4 flex-wrap'>
      <MeetingsSearchFilter />
      <StatusFilter />
      <AgentIdFilter />

      <Button
        variant='outline'
        onClick={onClearFilters}
        disabled={!filters.agentId && !filters.status && !filters.search}
      >
        Clear All Filters
      </Button>
    </div>
  );
};

export default MeetingsFilters;
