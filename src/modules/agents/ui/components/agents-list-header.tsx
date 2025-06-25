'use client';

import { useState, useEffect } from 'react';
import NewAgentDialog from './new-agent-dialog';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { useTRPC } from '@/trpc/client';
import { useQuery } from '@tanstack/react-query';

const AgentsListHeader = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const trpc = useTRPC();

  const { isLoading } = useQuery({
    ...trpc.agents.getMany.queryOptions(),
    enabled: isMounted,
  });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <>
      <NewAgentDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} />

      <div className='flex items-center justify-between'>
        <h5 className='text-lg font-semibold'>My Agents</h5>

        <Button
          onClick={() => setIsDialogOpen(true)}
          disabled={!isMounted || isLoading}
        >
          <Plus />
          New Agent
        </Button>
      </div>
    </>
  );
};

export default AgentsListHeader;
