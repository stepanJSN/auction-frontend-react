import { useDispatch, useSelector } from 'react-redux';
import {
  deleteEpisode,
  filterEpisodesByName,
  getEpisodes,
  selectEpisodes,
} from './episodesSlice';
import { useCallback, useEffect } from 'react';

export default function useEpisodes() {
  const { currentPage } = useSelector(selectEpisodes);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getEpisodes());
  }, [dispatch]);

  const handleLoadMore = useCallback(() => {
    dispatch(getEpisodes(currentPage + 1));
  }, [currentPage, dispatch]);

  const handleDelete = useCallback(
    (episodeId: number) => {
      dispatch(deleteEpisode(episodeId));
    },
    [dispatch],
  );

  const handleFilterEpisodesByName = useCallback(
    (name: string) => {
      dispatch(filterEpisodesByName(name));
    },
    [dispatch],
  );

  return { handleLoadMore, handleDelete, handleFilterEpisodesByName };
}
