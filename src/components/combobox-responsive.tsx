'use client';

import { Button } from '@/components/ui/button';
import {
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
  CommandResponsiveDialog,
} from '@/components/ui/command';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { ChevronsUpDown } from 'lucide-react';
import LoadingDots from '@/components/ui/loading-dots';
import { useDebouncedCallback } from 'use-debounce';

interface ComboBoxResponsiveProps {
  options: Array<{
    value: string;
    label: React.ReactNode | string;
    listLabel?: React.ReactNode;
  }>;
  onSelect: (value: string) => void;
  onSearch?: (search: string) => void;
  value: string;
  placeholder?: string;
  className?: string;
  isLoading?: boolean;
}

const ComboBoxResponsive = ({
  options,
  onSelect,
  onSearch,
  value,
  placeholder = 'Select an option',
  className,
  isLoading = false,
}: ComboBoxResponsiveProps) => {
  const [open, setOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const selectedOption = options.find((option) => option.value === value);

  const debouncedSearch = useDebouncedCallback(
    (value: string) => {
      onSearch?.(value);
    },
    500 // 500ms delay
  );

  return (
    <div className='overflow-hidden'>
      <Button
        type='button'
        variant='outline'
        // Use aria-disabled instead of the native disabled attribute
        // so we can style the button (e.g., show a wait cursor).
        // It also informs screen readers that the button is disabled,
        // while still allowing us to control interaction manually.
        aria-disabled={isLoading}
        className={cn(
          'h-9 justify-between w-full font-normal',
          { 'text-muted-foreground': !selectedOption },
          { 'cursor-wait': isLoading },
          className
        )}
        onClick={(e) => {
          if (isLoading) {
            e.preventDefault();
            return;
          }
          onSearch?.(searchValue); // initiate options
          setOpen(true);
        }}
      >
        <span>
          {selectedOption?.label ?? placeholder} {isLoading && ' (Loading...)'}
        </span>

        <div className='flex items-center gap-2'>
          {isLoading && <LoadingDots />}
          <ChevronsUpDown />
        </div>
      </Button>

      <CommandResponsiveDialog
        open={open}
        onOpenChange={(isOpen) => {
          setOpen(isOpen);
          if (!isOpen) {
            setSearchValue('');
          }
        }}
        title='Select an option'
        description='Choose from the available options.'
        shouldFilter={!onSearch}
        // this is a workaround for ios keyboard issues
        // TODO: investigate for a better solution
        className='min-h-[500px]'
      >
        <CommandInput
          placeholder='Search agents...'
          value={searchValue}
          onValueChange={(value) => {
            setSearchValue(value);
            debouncedSearch(value);
          }}
          className='text-base disabled:cursor-wait'
          autoComplete='off'
          disabled={isLoading}
        />
        <CommandEmpty>
          <span className='text-muted-foreground'>
            {isLoading ? 'Loading...' : 'No agents found.'}
          </span>
        </CommandEmpty>

        {/* this is a workaround for ios keyboard issues
            TODO: investigate for a better solution */}
        <CommandList className='max-h-[450px]'>
          {options.map((option) => (
            <CommandItem
              key={option.value}
              onSelect={() => {
                onSelect(option.value);
                setOpen(false);
              }}
            >
              {option.listLabel ?? option.label}
            </CommandItem>
          ))}
        </CommandList>
      </CommandResponsiveDialog>
    </div>
  );
};

export default ComboBoxResponsive;
