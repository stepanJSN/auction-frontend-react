import { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';

export default function usePaginatedData(
  fetchAction: () => any,
  changePageAction: (page: number) => any,
) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAction());
  }, [dispatch, fetchAction]);

  const handlePageChange = useCallback(
    (_event: React.ChangeEvent<unknown>, value: number) => {
      dispatch(changePageAction(value));
    },
    [dispatch, changePageAction],
  );

  return handlePageChange;
}
