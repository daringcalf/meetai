import { useTRPC } from '@/trpc/client';
import { type AgentGetOne } from '../../types';
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
import { Check, Loader2 } from 'lucide-react';

interface AgentFormProps {
  onSuccess?: () => void;
  onCancel?: () => void;
  initialValues?: AgentGetOne;
}

const AgentForm = ({ onSuccess, onCancel, initialValues }: AgentFormProps) => {
  const trpc = useTRPC();
  const queryClient = useQueryClient();

  const createMutation = useMutation(
    trpc.agents.create.mutationOptions({
      onSuccess: (agent) => {
        queryClient.invalidateQueries(trpc.agents.getMany.queryOptions({}));

        if (initialValues?.id) {
          queryClient.invalidateQueries(
            trpc.agents.getOne.queryOptions({ id: initialValues.id })
          );
        }

        toast.success(`Agent "${agent.name}" created successfully!`, {
          description: 'You can now use your new agent.',
        });

        // TODO: invalidate free tier usage
        onSuccess?.();
      },
      onError: (error) => {
        toast.error(
          `Failed to create agent: ${error.message || 'Unknown error'}`,
          {
            description: 'Please try again later.',
            duration: 5000,
          }
        );
      },
    })
  );

  const updateMutation = useMutation(
    trpc.agents.updateOne.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries(trpc.agents.getMany.queryOptions({}));

        if (initialValues?.id) {
          queryClient.invalidateQueries(
            trpc.agents.getOne.queryOptions({ id: initialValues.id })
          );
        }

        toast.success(`Agent "${initialValues?.name}" updated successfully!`, {
          description: 'Your changes have been saved.',
        });

        onSuccess?.();
      },
      onError: (error) => {
        toast.error(
          `Failed to update agent: ${error.message || 'Unknown error'}`,
          {
            description: 'Please try again later.',
            duration: 5000,
          }
        );

        // TODO: check if error dcode is 'FORBIDDEN', redirect to "/upgrade"
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

  const isEditing = initialValues?.id !== undefined;
  const isPending = createMutation.isPending || updateMutation.isPending;

  const onSubmit = (values: z.infer<typeof agentsInsertSchema>) => {
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
                  autoComplete='off'
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
                  autoComplete='off'
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
  );
};

export default AgentForm;
