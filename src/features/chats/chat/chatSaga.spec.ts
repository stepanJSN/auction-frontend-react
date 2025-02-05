import { runSaga } from 'redux-saga';
import { chatsService } from '../../../services/chatsService';
import {
  createMessageSaga,
  deleteMessageSaga,
  getChatSaga,
  getMoreMessagesSaga,
  resendMessageSaga,
  updateChatSaga,
} from './chatSaga';
import {
  appendMessages,
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
import { AxiosError } from 'axios';

describe('Chat saga', () => {
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
  const mockChat = {
    id: mockChatId,
    name: 'chatName',
    users: [
      {
        id: 'userId',
        name: 'userName',
        surname: 'userSurname',
      },
    ],
  };

  describe('getChatsSaga', () => {
    let requestFindChatMock: jest.SpyInstance;
    let requestFindAllMessageMock: jest.SpyInstance;
    let dispatched: any[];

    beforeEach(() => {
      dispatched = [];
      requestFindChatMock = jest.spyOn(chatsService, 'findOne');
      requestFindAllMessageMock = jest.spyOn(chatsService, 'findAllMessages');
    });

    afterEach(() => {
      requestFindChatMock.mockRestore();
      requestFindAllMessageMock.mockRestore();
    });

    const runTestSaga = async () => {
      await runSaga(
        {
          dispatch: (action: any) => dispatched.push(action),
        },
        getChatSaga,
        {
          payload: mockChatId,
          type: getChat.type,
        },
      ).toPromise();
    };

    it('should call chatsService.findOne and dispatch setChatData action is request is resolved', async () => {
      requestFindChatMock.mockResolvedValue(mockChat);
      requestFindAllMessageMock.mockResolvedValue([]);
      await runTestSaga();

      expect(requestFindChatMock).toHaveBeenCalledWith(mockChatId);
      expect(dispatched).toEqual([setChatData(mockChat), expect.anything()]);
    });

    it('should call chatsService.findOne and dispatch setChatData action if request is rejected', async () => {
      const errorCode = 500;
      const mockResponse = (new AxiosError('Request failed').status =
        errorCode);

      requestFindChatMock.mockRejectedValue(mockResponse);
      requestFindAllMessageMock.mockResolvedValue([]);
      await runTestSaga();

      expect(requestFindChatMock).toHaveBeenCalledWith(mockChatId);
      expect(dispatched).toEqual([setChatError(), expect.anything()]);
    });

    it('should call chatsService.findAllMessages and dispatch setInitialMessages action if request is resolved', async () => {
      const mockChatId = 'chatId';

      requestFindChatMock.mockResolvedValue([]);
      requestFindAllMessageMock.mockResolvedValue(mockMessagesResponse);
      await runTestSaga();

      expect(requestFindAllMessageMock).toHaveBeenCalledWith({
        id: mockChatId,
      });
      expect(dispatched).toEqual([
        expect.anything(),
        setInitialMessages(mockMessagesResponse),
      ]);
    });

    it('should call chatsService.findAllMessages and dispatch setInitialMessages action if request is resolved', async () => {
      const errorCode = 500;
      const mockMessagesResponse = (new AxiosError('Request failed').status =
        errorCode);

      requestFindChatMock.mockResolvedValue([]);
      requestFindAllMessageMock.mockRejectedValue(mockMessagesResponse);
      await runTestSaga();

      expect(requestFindAllMessageMock).toHaveBeenCalledWith({
        id: mockChatId,
      });
      expect(dispatched).toEqual([expect.anything(), setMessagesError()]);
    });
  });

  describe('getMoreMessagesSaga', () => {
    const cursor = 'cursor';
    let requestFindAllMessageMock: jest.SpyInstance;
    let dispatched: any[];

    beforeEach(() => {
      dispatched = [];
      requestFindAllMessageMock = jest.spyOn(chatsService, 'findAllMessages');
    });

    afterEach(() => {
      requestFindAllMessageMock.mockRestore();
    });

    const runTestSaga = async () => {
      await runSaga(
        {
          dispatch: (action: any) => dispatched.push(action),
          getState: () => ({ chat: { messages: { cursor } } }),
        },
        getMoreMessagesSaga,
        {
          payload: mockChatId,
          type: getMoreMessages.type,
        },
      ).toPromise();
    };

    it('should call chatsService.findAllMessages and dispatch appendMessages action if request is resolved', async () => {
      requestFindAllMessageMock.mockResolvedValue(mockMessagesResponse);
      await runTestSaga();

      expect(requestFindAllMessageMock).toHaveBeenCalledWith({
        id: mockChatId,
        cursor,
      });
      expect(dispatched).toEqual([appendMessages(mockMessagesResponse)]);
    });

    it('should dispatch setMessagesError action if request is rejected', async () => {
      const errorCode = 500;
      const mockResponse = (new AxiosError('Request failed').status =
        errorCode);

      requestFindAllMessageMock.mockRejectedValue(mockResponse);
      await runTestSaga();

      expect(dispatched).toEqual([setMessagesError()]);
    });
  });

  describe('createMessageSaga', () => {
    const createMessagePayload = {
      tempId: 'tempId',
      chatId: mockChatId,
      message: 'message',
    };
    let requestCreateMessageMock: jest.SpyInstance;
    let dispatched: any[];

    beforeEach(() => {
      dispatched = [];
      requestCreateMessageMock = jest.spyOn(chatsService, 'createMessage');
    });

    afterEach(() => {
      requestCreateMessageMock.mockRestore();
    });

    const runTestSaga = async () => {
      await runSaga(
        {
          dispatch: (action: any) => dispatched.push(action),
        },
        createMessageSaga,
        {
          payload: createMessagePayload,
          type: createMessage.type,
        },
      ).toPromise();
    };

    it('should call chatsService.createMessage and dispatch setMessageCreationSuccess action if request is resolved', async () => {
      requestCreateMessageMock.mockResolvedValue(mockMessage);
      await runTestSaga();

      expect(requestCreateMessageMock).toHaveBeenCalledWith(
        createMessagePayload,
      );
      expect(dispatched).toEqual([
        setMessageCreationSuccess({
          ...mockMessage,
          tempId: createMessagePayload.tempId,
        }),
      ]);
    });

    it('should dispatch setMessageCreationError action if request is rejected', async () => {
      const errorCode = 500;
      const mockResponse = (new AxiosError('Request failed').status =
        errorCode);

      requestCreateMessageMock.mockRejectedValue(mockResponse);
      await runTestSaga();

      expect(dispatched).toEqual([
        setMessageCreationError({ tempId: createMessagePayload.tempId }),
      ]);
    });
  });

  describe('resendMessageSaga', () => {
    const tempId = 'tempId';
    let requestCreateMessageMock: jest.SpyInstance;
    let dispatched: any[];

    beforeEach(() => {
      dispatched = [];
      requestCreateMessageMock = jest.spyOn(chatsService, 'createMessage');
    });

    afterEach(() => {
      requestCreateMessageMock.mockRestore();
    });

    const runTestSaga = async () => {
      await runSaga(
        {
          dispatch: (action: any) => dispatched.push(action),
          getState: () => ({
            chat: { messages: { data: [{ ...mockMessage, id: tempId }] } },
          }),
        },
        resendMessageSaga,
        {
          payload: { tempId, chatId: mockChatId },
          type: resendMessage.type,
        },
      ).toPromise();
    };

    it('should call chatsService.findAllMessages and dispatch appendMessages action if request is resolved', async () => {
      requestCreateMessageMock.mockResolvedValue(mockMessage);
      await runTestSaga();

      expect(requestCreateMessageMock).toHaveBeenCalledWith(
        expect.objectContaining({
          message: mockMessage.message,
          chatId: mockChatId,
        }),
      );
      expect(dispatched).toEqual([
        setMessageCreationSuccess({
          ...mockMessage,
          tempId,
        }),
      ]);
    });

    it('should dispatch setMessageCreationError action if request is rejected', async () => {
      const errorCode = 500;
      const mockResponse = (new AxiosError('Request failed').status =
        errorCode);

      requestCreateMessageMock.mockRejectedValue(mockResponse);
      await runTestSaga();

      expect(dispatched).toEqual([setMessageCreationError({ tempId })]);
    });
  });

  describe('deleteMessageSaga', () => {
    const deleteMessagePayload = {
      chatId: mockChatId,
      messageId: 'messageId',
    };
    let requestDeleteMessageMock: jest.SpyInstance;
    let dispatched: any[];

    beforeEach(() => {
      dispatched = [];
      requestDeleteMessageMock = jest.spyOn(chatsService, 'deleteMessage');
    });

    afterEach(() => {
      requestDeleteMessageMock.mockRestore();
    });

    const runTestSaga = async () => {
      await runSaga(
        {
          dispatch: (action: any) => dispatched.push(action),
        },
        deleteMessageSaga,
        {
          payload: deleteMessagePayload,
          type: deleteMessage.type,
        },
      ).toPromise();
    };

    it('should call chatsService.update and dispatch setChatData and setUpdateChatStatusSuccess actions if request is resolved', async () => {
      requestDeleteMessageMock.mockResolvedValue(mockChat);
      await runTestSaga();

      expect(requestDeleteMessageMock).toHaveBeenCalledWith(
        deleteMessagePayload,
      );
      expect(dispatched).toEqual([
        setDeleteMessageSuccess(deleteMessagePayload.messageId),
      ]);
    });

    it('should dispatch setUpdateChatStatusError action if request is rejected', async () => {
      const errorCode = 500;
      const mockResponse = (new AxiosError('Request failed').status =
        errorCode);

      requestDeleteMessageMock.mockRejectedValue(mockResponse);
      await runTestSaga();

      expect(dispatched).toEqual([
        setDeleteMessageError(deleteMessagePayload.messageId),
      ]);
    });
  });

  describe('updateChatSaga', () => {
    const updateChatPayload = {
      id: mockChatId,
      name: mockChat.name,
      participants: [mockChat.id],
    };
    let requestUpdateChatMock: jest.SpyInstance;
    let dispatched: any[];

    beforeEach(() => {
      dispatched = [];
      requestUpdateChatMock = jest.spyOn(chatsService, 'update');
    });

    afterEach(() => {
      requestUpdateChatMock.mockRestore();
    });

    const runTestSaga = async () => {
      await runSaga(
        {
          dispatch: (action: any) => dispatched.push(action),
        },
        updateChatSaga,
        {
          payload: updateChatPayload,
          type: updateChat.type,
        },
      ).toPromise();
    };

    it('should call chatsService.update and dispatch setChatData and setUpdateChatStatusSuccess actions if request is resolved', async () => {
      requestUpdateChatMock.mockResolvedValue(mockChat);
      await runTestSaga();

      expect(requestUpdateChatMock).toHaveBeenCalledWith(
        updateChatPayload.id,
        updateChatPayload,
      );
      expect(dispatched).toEqual([
        setChatData(mockChat),
        setUpdateChatStatusSuccess(),
      ]);
    });

    it('should dispatch setUpdateChatStatusError action if request is rejected', async () => {
      const errorCode = 500;
      const mockResponse = (new AxiosError('Request failed').status =
        errorCode);

      requestUpdateChatMock.mockRejectedValue(mockResponse);
      await runTestSaga();

      expect(dispatched).toEqual([setUpdateChatStatusError(errorCode)]);
    });
  });
});
