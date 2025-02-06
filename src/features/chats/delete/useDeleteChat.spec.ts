import { act, cleanup, renderHook, waitFor } from '@testing-library/react';
import useMutation from '../../../hooks/useMutation';
import { MutationStatusEnum } from '../../../enums/mutationStatus';
import { chatsService } from '../../../services/chatsService';
import { useNavigate } from 'react-router';
import { ROUTES } from '../../../config/routesConfig';
import useDeleteChat from './useDeleteChat';

jest.mock('react-router', () => ({
  useNavigate: jest.fn(),
}));
jest.mock('../../../services/chatsService', () => ({
  chatsService: { delete: jest.fn() },
}));
jest.mock('../../../hooks/useMutation', () => jest.fn());

describe('useCreateChat', () => {
  afterEach(cleanup);

  it('should call chatsService.delete and navigate to chats if deletion is successful', async () => {
    const mockChatId = 'chatId';
    const mockMutate = jest.fn();
    (useMutation as jest.Mock).mockImplementation((callback) => {
      callback(mockChatId);
      return {
        mutate: mockMutate,
        status: MutationStatusEnum.SUCCESS,
        errorCode: null,
      };
    });
    const mockNavigate = jest.fn();
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);

    const { result } = renderHook(() => useDeleteChat(mockChatId));

    act(() => {
      result.current.handleDelete();
    });

    expect(mockMutate).toHaveBeenCalledWith(mockChatId);
    expect(chatsService.delete).toHaveBeenCalledWith(mockChatId);
    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith(ROUTES.CHATS);
    });
    expect(useMutation).toHaveBeenCalledWith(expect.any(Function));
  });
});
