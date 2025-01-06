import { Alert, Button, Typography } from '@mui/material';
import SetForm from '../features/sets/SetForm';
import { useMemo } from 'react';
import useCreateSet from '../features/sets/useCreateSet';
import { MutationStatusEnum } from '../enums/mutationStatus';

export default function CreateSetPage() {
  const { status, handleSubmit } = useCreateSet();

  const actions = useMemo(
    () => (
      <Button
        type="submit"
        variant="contained"
        fullWidth
        disabled={status === MutationStatusEnum.PENDING}>
        {status === MutationStatusEnum.PENDING ? 'Creating...' : 'Create'}
      </Button>
    ),
    [status],
  );

  return (
    <>
      <Typography variant="h4" gutterBottom>
        Create Set
      </Typography>
      {status !== MutationStatusEnum.ERROR &&
        status !== MutationStatusEnum.SUCCESS && (
          <Alert severity="info">
            Note: you can create a set only with active cards
          </Alert>
        )}
      {status === MutationStatusEnum.ERROR && (
        <Alert severity="error">An error occurred while creating a set</Alert>
      )}
      {status === MutationStatusEnum.SUCCESS && (
        <Alert severity="success">Set created successfully</Alert>
      )}
      <SetForm onSubmit={handleSubmit} actions={actions} />
    </>
  );
}
