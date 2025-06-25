'use client';

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { SidebarInput, SidebarTrigger } from '@/components/ui/sidebar';
import useCommandSymbol from '@/hooks/use-command-symbol';
import { Search } from 'lucide-react';
import { useEffect, useState } from 'react';
import DashboardCommand from './dashboard-command';

const DashboardNavbar = () => {
  const commandSymbol = useCommandSymbol();

  const [comboBoxOpen, setComboBoxOpen] = useState(false);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setComboBoxOpen((open) => !open);
      }
    };

    document.addEventListener('keydown', down);

    return () => document.removeEventListener('keydown', down);
  }, []);

  return (
    <>
      <DashboardCommand open={comboBoxOpen} setOpen={setComboBoxOpen} />

      <nav className='flex items-center border-b bg-background gap-2 py-1 md:py-2 px-2'>
        <div className='flex items-center'>
          <SidebarTrigger className='size-9' />
          <Separator orientation='vertical' className='!h-6' />
        </div>

        <Button
          variant='ghost'
          size='sm'
          aria-label='Search'
          className='relative w-44 hover:bg-transparent !p-0'
          onClick={() => {
            setComboBoxOpen(true);
          }}
        >
          <Search className='absolute left-2 text-muted-foreground' />

          <SidebarInput
            placeholder='Search...'
            id='search-input'
            className='pl-7'
            readOnly
            // https://github.com/vercel/next.js/issues/77710
            suppressHydrationWarning
          />

          <div className='absolute right-2 flex gap-1'>
            <kbd className='bg-background text-muted-foreground flex h-5 items-center justify-center font-sans rounded border px-1 text-[0.7rem] font-medium'>
              {commandSymbol}
            </kbd>
            <kbd className='bg-background text-muted-foreground flex h-5 items-center justify-center font-sans rounded border px-1 text-[0.7rem] font-medium aspect-square'>
              K
            </kbd>
          </div>
        </Button>
      </nav>
    </>
  );
};

export default DashboardNavbar;
