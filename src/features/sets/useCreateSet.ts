import { useDispatch } from 'react-redux';
import useMutation from '../../hooks/useMutation';
import { ICreateSet } from '../../types/sets.interface';
import { setsService } from '../../services/setsService';
import { useCallback } from 'react';
import { getSets } from './setsSlice';

export default function useCreateSet() {
  const dispatch = useDispatch();
  const { mutate, status, errorCode } = useMutation((data: ICreateSet) => {
    return setsService.create(data);
  });
  const handleSubmit = useCallback(
    (data: ICreateSet) => {
      mutate(data);
      dispatch(getSets());
    },
    [mutate, dispatch],
  );

  return { handleSubmit, status, errorCode };
}
