import { act, renderHook } from '@testing-library/react';
import useMessageNotification from './useMessageNotification';

jest.mock('react-redux', () => ({
  useSelector: jest.fn(() => 'userId'),
}));

describe('useMessageNotification', () => {
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

  it('should set notification when handleNewMessage is called and user id is not equal to sender id', () => {
    const { result } = renderHook(() => useMessageNotification());

    act(() => {
      result.current.handleNewMessage(mockMessagePayload);
    });

    expect(result.current.notification).toEqual({
      sender: `${mockMessagePayload.sender.name} ${mockMessagePayload.sender.surname}`,
      chatId: mockMessagePayload.chat_id,
    });
  });

  it('should set null as notification value when handleNotificationClose is called', () => {
    const { result } = renderHook(() => useMessageNotification());

    act(() => {
      result.current.handleNewMessage(mockMessagePayload);
      result.current.handleNotificationClose();
    });

    expect(result.current.notification).toBe(null);
  });

  it('should not set notification when handleNewMessage is called and user id is equal to sender id', () => {
    const mockThisMessagePayload = {
      ...mockMessagePayload,
      sender: {
        ...mockMessagePayload.sender,
        id: 'userId',
      },
    };
    const { result } = renderHook(() => useMessageNotification());

    act(() => {
      result.current.handleNewMessage(mockThisMessagePayload);
    });

    expect(result.current.notification).toBe(null);
  });
});
