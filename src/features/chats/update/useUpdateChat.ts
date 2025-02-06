import { useCallback } from 'react';
import { IUpdateChat } from '../../../types/chats.interfaces';
import { useDispatch } from 'react-redux';
import { updateChat } from '../chat/chatSlice';

export default function useUpdateChat(id?: string) {
  const dispatch = useDispatch();

  const handleUpdate = useCallback(
    (data: IUpdateChat) => {
      if (!id) return;
      dispatch(
        updateChat({
          id,
          ...data,
        }),
      );
    },
    [dispatch, id],
  );

  return { handleUpdate };
}
