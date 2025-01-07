import { Outlet, useParams } from 'react-router';
import { setsService } from '../services/setsService';
import useQuery from '../hooks/useQuery';
import { Button, Stack, Typography } from '@mui/material';
import { MutationStatusEnum } from '../enums/mutationStatus';
import { useMemo } from 'react';
import useUpdateSet from '../features/sets/useUpdateSet';
import SetForm from '../features/sets/SetForm';
import useDeleteSet from '../features/sets/useDeleteSet';
import { QueryStatusEnum } from '../enums/queryStatus.enum';
import PageError from '../components/PageError';
import PageLoader from '../components/PageLoader';
import Notification from '../components/Notification';

export default function EditSetPage() {
  const { setId } = useParams();
  const { data, status } = useQuery({
    requestFn: setsService.getOne,
    params: setId!,
    autoFetch: !!setId,
  });
  const { status: updateStatus, handleUpdate } = useUpdateSet(setId);
  const { status: deleteStatus, handleDelete } = useDeleteSet(setId);

  const actions = useMemo(
    () => (
      <Stack direction="row" spacing={1}>
        <Button
          type="submit"
          variant="contained"
          fullWidth
          disabled={updateStatus === MutationStatusEnum.PENDING}>
          {updateStatus === MutationStatusEnum.PENDING
            ? 'Updating...'
            : 'Update'}
        </Button>
        <Button
          type="submit"
          variant="contained"
          color="error"
          fullWidth
          onClick={handleDelete}
          disabled={deleteStatus === MutationStatusEnum.PENDING}>
          {deleteStatus === MutationStatusEnum.PENDING
            ? 'Deleting...'
            : 'Delete'}
        </Button>
      </Stack>
    ),
    [deleteStatus, handleDelete, updateStatus],
  );

  return (
    <>
      <Typography variant="h4" gutterBottom>
        Edit Set
      </Typography>
      {status === QueryStatusEnum.ERROR && <PageError />}
      {status === QueryStatusEnum.LOADING && <PageLoader />}
      {data && (
        <SetForm onSubmit={handleUpdate} actions={actions} data={data} />
      )}
      <Notification
        open={deleteStatus === MutationStatusEnum.ERROR}
        message="Failed to delete set, something went wrong"
        severity="error"
      />
      <Notification
        open={
          updateStatus === MutationStatusEnum.ERROR &&
          deleteStatus !== MutationStatusEnum.ERROR
        }
        message="Failed to update set, something went wrong"
        severity="error"
      />
      <Notification
        open={
          updateStatus === MutationStatusEnum.SUCCESS &&
          deleteStatus !== MutationStatusEnum.ERROR
        }
        message="Set updated successfully"
        severity="success"
      />
      <Outlet />
    </>
  );
}
