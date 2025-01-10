import { Stack, Button } from '@mui/material';
import { MutationStatusEnum } from '../../../enums/mutationStatus';

type FormActionsProps = {
  updateStatus: MutationStatusEnum;
  deleteStatus: MutationStatusEnum;
  handleDelete: () => void;
  isCompleted: boolean;
};

export default function FormActions({
  updateStatus,
  deleteStatus,
  handleDelete,
  isCompleted,
}: FormActionsProps) {
  return (
    <Stack direction="row" spacing={1}>
      <Button
        disabled={updateStatus === MutationStatusEnum.PENDING || isCompleted}
        type="submit"
        variant="contained">
        {updateStatus === MutationStatusEnum.PENDING ? 'Updating...' : 'Update'}
      </Button>
      <Button
        disabled={deleteStatus === MutationStatusEnum.PENDING || isCompleted}
        color="error"
        onClick={handleDelete}
        variant="contained">
        {deleteStatus === MutationStatusEnum.PENDING ? 'Deleting...' : 'Delete'}
      </Button>
    </Stack>
  );
}
