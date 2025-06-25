'use client';

import { useState } from 'react';
import NewAgentDialog from './new-agent-dialog';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { useTRPC } from '@/trpc/client';
import { useSuspenseQuery } from '@tanstack/react-query';

const AgentsListHeader = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const trpc = useTRPC();
  void useSuspenseQuery(trpc.agents.getMany.queryOptions());

  return (
    <>
      <NewAgentDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} />

      <AgentsListHeaderTemplate onNewAgentClick={() => setIsDialogOpen(true)} />
    </>
  );
};

export default AgentsListHeader;

interface AgentsListHeaderTemplateProps {
  disabled?: boolean;
  onNewAgentClick?: () => void;
}

const AgentsListHeaderTemplate = ({
  disabled,
  onNewAgentClick,
}: AgentsListHeaderTemplateProps) => {
  return (
    <div className='flex items-center justify-between'>
      <h5 className='text-lg font-semibold'>My Agents</h5>
      <Button onClick={onNewAgentClick} disabled={disabled}>
        <Plus />
        New Agent
      </Button>
    </div>
  );
};

export const AgentsListHeaderLoading = () => (
  <AgentsListHeaderTemplate disabled />
);
