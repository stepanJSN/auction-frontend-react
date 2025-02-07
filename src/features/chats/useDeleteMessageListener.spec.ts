import { renderHook } from '@testing-library/react';
import { socket } from '../../socket';
import { ChatsEventEnum } from './chatsEventsEnum';
import useDeleteMessageListener from './useDeleteMessageListener';

jest.mock('../../socket', () => ({
  socket: {
    on: jest.fn(),
    off: jest.fn(),
  },
}));

describe('useDeleteMessageListener', () => {
  const mockOnDeleteMessage = jest.fn();
  const mockDeleteMessagePayload = { id: 'messageId', chat_id: 'chatId' };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should subscribe to the DELETE_MESSAGE event on mount', () => {
    renderHook(() => useDeleteMessageListener(mockOnDeleteMessage));

    expect(socket.on).toHaveBeenCalledWith(
      ChatsEventEnum.DELETE_MESSAGE,
      mockOnDeleteMessage,
    );
  });

  it('should call onDeleteMessage when a DELETE_MESSAGE event is received', () => {
    renderHook(() => useDeleteMessageListener(mockOnDeleteMessage));

    const eventHandler = (socket.on as jest.Mock).mock.calls[0][1];
    eventHandler(mockDeleteMessagePayload);

    expect(mockOnDeleteMessage).toHaveBeenCalledWith(mockDeleteMessagePayload);
  });

  it('should unsubscribe from the DELETE_MESSAGE event on unmount', () => {
    const { unmount } = renderHook(() =>
      useDeleteMessageListener(mockOnDeleteMessage),
    );

    unmount();

    expect(socket.off).toHaveBeenCalledWith(
      ChatsEventEnum.DELETE_MESSAGE,
      mockOnDeleteMessage,
    );
  });
});
