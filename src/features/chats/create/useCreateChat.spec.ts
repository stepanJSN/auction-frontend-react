import { act, cleanup, renderHook, waitFor } from '@testing-library/react';
import useMutation from '../../../hooks/useMutation';
import { MutationStatusEnum } from '../../../enums/mutationStatus';
import useCreateChat from './useCreateChat';
import { chatsService } from '../../../services/chatsService';
import { useNavigate } from 'react-router';
import { ROUTES } from '../../../config/routesConfig';

jest.mock('react-router', () => ({
  useNavigate: jest.fn(),
}));
jest.mock('../../../services/chatsService', () => ({
  chatsService: { create: jest.fn() },
}));
jest.mock('../../../hooks/useMutation', () => jest.fn());

describe('useCreateChat', () => {
  afterEach(cleanup);

  it('should call chatsService.create and navigate to new chat if request is successful', async () => {
    const mockCreateData = {
      name: 'chat name',
      participants: ['user1', 'user2'],
    };
    const mockChatId = 'chatId';
    const mockMutate = jest.fn(() => ({ id: mockChatId }));
    (useMutation as jest.Mock).mockImplementation((callback) => {
      callback(mockCreateData);
      return {
        mutate: mockMutate,
        status: MutationStatusEnum.SUCCESS,
        errorCode: null,
      };
    });
    const mockNavigate = jest.fn();
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);

    const { result } = renderHook(() => useCreateChat());

    act(() => {
      result.current.handleCreate(mockCreateData);
    });

    expect(mockMutate).toHaveBeenCalledWith(mockCreateData);
    expect(chatsService.create).toHaveBeenCalledWith(mockCreateData);
    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith(ROUTES.CHAT(mockChatId));
    });
    expect(useMutation).toHaveBeenCalledWith(expect.any(Function), false);
  });
});
