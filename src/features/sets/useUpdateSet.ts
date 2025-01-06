import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { setsService } from '../../services/setsService';
import useMutation from '../../hooks/useMutation';
import { ICreateSet } from '../../types/sets.interface';
import { resetCurrentPage } from './setsSlice';

export default function useUpdateSet(id?: string) {
  const dispatch = useDispatch();
  const { mutate, status, errorCode } = useMutation(
    (data: { id: string; setData: ICreateSet }) => {
      return setsService.update(data.id, data.setData);
    },
  );
  const handleSubmit = useCallback(
    (data: ICreateSet) => {
      if (!id) return;
      mutate({ id: id, setData: data });
      dispatch(resetCurrentPage());
    },
    [mutate, dispatch, id],
  );

  return { handleSubmit, status, errorCode };
}
