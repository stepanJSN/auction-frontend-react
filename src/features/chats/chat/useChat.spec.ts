import { act, renderHook } from '@testing-library/react';
import { useDispatch, useSelector } from 'react-redux';
import useChat from './useChat';
import {
  addMessage,
  createMessage,
  deleteMessage,
  getChat,
  getMoreMessages,
  resendMessage,
  setDeleteMessageSuccess,
} from './chatSlice';
import { MutationStatusEnum } from '../../../enums/mutationStatus';
import { QueryStatusEnum } from '../../../enums/queryStatus.enum';
import useDeleteMessageListener from '../useDeleteMessageListener';
import useNewMessageListener from '../useNewMessageListener';
import useDeleteChatListener from '../useDeleteChatListener';

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));
jest.mock('../useDeleteChatListener', () => jest.fn());
jest.mock('../useDeleteMessageListener', () => jest.fn());
jest.mock('../useNewMessageListener', () => jest.fn());

describe('useChat', () => {
  const mockChatId = 'chatId';
  const mockUserId = 'userId';
  const mockMessage = {
    id: 'messageId',
    created_at: '2025-01-01T00:00:00.000Z',
    message: 'message text',
    sender: {
      name: 'senderName',
      surname: 'senderSurname',
      is_this_user_message: false,
    },
    creationStatus: MutationStatusEnum.SUCCESS,
    deletionStatus: MutationStatusEnum.IDLE,
  };
  const mockMessagesResponse = {
    data: [mockMessage],
    status: QueryStatusEnum.LOADING,
    cursor: 'cursor',
    hasNextPage: true,
  };
  let mockDispatch = jest.fn();

  beforeEach(() => {
    (useDispatch as unknown as jest.Mock).mockReturnValue(mockDispatch);
    (useSelector as unknown as jest.Mock).mockReturnValue({
      id: mockUserId,
    });
    (useSelector as unknown as jest.Mock).mockReturnValue({
      messages: mockMessagesResponse,
    });
  });

  afterEach(() => mockDispatch.mockReset());

  it('should dispatch getChat on first render', async () => {
    renderHook(() => useChat(mockChatId));

    expect(mockDispatch).toHaveBeenCalledWith(getChat(mockChatId));
  });

  it('should dispatch create message when handleCerateMessage is called', () => {
    const mockMessage = 'some message';
    const mockedDate = new Date(2025, 6, 20);
    jest.spyOn(global, 'Date').mockImplementation(() => mockedDate);
    const { result } = renderHook(() => useChat(mockChatId));

    act(() => {
      result.current.handleCreateMessage({ message: mockMessage });
    });

    expect(mockDispatch).toHaveBeenCalledWith(
      createMessage({
        tempId: mockedDate.getTime().toString(),
        chatId: mockChatId,
        message: mockMessage,
      }),
    );
    expect(result.current.isScrollToBottomActive).toBe(true);
  });

  it('should dispatch getMoreMessages when handleLoadMore is called if there are any messages', () => {
    const { result } = renderHook(() => useChat(mockChatId));

    act(() => {
      result.current.handleLoadMore();
    });

    expect(mockDispatch).toHaveBeenCalledWith(getMoreMessages(mockChatId));
    expect(result.current.isScrollToBottomActive).toBe(false);
  });

  it('should dispatch deleteMessage when handleMessageDelete is called', () => {
    const { result } = renderHook(() => useChat(mockChatId));

    act(() => {
      result.current.handleMessageDelete(mockMessage.id);
    });

    expect(mockDispatch).toHaveBeenCalledWith(
      deleteMessage({
        messageId: mockMessage.id,
        chatId: mockChatId,
      }),
    );
  });

  it('should dispatch resendMessage when handleMessageResend is called', () => {
    const { result } = renderHook(() => useChat(mockChatId));

    act(() => {
      result.current.handleMessageResend(mockMessage.id);
    });

    expect(mockDispatch).toHaveBeenCalledWith(
      resendMessage({
        tempId: mockMessage.id,
        chatId: mockChatId,
      }),
    );
  });

  it('should dispatch addMessage when handleNewMessage is called', () => {
    const mockEventMessage = {
      id: 'mockId',
      chat_id: 'chatId',
      message: 'message',
      created_at: '2025-01-01T00:00:00.000Z',
      sender: {
        id: 'userId',
        name: 'name',
        surname: 'surname',
      },
    };
    (useNewMessageListener as jest.Mock).mockImplementationOnce((callback) => {
      callback(mockEventMessage);
    });
    const { result } = renderHook(() => useChat(mockChatId));

    expect(mockDispatch).toHaveBeenCalledWith(addMessage(mockEventMessage));
    expect(result.current.isScrollToBottomActive).toBe(true);
  });

  it('should dispatch setDeleteMessageSuccess when handleDeleteMessageEvent is called', () => {
    const mockEventPayload = {
      id: 'mockId',
      chat_id: 'chatId',
    };
    (useDeleteMessageListener as jest.Mock).mockImplementationOnce(
      (callback) => {
        callback(mockEventPayload);
      },
    );
    renderHook(() => useChat(mockChatId));

    expect(mockDispatch).toHaveBeenCalledWith(
      setDeleteMessageSuccess(mockEventPayload.id),
    );
  });

  it('should set isChatDeletedDialogOpen to true when handleDeleteChatEvent is called', () => {
    (useDeleteChatListener as jest.Mock).mockImplementationOnce((callback) => {
      callback('chatId');
    });
    const { result } = renderHook(() => useChat(mockChatId));

    expect(result.current.isChatDeletedDialogOpen).toBe(true);
  });
});
