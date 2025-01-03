import { useDispatch } from 'react-redux';
import useMutation from '../../hooks/useMutation';
import { useCallback } from 'react';
import { resetLastPage } from './cardsSlice';
import { ICreateCard } from '../../types/cards.interface';
import { cardsService } from '../../services/cardsService';

export default function useUpdateCard(
  setIsImageError: React.Dispatch<React.SetStateAction<boolean>>,
  image: { url: string; image?: Blob } | null,
  id?: string,
) {
  const dispatch = useDispatch();
  const { mutate, status, errorCode } = useMutation(
    (data: { id: string; cardData: ICreateCard; image?: Blob }) => {
      return cardsService.update(data.id, data.cardData, data.image);
    },
  );
  const handleSubmit = useCallback(
    (data: ICreateCard) => {
      if (!id) return;
      if (image && image.url) {
        mutate({ id: id, cardData: data, image: image.image });
        dispatch(resetLastPage());
      } else {
        setIsImageError(true);
      }
    },
    [image, mutate, id, dispatch, setIsImageError],
  );

  return { handleSubmit, status, errorCode };
}
