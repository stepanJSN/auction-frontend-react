import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { getCards } from './cardsSlice';
import { useCallback, useEffect } from 'react';
import useMutation from '../../hooks/useMutation';
import { cardsService } from '../../services/cardsService';
import { MutationStatusEnum } from '../../enums/mutationStatus';

export default function useDeleteCard(cardId?: string) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { mutate, status, errorCode } = useMutation((data: { id: string }) => {
    return cardsService.delete(data.id);
  });

  const handleDelete = useCallback(() => {
    if (!cardId) return;
    mutate({ id: cardId });
    dispatch(getCards());
  }, [cardId, dispatch, mutate]);

  useEffect(() => {
    if (status === MutationStatusEnum.SUCCESS) {
      navigate(-1);
    }
  }, [status, navigate]);

  return { handleDelete, status, errorCode };
}
