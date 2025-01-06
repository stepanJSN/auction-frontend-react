import { Alert, Box, Typography } from '@mui/material';
import ModalPage from '../components/ModalPage';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectLocationById,
  updateLocation,
} from '../features/locations/locationsSlice';
import { useCallback, useMemo } from 'react';
import { ICreateLocation } from '../types/locations.interfaces';
import { MutationStatusEnum } from '../enums/mutationStatus';
import useErrorMessage from '../hooks/useErrorMessage';
import { locationErrorMessages } from '../features/locations/locationErrorMessages';
import { useParams } from 'react-router';
import { RootState } from '../redux/store';
import EditLocationForm from '../features/locations/EditLocationForm';

export default function EditLocationPage() {
  const { locationId } = useParams();
  const location = useSelector(
    useCallback(
      (state: RootState) => selectLocationById(state, locationId!),
      [locationId],
    ),
  );
  const dispatch = useDispatch();
  const getErrorMessage = useErrorMessage(locationErrorMessages);

  const handleUpdate = useCallback(
    (data: ICreateLocation) => {
      dispatch(updateLocation({ ...data, id: +locationId! }));
    },
    [dispatch, locationId],
  );

  const sx = useMemo(() => ({ p: 2 }), []);
  return (
    <ModalPage maxWidth="xs">
      <Box sx={sx}>
        <Typography variant="h5">Edit location</Typography>
        {!location && <Alert severity="error">Location not found</Alert>}
        {location && (
          <>
            {location.updateStatus !== MutationStatusEnum.SUCCESS &&
              location.updateStatus !== MutationStatusEnum.ERROR && (
                <Alert severity="info">
                  Each location should have a unique name
                </Alert>
              )}
            {location.updateStatus === MutationStatusEnum.ERROR && (
              <Alert severity="error">
                {getErrorMessage(location.errorCode)}
              </Alert>
            )}
            {location.updateStatus === MutationStatusEnum.SUCCESS && (
              <Alert severity="success">Location updated successfully</Alert>
            )}
            <EditLocationForm
              location={location.data}
              onSubmit={handleUpdate}
              isLoading={location.updateStatus === MutationStatusEnum.PENDING}
            />
          </>
        )}
      </Box>
    </ModalPage>
  );
}
