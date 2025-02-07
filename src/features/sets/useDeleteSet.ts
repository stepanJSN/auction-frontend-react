import { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setsService } from '../../services/setsService';
import useMutation from '../../hooks/useMutation';
import { getSets } from './setsSlice';
import { useNavigate } from 'react-router';
import { MutationStatusEnum } from '../../enums/mutationStatus';
import { ROUTES } from '../../config/routesConfig';

export default function useDeleteSet(id?: string) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { mutate, status, errorCode } = useMutation((id: string) => {
    return setsService.delete(id);
  });
  const handleDelete = useCallback(() => {
    if (!id) return;
    mutate(id);
    dispatch(getSets());
  }, [mutate, dispatch, id]);

  useEffect(() => {
    if (status === MutationStatusEnum.SUCCESS) {
      navigate(ROUTES.SETS);
    }
  }, [status, navigate]);

  return { handleDelete, status, errorCode };
}
