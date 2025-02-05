import { act, cleanup, renderHook } from '@testing-library/react';
import useUpdateChat from './useUpdateChat';
import { useDispatch } from 'react-redux';
import { updateChat } from '../chat/chatSlice';

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
}));

describe('useUpdateChat', () => {
  afterEach(cleanup);

  it('should dispatch updateChat action when handleUpdate is called', () => {
    const mockChatId = 'chatId';
    const mockUpdateChatData = {
      name: 'updatedName',
    };
    const mockDispatch = jest.fn();
    (useDispatch as unknown as jest.Mock).mockReturnValue(mockDispatch);
    const { result } = renderHook(() => useUpdateChat(mockChatId));

    act(() => {
      result.current.handleUpdate(mockUpdateChatData);
    });

    expect(mockDispatch).toHaveBeenCalledWith(
      updateChat({
        id: mockChatId,
        ...mockUpdateChatData,
      }),
    );
  });
});
