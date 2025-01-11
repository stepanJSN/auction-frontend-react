import { LinearProgress, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { QueryStatusEnum } from '../enums/queryStatus.enum';
import PageError from '../components/PageError';
import PageLoader from '../components/PageLoader';
import EpisodesTable from '../features/episodes/EpisodesTable';
import { selectEpisodes } from '../features/episodes/episodesSlice';
import useEpisodes from '../features/episodes/useEpisodes';
import { Outlet } from 'react-router';
import EpisodesHeader from '../features/episodes/EpisodesHeader';
import LoadMoreBtn from '../components/LoadMoreBtn';
import { LinearProgressPlaceholder } from '../components/LinearProgressPlaceholder';

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
          {status === QueryStatusEnum.LOADING && <LinearProgress />}
          {status === QueryStatusEnum.SUCCESS && <LinearProgressPlaceholder />}
          <EpisodesTable episodes={episodes} onDelete={handleDelete} />
          <LoadMoreBtn
            isLoading={status === QueryStatusEnum.LOADING}
            hasMore={hasMore}
            handleLoadMore={handleLoadMore}
          />
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
