import { act, renderHook } from '@testing-library/react';
import useChats from './useChats';
import { useDispatch } from 'react-redux';
import {
  createChat,
  deleteChat,
  deleteLastMessage,
  getChats,
  getMoreChats,
  setLastMessage,
  setNameFilter,
  updateLastMessage,
} from './chatsSlice';
import useDeleteChatListener from './useDeleteChatListener';
import useNewMessageListener from './useNewMessageListener';
import useUpdateMessageListener from './useUpdateMessageListener';
import useDeleteMessageListener from './useDeleteMessageListener';
import useCreateChatListener from './useCreateChat';

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
}));

jest.mock('./useDeleteChatListener', () => jest.fn());
jest.mock('./useDeleteMessageListener', () => jest.fn());
jest.mock('./useNewMessageListener', () => jest.fn());
jest.mock('./useUpdateMessageListener', () => jest.fn());
jest.mock('./useCreateChat', () => jest.fn());

describe('useChats', () => {
  let mockDispatch = jest.fn();

  beforeEach(() => {
    (useDispatch as unknown as jest.Mock).mockReturnValue(mockDispatch);
  });

  afterEach(() => mockDispatch.mockReset());

  it('should dispatch deleteChat when delete chat event occurs', () => {
    const mockEventPayload = 'chatId';
    (useDeleteChatListener as jest.Mock).mockImplementationOnce((callback) => {
      callback(mockEventPayload);
    });
    renderHook(() => useChats());

    expect(mockDispatch).toHaveBeenCalledWith(deleteChat(mockEventPayload));
  });

  it('should dispatch setLastMessage when new message event occurs', () => {
    const mockEventPayload = {
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
    (useNewMessageListener as jest.Mock).mockImplementationOnce((callback) => {
      callback(mockEventPayload);
    });
    renderHook(() => useChats());

    expect(mockDispatch).toHaveBeenCalledWith(setLastMessage(mockEventPayload));
  });

  it('should dispatch updateLastMessage when update message event occurs', () => {
    const mockEventPayload = {
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
    (useUpdateMessageListener as jest.Mock).mockImplementationOnce(
      (callback) => {
        callback(mockEventPayload);
      },
    );
    renderHook(() => useChats());

    expect(mockDispatch).toHaveBeenCalledWith(
      updateLastMessage(mockEventPayload),
    );
  });

  it('should dispatch deleteLastMessage when delete message event occurs', () => {
    const mockEventPayload = {
      id: 'messageId',
      chat_id: 'chatId',
    };
    (useDeleteMessageListener as jest.Mock).mockImplementationOnce(
      (callback) => {
        callback(mockEventPayload);
      },
    );
    renderHook(() => useChats());

    expect(mockDispatch).toHaveBeenCalledWith(
      deleteLastMessage(mockEventPayload),
    );
  });

  it('should dispatch createChat when create chat event occurs', () => {
    const mockEventPayload = {
      id: 'messageId',
      name: 'message name',
    };
    (useCreateChatListener as jest.Mock).mockImplementationOnce((callback) => {
      callback(mockEventPayload);
    });
    renderHook(() => useChats());

    expect(mockDispatch).toHaveBeenCalledWith(createChat(mockEventPayload));
  });

  it('should dispatch setNameFilter when handleNameFilterChange is called', async () => {
    const mockName = 'chat name';
    const { result } = renderHook(() => useChats());

    await act(async () => {
      result.current.handleNameFilterChange(mockName);
    });

    expect(mockDispatch).toHaveBeenCalledWith(setNameFilter(mockName));
  });

  it('should dispatch getMoreChats when handleLoadMore is called', async () => {
    const { result } = renderHook(() => useChats());

    await act(async () => {
      result.current.handleLoadMore();
    });

    expect(mockDispatch).toHaveBeenCalledWith(getMoreChats());
  });

  it('should dispatch getChats on first render', async () => {
    renderHook(() => useChats());

    expect(mockDispatch).toHaveBeenCalledWith(getChats());
  });
});
