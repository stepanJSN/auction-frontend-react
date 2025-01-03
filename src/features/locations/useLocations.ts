import { useDispatch, useSelector } from 'react-redux';
import {
  deleteLocation,
  filterLocationsByName,
  getLocations,
  selectLocations,
} from './locationsSlice';
import { useCallback, useEffect } from 'react';

export default function useLocations() {
  const { currentPage } = useSelector(selectLocations);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getLocations());
  }, [dispatch]);

  const handleLoadMore = useCallback(() => {
    dispatch(getLocations(currentPage + 1));
  }, [currentPage, dispatch]);

  const handleDelete = useCallback(
    (locationId: number) => {
      dispatch(deleteLocation(locationId));
    },
    [dispatch],
  );

  const handleFilterLocationsByName = useCallback(
    (name: string) => {
      dispatch(filterLocationsByName(name));
    },
    [dispatch],
  );

  return { handleLoadMore, handleDelete, handleFilterLocationsByName };
}
