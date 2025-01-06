import { Alert, Box, Typography } from '@mui/material';
import ModalPage from '../components/ModalPage';
import CreateEpisodeForm from '../features/episodes/CreateEpisodeForm';
import { useDispatch, useSelector } from 'react-redux';
import {
  createEpisode,
  selectEpisodeCreationStatus,
} from '../features/episodes/episodesSlice';
import { useCallback, useMemo } from 'react';
import { ICreateEpisode } from '../types/episodes.interfaces';
import { MutationStatusEnum } from '../enums/mutationStatus';
import useErrorMessage from '../hooks/useErrorMessage';
import { episodeErrorMessages } from '../features/episodes/episodeErrorMessages';

export default function CreateEpisodePage() {
  const { errorCode, creationStatus } = useSelector(
    selectEpisodeCreationStatus,
  );
  const dispatch = useDispatch();
  const getErrorMessage = useErrorMessage(episodeErrorMessages);

  const handleCreate = useCallback(
    (data: ICreateEpisode) => {
      dispatch(createEpisode(data));
    },
    [dispatch],
  );

  const sx = useMemo(() => ({ p: 2 }), []);
  return (
    <ModalPage maxWidth="xs">
      <Box sx={sx}>
        <Typography variant="h5">Create episode</Typography>
        {creationStatus !== MutationStatusEnum.SUCCESS &&
          creationStatus !== MutationStatusEnum.ERROR && (
            <Alert severity="info">
              Each episode should have a unique name
            </Alert>
          )}
        {creationStatus === MutationStatusEnum.ERROR && (
          <Alert severity="error">{getErrorMessage(errorCode)}</Alert>
        )}
        {creationStatus === MutationStatusEnum.SUCCESS && (
          <Alert severity="success">Episode created successfully</Alert>
        )}
        <CreateEpisodeForm
          onSubmit={handleCreate}
          isSuccess={creationStatus === MutationStatusEnum.SUCCESS}
          isLoading={creationStatus === MutationStatusEnum.PENDING}
        />
      </Box>
    </ModalPage>
  );
}
