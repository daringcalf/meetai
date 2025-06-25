import { useTRPC } from '@/trpc/client';
import { AgentGetOne } from '../../types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { z } from 'zod/v4';
import { agentsInsertSchema } from '../../schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import UserAvatar from '@/components/user-avatar';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface AgentFormProps {
  onSuccess?: () => void;
  onCancel?: () => void;
  initialValues?: AgentGetOne;
}

const AgentForm = ({ onSuccess, onCancel, initialValues }: AgentFormProps) => {
  const trpc = useTRPC();
  const queryClient = useQueryClient();

  const createAgent = useMutation(
    trpc.agents.create.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries(trpc.agents.getMany.queryOptions({}));

        if (initialValues?.id) {
          queryClient.invalidateQueries(
            trpc.agents.getOne.queryOptions({ id: initialValues.id })
          );
        }

        onSuccess?.();
      },
      onError: (error) => {
        toast.error(
          `Failed to create agent: ${error.message || 'Unknown error'}`
        );
      },
    })
  );

  const form = useForm<z.infer<typeof agentsInsertSchema>>({
    resolver: zodResolver(agentsInsertSchema),
    defaultValues: {
      name: initialValues?.name ?? '',
      instructions: initialValues?.instructions ?? '',
    },
  });

  const isEditing = Boolean(initialValues?.id);
  const isPending = createAgent.isPending;

  const onSubmit = (values: z.infer<typeof agentsInsertSchema>) => {
    if (isEditing) {
      // Handle update logic here
      return;
    }

    createAgent.mutate(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
        <UserAvatar
          name={form.watch('name')}
          style='thumbs'
          className='border size-16'
        />

        <FormField
          name='name'
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>

              <FormControl>
                <Input
                  {...field}
                  placeholder='Enter agent name'
                  onPointerDown={(e) => e.stopPropagation()}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name='instructions'
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Instructions</FormLabel>

              <FormControl>
                <Textarea
                  {...field}
                  rows={6}
                  placeholder='E.g. "You are a helpful assistant that summarizes meeting notes in bullet points."'
                  onPointerDown={(e) => e.stopPropagation()}
                />
              </FormControl>

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
            {isEditing ? 'Save' : 'Create'}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default AgentForm;
