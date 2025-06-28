'use client';

import { Input } from '@/components/ui/input';
import { useMeetingFilters } from '../../../hooks/use-meeting-filters';
import { Search, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DEFAULT_PAGE } from '@/constants';
import { useRef, useState, useEffect } from 'react';
import { useDebouncedCallback } from 'use-debounce';

interface MeetingsSearchFilterProps {
  disabled?: boolean;
}

const MeetingsSearchFilter = ({ disabled }: MeetingsSearchFilterProps) => {
  const [filters, setFilters] = useMeetingFilters();
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [searchValue, setSearchValue] = useState(filters.search);

  // Sync local state with filter state when filters change externally
  useEffect(() => {
    setSearchValue(filters.search);
  }, [filters.search]);

  const onClearFilters = () => {
    setFilters({ search: '', page: DEFAULT_PAGE });
    setSearchValue('');
    searchInputRef.current?.focus();
  };

  const debouncedSearch = useDebouncedCallback((value: string) => {
    setFilters({ search: value });
  }, 500);

  const handleSearchChange = (value: string) => {
    setSearchValue(value);
    debouncedSearch(value);
  };

  return (
    <div className='relative flex items-center max-w-96 gap-2'>
      <Search className='absolute left-2 size-4 text-muted-foreground' />

      <Input
        ref={searchInputRef}
        value={searchValue}
        onChange={(e) => handleSearchChange(e.target.value)}
        placeholder='Search meetings...'
        className='px-7 shadow-none'
        disabled={disabled}
        name='search'
        autoComplete='off'
      />

      <Button
        variant='outline'
        onClick={onClearFilters}
        disabled={disabled || !filters.search}
        className='gap-1'
      >
        <X />
        Clear
      </Button>
    </div>
  );
};

export default MeetingsSearchFilter;
