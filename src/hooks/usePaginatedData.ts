import { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';

export default function usePaginatedData(
  currentPage: number,
  fetchAction: (page: number) => any,
  changePageAction: (page: number) => any,
) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAction(currentPage));
  }, [dispatch, fetchAction, currentPage]);

  const handlePageChange = useCallback(
    (_event: React.ChangeEvent<unknown>, value: number) => {
      dispatch(changePageAction(value));
    },
    [dispatch, changePageAction],
  );

  return handlePageChange;
}
