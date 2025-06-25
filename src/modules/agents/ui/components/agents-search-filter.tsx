'use client';

import { Input } from '@/components/ui/input';
import { useAgentFilters } from '../../hooks/use-agent-filters';
import { Search, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DEFAULT_PAGE } from '@/constants';
import { useRef } from 'react';

interface AgentsSearchFilterProps {
  disabled?: boolean;
}

const AgentsSearchFilter = ({ disabled }: AgentsSearchFilterProps) => {
  const [filters, setFilters] = useAgentFilters();
  const searchInputRef = useRef<HTMLInputElement>(null);

  const isAnyFilterModified = !!filters.search;

  const onClearFilters = () => {
    setFilters({ search: '', page: DEFAULT_PAGE });
    searchInputRef.current?.focus();
  };

  return (
    <div className='relative flex items-center max-w-96 gap-2'>
      <Search className='absolute left-2 size-4 text-muted-foreground' />

      <Input
        ref={searchInputRef}
        value={filters.search}
        onChange={(e) => setFilters({ search: e.target.value })}
        placeholder='Search agents...'
        className='px-7 shadow-none'
        disabled={disabled}
      />

      <Button
        variant='outline'
        onClick={onClearFilters}
        disabled={!isAnyFilterModified || disabled}
        className='gap-1'
      >
        <X />
        Clear
      </Button>
    </div>
  );
};

export default AgentsSearchFilter;
