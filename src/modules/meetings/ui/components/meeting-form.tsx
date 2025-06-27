import { useTRPC } from '@/trpc/client';
import { type MeetingGetOne } from '../../types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { z } from 'zod/v4';
import { meetingsInsertSchema } from '../../schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Check, Loader2 } from 'lucide-react';
import { useState } from 'react';
import ComboBoxResponsive from '@/components/combobox-responsive';
import UserAvatar from '@/components/user-avatar';
import NewAgentDialog from '@/modules/agents/ui/components/new-agent-dialog';

interface MeetingFormProps {
  onSuccess?: (id?: string) => void;
  onCancel?: () => void;
  initialValues?: MeetingGetOne;
}

const MeetingForm = ({
  onSuccess,
  onCancel,
  initialValues,
}: MeetingFormProps) => {
  const trpc = useTRPC();
  const queryClient = useQueryClient();

  const [agentSearch, setAgentSearch] = useState('');
  const [openNewAgentDialog, setOpenNewAgentDialog] = useState(false);

  const agents = useQuery(
    trpc.agents.getMany.queryOptions({
      pageSize: 100,
      search: agentSearch,
    })
  );

  const createMutation = useMutation(
    trpc.meetings.createOne.mutationOptions({
      onSuccess: (meeting) => {
        queryClient.invalidateQueries(trpc.meetings.getMany.queryOptions({}));

        if (initialValues?.id) {
          queryClient.invalidateQueries(
            trpc.meetings.getOne.queryOptions({ id: initialValues.id })
          );
        }

        toast.success(`Meeting "${meeting.name}" created successfully!`, {
          description: 'You can now use your new meeting.',
        });

        // TODO: invalidate free tier usage
        onSuccess?.(meeting.id);
      },
      onError: (error) => {
        toast.error(
          `Failed to create meeting: ${error.message || 'Unknown error'}`,
          {
            description: 'Please try again later.',
            duration: 5000,
          }
        );
      },
    })
  );

  const updateMutation = useMutation(
    trpc.meetings.updateOne.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries(trpc.meetings.getMany.queryOptions({}));

        if (initialValues?.id) {
          queryClient.invalidateQueries(
            trpc.meetings.getOne.queryOptions({ id: initialValues.id })
          );
        }

        toast.success(
          `Meeting "${initialValues?.name}" updated successfully!`,
          {
            description: 'Your changes have been saved.',
          }
        );

        onSuccess?.();
      },
      onError: (error) => {
        toast.error(
          `Failed to update meeting: ${error.message || 'Unknown error'}`,
          {
            description: 'Please try again later.',
            duration: 5000,
          }
        );

        // TODO: check if error dcode is 'FORBIDDEN', redirect to "/upgrade"
      },
    })
  );

  const form = useForm<z.infer<typeof meetingsInsertSchema>>({
    resolver: zodResolver(meetingsInsertSchema),
    defaultValues: {
      name: initialValues?.name ?? '',
      agentId: initialValues?.agentId ?? '',
    },
  });

  const isEditing = initialValues?.id !== undefined;
  const isPending = createMutation.isPending || updateMutation.isPending;

  const onSubmit = (values: z.infer<typeof meetingsInsertSchema>) => {
    if (isEditing) {
      updateMutation.mutate({
        ...values,
        id: initialValues.id,
      });

      return;
    }

    createMutation.mutate(values);
  };

  return (
    <>
      <NewAgentDialog
        open={openNewAgentDialog}
        onOpenChange={setOpenNewAgentDialog}
      />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
          <FormField
            name='name'
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>

                <FormControl>
                  <Input
                    {...field}
                    placeholder='Enter meeting name'
                    autoComplete='off'
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name='agentId'
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Agent</FormLabel>

                <FormControl>
                  <ComboBoxResponsive
                    options={(agents.data?.items ?? []).map((agent) => ({
                      value: agent.id,
                      listLabel: (
                        <div className='flex items-center gap-2 pl-2 pr-8 overflow-hidden'>
                          <UserAvatar
                            name={agent.name}
                            style='thumbs'
                            className='border border-border/20'
                          />
                          <span className='truncate'>{agent.name}</span>
                          <span className='text-sm text-muted-foreground truncate'>
                            {agent.instructions}
                          </span>
                        </div>
                      ),
                      label: (
                        <div className='flex items-center gap-2 pr-4 overflow-hidden'>
                          <UserAvatar
                            name={agent.name}
                            style='thumbs'
                            className='border border-border/20'
                          />
                          <span className='truncate'>{agent.name}</span>
                        </div>
                      ),
                    }))}
                    onSelect={field.onChange}
                    value={field.value}
                    placeholder='Select an agent'
                    isLoading={agents.isLoading}
                    onSearch={setAgentSearch}
                    emptyMessage={
                      agents.isLoading ? 'Loading agents...' : 'No agents found'
                    }
                    searchPlaceholder='Search agents...'
                  />
                </FormControl>

                <FormDescription>
                  Or create a
                  <Button
                    type='button'
                    variant='link'
                    className='px-2'
                    onClick={() => {
                      setOpenNewAgentDialog(true);
                    }}
                  >
                    new agent
                  </Button>
                </FormDescription>

                <FormMessage />
              </FormItem>
            )}
          />

          <div className='flex justify-end gap-2'>
            {onCancel && (
              <Button
                variant='outline'
                type='button'
                disabled={isPending}
                onClick={onCancel}
              >
                Cancel
              </Button>
            )}

            <Button type='submit' disabled={isPending}>
              {isEditing && updateMutation.isPending && (
                <>
                  <Loader2 className='animate-spin' />
                  Saving...
                </>
              )}
              {isEditing && !updateMutation.isPending && (
                <>
                  <Check />
                  Save
                </>
              )}
              {!isEditing && createMutation.isPending && (
                <>
                  <Loader2 className='animate-spin' />
                  Creating...
                </>
              )}
              {!isEditing && !createMutation.isPending && (
                <>
                  <Check />
                  Create
                </>
              )}
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};

export default MeetingForm;
