import { useDispatch } from 'react-redux';
import useMutation from '../../hooks/useMutation';
import { useCallback } from 'react';
import { ICreateCard } from '../../types/cards.interface';
import { cardsService } from '../../services/cardsService';
import { getCards } from './cardsSlice';

export default function useCreateCard() {
  const dispatch = useDispatch();
  const { mutate, status, errorCode } = useMutation(
    (data: { cardData: ICreateCard; image: Blob }) => {
      return cardsService.create(data.cardData, data.image);
    },
  );
  const createCard = useCallback(
    (data: ICreateCard, image: Blob) => {
      mutate({ cardData: data, image: image });
      dispatch(getCards());
    },
    [mutate, dispatch],
  );

  return { createCard, status, errorCode };
}
