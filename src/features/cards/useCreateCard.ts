import { useDispatch } from 'react-redux';
import useMutation from '../../hooks/useMutation';
import { useCallback } from 'react';
import { ICreateCard } from '../../types/cards.interface';
import { cardsService } from '../../services/cardsService';
import { getCards } from './cardsSlice';

export default function useCreateCard(
  setIsImageError: React.Dispatch<React.SetStateAction<boolean>>,
  image?: Blob,
) {
  const dispatch = useDispatch();
  const { mutate, status, errorCode } = useMutation(
    (data: { cardData: ICreateCard; image: Blob }) => {
      return cardsService.create(data.cardData, data.image);
    },
  );
  const handleSubmit = useCallback(
    (data: ICreateCard) => {
      if (image) {
        mutate({ cardData: data, image: image });
        dispatch(getCards());
      } else {
        setIsImageError(true);
      }
    },
    [image, mutate, dispatch, setIsImageError],
  );

  return { handleSubmit, status, errorCode };
}
