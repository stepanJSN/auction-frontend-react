import {
  Button,
  LinearProgress,
  Stack,
  SxProps,
  Typography,
} from '@mui/material';
import { useSelector } from 'react-redux';
import { QueryStatusEnum } from '../enums/queryStatus.enum';
import PageError from '../components/PageError';
import PageLoader from '../components/PageLoader';
import EpisodesTable from '../features/episodes/EpisodesTable';
import { selectEpisodes } from '../features/episodes/episodesSlice';
import useEpisodes from '../features/episodes/useEpisodes';
import { Outlet } from 'react-router';
import EpisodesHeader from '../features/episodes/EpisodesHeader';

const buttonContainerStyles: SxProps = {
  mt: 2,
};

export default function EpisodesPage() {
  const { status, episodes, hasMore } = useSelector(selectEpisodes);
  const { handleDelete, handleLoadMore, handleFilterEpisodesByName } =
    useEpisodes();
  return (
    <>
      <Typography variant="h4" gutterBottom>
        Episodes
      </Typography>
      <EpisodesHeader handleFilterEpisodesByName={handleFilterEpisodesByName} />
      {status === QueryStatusEnum.LOADING && episodes.length === 0 && (
        <PageLoader />
      )}
      {status === QueryStatusEnum.ERROR && <PageError />}
      {episodes.length !== 0 && (
        <>
          <EpisodesTable episodes={episodes} onDelete={handleDelete} />
          {status === QueryStatusEnum.LOADING && <LinearProgress />}
          <Stack
            direction="row"
            justifyContent="center"
            sx={buttonContainerStyles}>
            <Button
              onClick={handleLoadMore}
              disabled={!hasMore}
              variant="contained">
              Load more
            </Button>
          </Stack>
        </>
      )}
      {episodes.length === 0 && status === QueryStatusEnum.SUCCESS && (
        <Typography variant="h5" gutterBottom>
          There are no episodes
        </Typography>
      )}
      <Outlet />
    </>
  );
}
