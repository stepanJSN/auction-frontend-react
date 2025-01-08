import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { setsService } from '../../services/setsService';
import useMutation from '../../hooks/useMutation';
import { ICreateSet } from '../../types/sets.interface';
import { getSets } from './setsSlice';

export default function useUpdateSet(id?: string) {
  const dispatch = useDispatch();
  const { mutate, status, errorCode } = useMutation(
    (data: { id: string; setData: ICreateSet }) => {
      return setsService.update(data.id, data.setData);
    },
  );
  const handleUpdate = useCallback(
    (data: ICreateSet) => {
      if (!id) return;
      mutate({ id: id, setData: data });
      dispatch(getSets());
    },
    [mutate, dispatch, id],
  );

  return { handleUpdate, status, errorCode };
}
