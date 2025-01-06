import { Alert, Box, Typography } from '@mui/material';
import ModalPage from '../components/ModalPage';
import CreateLocationForm from '../features/locations/CreateLocationForm';
import { useDispatch, useSelector } from 'react-redux';
import {
  createLocation,
  selectLocationCreationStatus,
} from '../features/locations/locationsSlice';
import { useCallback, useMemo } from 'react';
import { ICreateLocation } from '../types/locations.interfaces';
import { MutationStatusEnum } from '../enums/mutationStatus';
import useErrorMessage from '../hooks/useErrorMessage';
import { locationErrorMessages } from '../features/locations/locationErrorMessages';

export default function CreateLocationPage() {
  const { errorCode, creationStatus } = useSelector(
    selectLocationCreationStatus,
  );
  const dispatch = useDispatch();
  const getErrorMessage = useErrorMessage(locationErrorMessages);

  const handleCreate = useCallback(
    (data: ICreateLocation) => {
      dispatch(createLocation(data));
    },
    [dispatch],
  );

  const sx = useMemo(() => ({ p: 2 }), []);
  return (
    <ModalPage maxWidth="xs">
      <Box sx={sx}>
        <Typography variant="h5">Create location</Typography>
        {creationStatus !== MutationStatusEnum.SUCCESS &&
          creationStatus !== MutationStatusEnum.ERROR && (
            <Alert severity="info">
              Each location should have a unique name
            </Alert>
          )}
        {creationStatus === MutationStatusEnum.ERROR && (
          <Alert severity="error">{getErrorMessage(errorCode)}</Alert>
        )}
        {creationStatus === MutationStatusEnum.SUCCESS && (
          <Alert severity="success">Location created successfully</Alert>
        )}
        <CreateLocationForm
          onSubmit={handleCreate}
          isSuccess={creationStatus === MutationStatusEnum.SUCCESS}
          isLoading={creationStatus === MutationStatusEnum.PENDING}
        />
      </Box>
    </ModalPage>
  );
}
