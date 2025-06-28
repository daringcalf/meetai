'use client';

import { useTRPC } from '@/trpc/client';
import { useMeetingFilters } from '../../../hooks/use-meeting-filters';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import ComboBoxResponsive from '@/components/combobox-responsive';
import UserAvatar from '@/components/user-avatar';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

interface AgentIdFilterProps {
  disabled?: boolean;
}

const AgentIdFilter = ({ disabled }: AgentIdFilterProps) => {
  const [filters, setFilters] = useMeetingFilters();
  const trpc = useTRPC();

  const [agentSearch, setAgentSearch] = useState('');

  const { data: agents, isLoading: isLoadingAgents } = useQuery(
    trpc.agents.getMany.queryOptions({
      pageSize: 100,
      search: agentSearch,
    })
  );

  // TODO: Add error handling for agent fetching

  const onClearFilters = () => {
    setFilters({ agentId: null });
  };

  return (
    <div className='flex items-center gap-2 max-w-sm'>
      <ComboBoxResponsive
        placeholder='Select agent'
        options={(agents?.items ?? []).map((agent) => ({
          label: (
            <div className='flex items-center gap-2 max-w-48 overflow-hidden'>
              <UserAvatar name={agent.name} style='thumbs' />
              <span className='truncate'>{agent.name}</span>
            </div>
          ),
          value: agent.id,
          listLabel: (
            <div className='grid grid-cols-[136px_1fr] items-center gap-4 overflow-hidden pr-8'>
              <div className='flex items-center gap-2 overflow-hidden'>
                <UserAvatar
                  name={agent.name}
                  style='thumbs'
                  className='border border-border/20'
                />
                <span className='truncate' title={agent.name}>
                  {agent.name}
                </span>
              </div>
              <span
                className='text-sm text-muted-foreground truncate'
                title={agent.instructions}
              >
                {agent.instructions}
              </span>
            </div>
          ),
        }))}
        value={filters.agentId}
        onSelect={(value) => {
          setFilters({
            agentId: value,
          });
        }}
        onSearch={setAgentSearch}
        emptyMessage='No agents found'
        searchPlaceholder='Search agents...'
        isLoading={isLoadingAgents}
      />

      <Button
        variant='outline'
        onClick={onClearFilters}
        disabled={disabled || !filters.agentId}
        className='gap-1'
      >
        <X />
        Clear
      </Button>
    </div>
  );
};

export default AgentIdFilter;
