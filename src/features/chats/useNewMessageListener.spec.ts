import { renderHook } from '@testing-library/react';
import { socket } from '../../socket';
import { ChatsEventEnum } from './chatsEventsEnum';
import useNewMessageListener from './useNewMessageListener';

jest.mock('../../socket', () => ({
  socket: {
    on: jest.fn(),
    off: jest.fn(),
  },
}));

describe('useNewMessageListener', () => {
  const mockOnNewMessage = jest.fn();
  const mockMessagePayload = {
    id: 'messageId',
    chat_id: 'chatId',
    message: 'someMessage',
    created_at: '2025-01-01T00:00:00.000Z',
    sender: {
      id: 'senderId',
      name: 'name',
      surname: 'surname',
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should subscribe to the NEW_MESSAGE event on mount', () => {
    renderHook(() => useNewMessageListener(mockOnNewMessage));

    expect(socket.on).toHaveBeenCalledWith(
      ChatsEventEnum.NEW_MESSAGE,
      mockOnNewMessage,
    );
  });

  it('should call onNewMessage when a NEW_MESSAGE event is received', () => {
    renderHook(() => useNewMessageListener(mockOnNewMessage));

    const eventHandler = (socket.on as jest.Mock).mock.calls[0][1];
    eventHandler(mockMessagePayload);

    expect(mockOnNewMessage).toHaveBeenCalledWith(mockMessagePayload);
  });

  it('should unsubscribe from the NEW_MESSAGE event on unmount', () => {
    const { unmount } = renderHook(() =>
      useNewMessageListener(mockOnNewMessage),
    );

    unmount();

    expect(socket.off).toHaveBeenCalledWith(
      ChatsEventEnum.NEW_MESSAGE,
      mockOnNewMessage,
    );
  });
});
