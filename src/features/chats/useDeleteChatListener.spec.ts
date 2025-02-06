import { renderHook } from '@testing-library/react';
import { socket } from '../../socket';
import { ChatsEventEnum } from './chatsEventsEnum';
import useDeleteChatListener from './useDeleteChatListener';

jest.mock('../../socket', () => ({
  socket: {
    on: jest.fn(),
    off: jest.fn(),
  },
}));

describe('useDeleteChatListener', () => {
  const mockOnDelete = jest.fn();
  const mockDeletePayload = 'chatId';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should subscribe to the DELETE event on mount', () => {
    renderHook(() => useDeleteChatListener(mockOnDelete));

    expect(socket.on).toHaveBeenCalledWith(ChatsEventEnum.DELETE, mockOnDelete);
  });

  it('should call onDelete when a DELETE event is received', () => {
    renderHook(() => useDeleteChatListener(mockOnDelete));

    const eventHandler = (socket.on as jest.Mock).mock.calls[0][1];
    eventHandler(mockDeletePayload);

    expect(mockOnDelete).toHaveBeenCalledWith(mockDeletePayload);
  });

  it('should unsubscribe from the DELETE event on unmount', () => {
    const { unmount } = renderHook(() => useDeleteChatListener(mockOnDelete));

    unmount();

    expect(socket.off).toHaveBeenCalledWith(
      ChatsEventEnum.DELETE,
      mockOnDelete,
    );
  });
});
