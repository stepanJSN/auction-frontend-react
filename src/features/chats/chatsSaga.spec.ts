import { runSaga } from 'redux-saga';
import { chatsService } from '../../services/chatsService';
import { getChatsSaga, getMoreChatsSaga } from './chatsSaga';
import {
  getChatsError,
  getChatsSuccess,
  getMoreChatsSuccess,
} from './chatsSlice';
import { AxiosError } from 'axios';

describe('Chats saga', () => {
  const mockChatResponse = {
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
  const mockChatName = mockChatResponse.data[0].name;
  const mockCurrentPage = 1;
  let requestFindAllChatsMock: jest.SpyInstance;
  let dispatched: any[];

  beforeEach(() => {
    dispatched = [];
    requestFindAllChatsMock = jest.spyOn(chatsService, 'findAll');
  });

  afterEach(() => {
    requestFindAllChatsMock.mockRestore();
  });

  describe('getChatsSaga', () => {
    const runTestSaga = async () => {
      await runSaga(
        {
          dispatch: (action: any) => dispatched.push(action),
          getState: () => ({
            chats: {
              filters: { name: mockChatName },
              currentPage: mockCurrentPage,
            },
          }),
        },
        getChatsSaga,
      ).toPromise();
    };
    it('should call chatsService.findAll and dispatch getChatsSuccess action if request is resolved', async () => {
      requestFindAllChatsMock.mockResolvedValue(mockChatResponse);
      await runTestSaga();

      expect(requestFindAllChatsMock).toHaveBeenCalledWith({
        page: 1,
        name: mockChatName,
      });
      expect(dispatched).toEqual([getChatsSuccess(mockChatResponse)]);
    });

    it('should dispatch getChatsError action if request is rejected', async () => {
      const errorCode = 500;
      const mockResponse = (new AxiosError('Request failed').status =
        errorCode);
      requestFindAllChatsMock.mockRejectedValue(mockResponse);
      await runTestSaga();

      expect(requestFindAllChatsMock).toHaveBeenCalledWith({
        page: 1,
        name: mockChatName,
      });
      expect(dispatched).toEqual([getChatsError()]);
    });
  });

  describe('getMoreChatsSaga', () => {
    const runTestSaga = async () => {
      await runSaga(
        {
          dispatch: (action: any) => dispatched.push(action),
          getState: () => ({
            chats: {
              filters: { name: mockChatName },
              currentPage: mockCurrentPage,
            },
          }),
        },
        getMoreChatsSaga,
      ).toPromise();
    };
    it('should call chatsService.findAll and dispatch getMoreChatsSuccess action if request is resolved', async () => {
      requestFindAllChatsMock.mockResolvedValue(mockChatResponse);
      await runTestSaga();

      expect(requestFindAllChatsMock).toHaveBeenCalledWith({
        page: mockCurrentPage + 1,
      });
      expect(dispatched).toEqual([getMoreChatsSuccess(mockChatResponse)]);
    });

    it('should dispatch getChatsError action if request is rejected', async () => {
      const errorCode = 500;
      const mockResponse = (new AxiosError('Request failed').status =
        errorCode);
      requestFindAllChatsMock.mockRejectedValue(mockResponse);
      await runTestSaga();

      expect(requestFindAllChatsMock).toHaveBeenCalledWith({
        page: mockCurrentPage + 1,
      });
      expect(dispatched).toEqual([getChatsError()]);
    });
  });
});
