import { renderHook } from '@testing-library/react';
import { socket } from '../../socket';
import { ChatsEventEnum } from './chatsEventsEnum';
import useUpdateMessageListener from './useUpdateMessageListener';

jest.mock('../../socket', () => ({
  socket: {
    on: jest.fn(),
    off: jest.fn(),
  },
}));

describe('useUpdateMessageListener', () => {
  const mockOnUpdateMessage = jest.fn();
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

  it('should subscribe to the UPDATE_MESSAGE event on mount', () => {
    renderHook(() => useUpdateMessageListener(mockOnUpdateMessage));

    expect(socket.on).toHaveBeenCalledWith(
      ChatsEventEnum.UPDATE_MESSAGE,
      mockOnUpdateMessage,
    );
  });

  it('should call onUpdateMessage when a UPDATE_MESSAGE event is received', () => {
    renderHook(() => useUpdateMessageListener(mockOnUpdateMessage));

    const eventHandler = (socket.on as jest.Mock).mock.calls[0][1];
    eventHandler(mockMessagePayload);

    expect(mockOnUpdateMessage).toHaveBeenCalledWith(mockMessagePayload);
  });

  it('should unsubscribe from the UPDATE_MESSAGE event on unmount', () => {
    const { unmount } = renderHook(() =>
      useUpdateMessageListener(mockOnUpdateMessage),
    );

    unmount();

    expect(socket.off).toHaveBeenCalledWith(
      ChatsEventEnum.UPDATE_MESSAGE,
      mockOnUpdateMessage,
    );
  });
});
