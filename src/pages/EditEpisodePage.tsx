import { Alert, Box, Typography } from '@mui/material';
import ModalPage from '../components/ModalPage';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectEpisodeById,
  updateEpisode,
} from '../features/episodes/episodesSlice';
import { useCallback, useMemo } from 'react';
import { ICreateEpisode } from '../types/episodes.interfaces';
import { MutationStatusEnum } from '../enums/mutationStatus';
import useErrorMessage from '../hooks/useErrorMessage';
import { episodeErrorMessages } from '../features/episodes/episodeErrorMessages';
import { useParams } from 'react-router';
import { RootState } from '../redux/store';
import EditEpisodeForm from '../features/episodes/EditEpisodeForm';

export default function EditEpisodePage() {
  const { episodeId } = useParams();
  const episode = useSelector(
    useCallback(
      (state: RootState) => selectEpisodeById(state, episodeId!),
      [episodeId],
    ),
  );
  const dispatch = useDispatch();
  const getErrorMessage = useErrorMessage(episodeErrorMessages);

  const handleUpdate = useCallback(
    (data: ICreateEpisode) => {
      dispatch(updateEpisode({ ...data, id: +episodeId! }));
    },
    [dispatch, episodeId],
  );

  const sx = useMemo(() => ({ p: 2 }), []);
  return (
    <ModalPage maxWidth="xs">
      <Box sx={sx}>
        <Typography variant="h5">Edit episode</Typography>
        {!episode && <Alert severity="error">Episode not found</Alert>}
        {episode && (
          <>
            {episode.updateStatus !== MutationStatusEnum.SUCCESS &&
              episode.updateStatus !== MutationStatusEnum.ERROR && (
                <Alert severity="info">
                  Each episode should have a unique name
                </Alert>
              )}
            {episode.updateStatus === MutationStatusEnum.ERROR && (
              <Alert severity="error">
                {getErrorMessage(episode.errorCode)}
              </Alert>
            )}
            {episode.updateStatus === MutationStatusEnum.SUCCESS && (
              <Alert severity="success">Episode updated successfully</Alert>
            )}
            <EditEpisodeForm
              episode={episode.data}
              onSubmit={handleUpdate}
              isLoading={episode.updateStatus === MutationStatusEnum.PENDING}
            />
          </>
        )}
      </Box>
    </ModalPage>
  );
}
