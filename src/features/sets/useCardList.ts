import { useCallback, useMemo, useState } from 'react';
import { useDebounceValue } from 'usehooks-ts';
import useQuery from '../../hooks/useQuery';
import { cardsService } from '../../services/cardsService';

export default function useCardList() {
  const [page, setPage] = useState(1);
  const [debouncedCardName, setCardName] = useDebounceValue('', 500);
  const params = useMemo(
    () => ({
      page,
      name: debouncedCardName,
    }),
    [debouncedCardName, page],
  );

  const { data, status } = useQuery({
    requestFn: cardsService.getAll,
    params: params,
    autoFetch: true,
  });

  const handlePageChange = useCallback(
    (_e: React.ChangeEvent<unknown>, value: number) => {
      setPage(value);
    },
    [],
  );

  const handleFilterChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) =>
      setCardName(event.target.value),
    [setCardName],
  );

  return {
    data,
    status,
    page,
    handlePageChange,
    handleFilterChange,
  };
}
