import { QueryStatusEnum } from '../../enums/queryStatus.enum';
import chatsReducer, {
  ChatsState,
  createChat,
  deleteChat,
  deleteLastMessage,
  getChats,
  getChatsError,
  getChatsSuccess,
  getMoreChats,
  getMoreChatsSuccess,
  setLastMessage,
  setNameFilter,
  updateLastMessage,
} from './chatsSlice';

describe('Chats slice', () => {
  describe('reducers', () => {
    let initialState: ChatsState;
    const mockChats = {
      data: [
        {
          id: 'chatId',
          name: 'chatName',
          lastMessage: null,
        },
      ],
      info: {
        page: 1,
        totalCount: 1,
        totalPages: 1,
      },
    };

    beforeEach(() => {
      initialState = {
        chats: [],
        filters: {
          name: '',
        },
        totalPages: 0,
        currentPage: 1,
        status: QueryStatusEnum.IDLE,
      };
    });

    it('should handle getChats action', () => {
      const nextState = chatsReducer(initialState, getChats());
      expect(nextState).toEqual({
        ...initialState,
        status: QueryStatusEnum.LOADING,
      });
    });

    it('should handle getChatsSuccess action', () => {
      const nextState = chatsReducer(initialState, getChatsSuccess(mockChats));
      expect(nextState).toEqual({
        ...initialState,
        status: QueryStatusEnum.SUCCESS,
        chats: mockChats.data,
        totalPages: mockChats.info.totalPages,
        currentPage: 1,
      });
    });

    it('should handle getChatsError action', () => {
      const nextState = chatsReducer(initialState, getChatsError());
      expect(nextState).toEqual({
        ...initialState,
        status: QueryStatusEnum.ERROR,
      });
    });

    it('should handle getMoreChats action', () => {
      const nextState = chatsReducer(initialState, getMoreChats());
      expect(nextState).toEqual({
        ...initialState,
        status: QueryStatusEnum.LOADING,
      });
    });

    it('should handle getMoreChatsSuccess action', () => {
      const previousState = {
        ...initialState,
        chats: [{ ...mockChats.data[0], id: 'chat1' }],
      };
      const nextState = chatsReducer(
        previousState,
        getMoreChatsSuccess(mockChats),
      );
      expect(nextState).toEqual({
        ...initialState,
        status: QueryStatusEnum.SUCCESS,
        chats: [{ ...mockChats.data[0], id: 'chat1' }, mockChats.data[0]],
        currentPage: initialState.currentPage + 1,
      });
    });

    it('should handle createChat action', () => {
      const previousState = {
        ...initialState,
        chats: [{ ...mockChats.data[0], id: 'chat1' }],
      };
      const mockPayload = {
        id: 'chatId',
        name: 'chatName',
      };

      const nextState = chatsReducer(previousState, createChat(mockPayload));

      expect(nextState).toEqual({
        ...initialState,
        chats: [
          {
            id: mockPayload.id,
            name: mockPayload.name,
            lastMessage: null,
          },
          { ...mockChats.data[0], id: 'chat1' },
        ],
      });
    });

    it('should handle setNameFilter action', () => {
      const mockChatName = 'someName';
      const nextState = chatsReducer(initialState, setNameFilter(mockChatName));
      expect(nextState).toEqual({
        ...initialState,
        status: QueryStatusEnum.LOADING,
        filters: {
          name: mockChatName,
        },
        currentPage: 0,
        chats: [],
      });
    });

    it('should handle deleteChat action', () => {
      const previousState = {
        ...initialState,
        chats: [mockChats.data[0]],
      };
      const mockChatId = mockChats.data[0].id;

      const nextState = chatsReducer(previousState, deleteChat(mockChatId));

      expect(nextState).toEqual({
        ...initialState,
        chats: [],
      });
    });

    it('should handle setLastMessage action', () => {
      const previousState = {
        ...initialState,
        chats: [mockChats.data[0]],
      };
      const mockEventPayload = {
        id: 'messageId',
        chat_id: mockChats.data[0].id,
        message: 'someMessage',
        created_at: '2025-01-01T00:00:00.000Z',
        sender: {
          id: 'userId',
          name: 'userName',
          surname: 'userSurname',
        },
      };

      const nextState = chatsReducer(
        previousState,
        setLastMessage(mockEventPayload),
      );

      expect(nextState).toEqual({
        ...initialState,
        chats: [
          {
            ...mockChats.data[0],
            lastMessage: {
              id: mockEventPayload.id,
              message: mockEventPayload.message,
              created_at: mockEventPayload.created_at,
              sender: {
                name: mockEventPayload.sender.name,
                surname: mockEventPayload.sender.surname,
                is_this_user_message: false,
              },
            },
          },
        ],
      });
    });

    it('should handle updateLastMessage action', () => {
      const mockLastMessage = {
        id: 'messageId',
        message: 'someMessage',
        created_at: '2025-01-01T00:00:00.000Z',
        sender: {
          name: 'userName',
          surname: 'userSurname',
          is_this_user_message: false,
        },
      };
      const previousState = {
        ...initialState,
        chats: [{ ...mockChats.data[0], lastMessage: mockLastMessage }],
      };
      const mockMessageEventPayload = {
        id: mockLastMessage.id,
        message: 'updatedMessage',
        created_at: '2025-01-10T00:00:00.000Z',
        chat_id: mockChats.data[0].id,
        sender: {
          id: 'userId',
          name: mockLastMessage.sender.name,
          surname: mockLastMessage.sender.surname,
        },
      };

      const nextState = chatsReducer(
        previousState,
        updateLastMessage(mockMessageEventPayload),
      );

      expect(nextState).toEqual({
        ...initialState,
        chats: [
          {
            ...mockChats.data[0],
            lastMessage: {
              id: mockLastMessage.id,
              message: mockMessageEventPayload.message,
              created_at: mockLastMessage.created_at,
              sender: {
                name: mockLastMessage.sender.name,
                surname: mockLastMessage.sender.surname,
                is_this_user_message: false,
              },
            },
          },
        ],
      });
    });

    it('should handle deleteLastMessage action', () => {
      const mockLastMessage = {
        id: 'messageId',
        message: 'someMessage',
        created_at: '2025-01-01T00:00:00.000Z',
        sender: {
          name: 'userName',
          surname: 'userSurname',
          is_this_user_message: false,
        },
      };
      const previousState = {
        ...initialState,
        chats: [{ ...mockChats.data[0], lastMessage: mockLastMessage }],
      };
      const mockDeleteMessageEventPayload = {
        id: mockLastMessage.id,
        chat_id: mockChats.data[0].id,
      };

      const nextState = chatsReducer(
        previousState,
        deleteLastMessage(mockDeleteMessageEventPayload),
      );

      expect(nextState).toEqual({
        ...initialState,
        chats: [
          {
            ...mockChats.data[0],
            lastMessage: null,
          },
        ],
      });
    });
  });
});
