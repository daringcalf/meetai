import ResponsiveDialog from '@/components/responsive-dialog';
import AgentForm from './agent-form';
import { type AgentGetOne } from '../../types';

interface UpdateAgentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialValues?: AgentGetOne;
}

const UpdateAgentDialog = ({
  open,
  onOpenChange,
  initialValues,
}: UpdateAgentDialogProps) => {
  return (
    <ResponsiveDialog
      title='Update Agent'
      description='Edit agent details'
      open={open}
      onOpenChange={onOpenChange}
    >
      <AgentForm
        initialValues={initialValues}
        onSuccess={() => onOpenChange(false)}
        onCancel={() => onOpenChange(false)}
      />
    </ResponsiveDialog>
  );
};

export default UpdateAgentDialog;
