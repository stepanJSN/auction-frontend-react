import { renderHook } from '@testing-library/react';
import { socket } from '../../socket';
import { ChatsEventEnum } from './chatsEventsEnum';
import useCreateChatListener from './useCreateChat';

jest.mock('../../socket', () => ({
  socket: {
    on: jest.fn(),
    off: jest.fn(),
  },
}));

describe('useCreateChat', () => {
  const mockOnCreate = jest.fn();
  const mockChatPayload = { id: '123', name: 'Test Chat' };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should subscribe to the CREATE event on mount', () => {
    renderHook(() => useCreateChatListener(mockOnCreate));

    expect(socket.on).toHaveBeenCalledWith(ChatsEventEnum.CREATE, mockOnCreate);
  });

  it('should call onCreate when a CREATE event is received', () => {
    renderHook(() => useCreateChatListener(mockOnCreate));

    const eventHandler = (socket.on as jest.Mock).mock.calls[0][1];
    eventHandler(mockChatPayload);

    expect(mockOnCreate).toHaveBeenCalledWith(mockChatPayload);
  });

  it('should unsubscribe from the CREATE event on unmount', () => {
    const { unmount } = renderHook(() => useCreateChatListener(mockOnCreate));

    unmount();

    expect(socket.off).toHaveBeenCalledWith(
      ChatsEventEnum.CREATE,
      mockOnCreate,
    );
  });
});
