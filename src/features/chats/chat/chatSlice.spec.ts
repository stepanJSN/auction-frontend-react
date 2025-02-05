import { MutationStatusEnum } from '../../../enums/mutationStatus';
import { QueryStatusEnum } from '../../../enums/queryStatus.enum';
import chatReducer, {
  addMessage,
  appendMessages,
  ChatState,
  createMessage,
  deleteMessage,
  getChat,
  getMoreMessages,
  resendMessage,
  setChatData,
  setChatError,
  setDeleteMessageError,
  setDeleteMessageSuccess,
  setInitialMessages,
  setMessageCreationError,
  setMessageCreationSuccess,
  setMessagesError,
  setUpdateChatStatusError,
  setUpdateChatStatusSuccess,
  updateChat,
} from './chatSlice';

describe('Chat slice', () => {
  const mockChatId = 'chatId';
  const mockMessage = {
    id: 'messageId',
    created_at: '2025-01-01T00:00:00.000Z',
    message: 'message text',
    sender: {
      name: 'senderName',
      surname: 'senderSurname',
      is_this_user_message: false,
    },
  };
  const mockMessagesResponse = {
    data: [mockMessage],
    pagination: { cursor: 'cursor', hasNextPage: false },
  };
  let initialState: ChatState;

  beforeEach(() => {
    initialState = {
      name: null,
      participants: [],
      messages: {
        data: [],
        status: QueryStatusEnum.LOADING,
        cursor: '',
        hasNextPage: false,
      },
      status: QueryStatusEnum.LOADING,
      updateStatus: MutationStatusEnum.IDLE,
      updateErrorCode: null,
    };
  });

  it('should handle getChat action', () => {
    const nextState = chatReducer(initialState, getChat('chatId'));
    expect(nextState).toEqual({
      ...initialState,
      status: QueryStatusEnum.LOADING,
      messages: {
        ...initialState.messages,
        status: QueryStatusEnum.LOADING,
      },
      updateStatus: MutationStatusEnum.IDLE,
      updateErrorCode: null,
    });
  });

  it('should handle setChatData action', () => {
    const mockChat = {
      id: 'chatId',
      name: 'chatName',
      users: [
        {
          id: 'userId',
          name: 'userName',
          surname: 'userSurname',
        },
      ],
    };
    const nextState = chatReducer(initialState, setChatData(mockChat));
    expect(nextState).toEqual({
      ...initialState,
      status: QueryStatusEnum.SUCCESS,
      name: mockChat.name,
      participants: mockChat.users,
    });
  });

  it('should handle setChatError action', () => {
    const nextState = chatReducer(initialState, setChatError());
    expect(nextState).toEqual({
      ...initialState,
      status: QueryStatusEnum.ERROR,
    });
  });

  it('should handle getMoreMessages action', () => {
    const nextState = chatReducer(initialState, getMoreMessages(mockChatId));
    expect(nextState).toEqual({
      ...initialState,
      messages: {
        ...initialState.messages,
        status: QueryStatusEnum.LOADING,
      },
    });
  });

  it('should handle setInitialMessages action', () => {
    const nextState = chatReducer(
      initialState,
      setInitialMessages(mockMessagesResponse),
    );
    expect(nextState).toEqual({
      ...initialState,
      messages: {
        ...initialState.messages,
        data: [
          {
            ...mockMessage,
            creationStatus: MutationStatusEnum.SUCCESS,
            deletionStatus: MutationStatusEnum.IDLE,
          },
        ],
        cursor: mockMessagesResponse.pagination.cursor,
        hasNextPage: mockMessagesResponse.pagination.hasNextPage,
        status: QueryStatusEnum.SUCCESS,
      },
    });
  });

  it('should handle setMessagesError action', () => {
    const nextState = chatReducer(initialState, setMessagesError());
    expect(nextState).toEqual({
      ...initialState,
      messages: {
        ...initialState.messages,
        status: QueryStatusEnum.ERROR,
      },
    });
  });

  it('should handle appendMessages action', () => {
    const nextState = chatReducer(
      initialState,
      appendMessages(mockMessagesResponse),
    );
    expect(nextState).toEqual({
      ...initialState,
      messages: {
        ...initialState.messages,
        data: [
          {
            ...mockMessage,
            creationStatus: MutationStatusEnum.SUCCESS,
            deletionStatus: MutationStatusEnum.IDLE,
          },
        ],
        cursor: mockMessagesResponse.pagination.cursor,
        hasNextPage: mockMessagesResponse.pagination.hasNextPage,
        status: QueryStatusEnum.SUCCESS,
      },
    });
  });

  it('should handle createMessage action', () => {
    const mockCreateMessagePayload = {
      tempId: 'tempId',
      chatId: mockChatId,
      message: 'some message',
    };
    const nextState = chatReducer(
      initialState,
      createMessage(mockCreateMessagePayload),
    );
    expect(nextState).toEqual({
      ...initialState,
      messages: {
        ...initialState.messages,
        data: [
          {
            id: mockCreateMessagePayload.tempId,
            message: mockCreateMessagePayload.message,
            sender: {
              is_this_user_message: true,
            },
            creationStatus: MutationStatusEnum.PENDING,
            deletionStatus: MutationStatusEnum.IDLE,
          },
        ],
      },
    });
  });

  it('should handle resendMessage action', () => {
    const mockResendMessagePayload = {
      tempId: 'tempId',
      chatId: mockChatId,
    };
    const previousState = {
      ...initialState,
      messages: {
        ...initialState.messages,
        data: [
          {
            ...mockMessage,
            id: mockResendMessagePayload.tempId,
            creationStatus: MutationStatusEnum.ERROR,
            deletionStatus: MutationStatusEnum.IDLE,
          },
        ],
      },
    };
    const nextState = chatReducer(
      previousState,
      resendMessage(mockResendMessagePayload),
    );
    expect(nextState).toEqual({
      ...initialState,
      messages: {
        ...initialState.messages,
        data: [
          {
            ...previousState.messages.data[0],
            creationStatus: MutationStatusEnum.PENDING,
          },
        ],
      },
    });
  });

  it('should handle setMessageCreationSuccess action', () => {
    const mockPayload = {
      tempId: 'tempId',
      ...mockMessage,
    };
    const previousState = {
      ...initialState,
      messages: {
        ...initialState.messages,
        data: [
          {
            ...mockMessage,
            id: mockPayload.tempId,
            creationStatus: MutationStatusEnum.ERROR,
            deletionStatus: MutationStatusEnum.IDLE,
          },
        ],
      },
    };
    const nextState = chatReducer(
      previousState,
      setMessageCreationSuccess(mockPayload),
    );
    expect(nextState).toEqual({
      ...initialState,
      messages: {
        ...initialState.messages,
        data: [
          {
            ...mockPayload,
            creationStatus: MutationStatusEnum.SUCCESS,
            deletionStatus: MutationStatusEnum.IDLE,
          },
        ],
      },
    });
  });

  it('should handle setMessageCreationError action', () => {
    const mockPayload = {
      tempId: 'tempId',
    };
    const previousState = {
      ...initialState,
      messages: {
        ...initialState.messages,
        data: [
          {
            ...mockMessage,
            id: mockPayload.tempId,
            creationStatus: MutationStatusEnum.ERROR,
            deletionStatus: MutationStatusEnum.IDLE,
          },
        ],
      },
    };
    const nextState = chatReducer(
      previousState,
      setMessageCreationError(mockPayload),
    );
    expect(nextState).toEqual({
      ...initialState,
      messages: {
        ...initialState.messages,
        data: [
          {
            ...previousState.messages.data[0],
            creationStatus: MutationStatusEnum.ERROR,
          },
        ],
      },
    });
  });

  it('should handle deleteMessage action', () => {
    const mockPayload = {
      chatId: 'chatId',
      messageId: 'messageId',
    };
    const previousState = {
      ...initialState,
      messages: {
        ...initialState.messages,
        data: [
          {
            ...mockMessage,
            id: mockPayload.messageId,
            creationStatus: MutationStatusEnum.SUCCESS,
            deletionStatus: MutationStatusEnum.IDLE,
          },
        ],
      },
    };
    const nextState = chatReducer(previousState, deleteMessage(mockPayload));
    expect(nextState).toEqual({
      ...initialState,
      messages: {
        ...initialState.messages,
        data: [
          {
            ...previousState.messages.data[0],
            deletionStatus: MutationStatusEnum.PENDING,
          },
        ],
      },
    });
  });

  it('should handle setDeleteMessageSuccess action', () => {
    const mockPayload = 'messageId';
    const previousState = {
      ...initialState,
      messages: {
        ...initialState.messages,
        data: [
          {
            ...mockMessage,
            id: mockPayload,
            creationStatus: MutationStatusEnum.SUCCESS,
            deletionStatus: MutationStatusEnum.IDLE,
          },
        ],
      },
    };
    const nextState = chatReducer(
      previousState,
      setDeleteMessageSuccess(mockPayload),
    );
    expect(nextState).toEqual({
      ...initialState,
      messages: {
        ...initialState.messages,
        data: [],
      },
    });
  });

  it('should handle setDeleteMessageError action', () => {
    const mockPayload = 'tempId';
    const previousState = {
      ...initialState,
      messages: {
        ...initialState.messages,
        data: [
          {
            ...mockMessage,
            id: mockPayload,
            creationStatus: MutationStatusEnum.SUCCESS,
            deletionStatus: MutationStatusEnum.IDLE,
          },
        ],
      },
    };
    const nextState = chatReducer(
      previousState,
      setDeleteMessageError(mockPayload),
    );
    expect(nextState).toEqual({
      ...initialState,
      messages: {
        ...initialState.messages,
        data: [
          {
            ...previousState.messages.data[0],
            deletionStatus: MutationStatusEnum.ERROR,
          },
        ],
      },
    });
  });

  it('should handle addMessage action', () => {
    const mockPayload = {
      ...mockMessage,
      sender: {
        name: mockMessage.sender.name,
        surname: mockMessage.sender.surname,
      },
    };
    const nextState = chatReducer(initialState, addMessage(mockPayload));
    expect(nextState).toEqual({
      ...initialState,
      messages: {
        ...initialState.messages,
        data: [
          {
            ...mockPayload,
            sender: {
              ...mockPayload.sender,
              is_this_user_message: false,
            },
            creationStatus: MutationStatusEnum.SUCCESS,
            deletionStatus: MutationStatusEnum.IDLE,
          },
        ],
      },
    });
  });

  it('should handle updateChat action', () => {
    const mockUpdatePayload = {
      id: mockChatId,
      name: 'chatName',
      participants: ['user1Id'],
    };
    const nextState = chatReducer(initialState, updateChat(mockUpdatePayload));
    expect(nextState).toEqual({
      ...initialState,
      updateStatus: MutationStatusEnum.PENDING,
    });
  });

  it('should handle setUpdateChatStatusSuccess action', () => {
    const nextState = chatReducer(initialState, setUpdateChatStatusSuccess());
    expect(nextState).toEqual({
      ...initialState,
      updateStatus: MutationStatusEnum.SUCCESS,
    });
  });

  it('should handle setUpdateChatStatusError action', () => {
    const mockPayload = 500;
    const nextState = chatReducer(
      initialState,
      setUpdateChatStatusError(mockPayload),
    );
    expect(nextState).toEqual({
      ...initialState,
      updateStatus: MutationStatusEnum.ERROR,
      updateErrorCode: mockPayload,
    });
  });
});
