import { apiWithAuth } from '../apiConfig';
import { chatsService } from './chatsService';

jest.mock('../apiConfig', () => ({
  apiWithAuth: {
    post: jest.fn(),
    get: jest.fn(),
    patch: jest.fn(),
    delete: jest.fn(),
  },
}));

describe('chatsService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should find all chats', async () => {
    const mockPayload = {
      page: 1,
      name: 'test',
    };
    const mockResponseData = {
      data: [
        {
          id: 'chatId',
          name: mockPayload.name,
          lastMessage: null,
        },
      ],
      info: { page: mockPayload.page, totalCount: 1, totalPages: 0 },
    };
    jest
      .spyOn(apiWithAuth, 'get')
      .mockResolvedValue({ data: mockResponseData });

    const result = await chatsService.findAll(mockPayload);
    const [[, options]] = (apiWithAuth.get as jest.Mock).mock.calls;
    const receivedParams = Object.fromEntries(options.params);

    expect(receivedParams).toEqual({
      page: mockPayload.page.toString(),
      name: mockPayload.name,
    });
    expect(apiWithAuth.get).toHaveBeenCalledWith('/chats', expect.any(Object));
    expect(result).toEqual(mockResponseData);
  });

  it('should find one chat by id', async () => {
    const mockId = 'chatId';
    const mockResponseData = {
      id: mockId,
      name: 'Chat 1',
      users: [
        {
          id: 'users1',
          name: 'User 1',
          surname: 'User 2',
        },
      ],
    };
    jest
      .spyOn(apiWithAuth, 'get')
      .mockResolvedValue({ data: mockResponseData });

    const result = await apiWithAuth.get(`/chats/${mockId}`);
    expect(apiWithAuth.get).toHaveBeenCalledWith(`/chats/${mockId}`);
    expect(result.data).toEqual(mockResponseData);
  });

  it('should find all messages by chat id', async () => {
    const mockPayload = {
      id: 'chatId',
      cursor: 'cursor',
    };
    const mockResponseData = {
      data: [
        {
          id: 'messageId',
          created_at: '2023-01-01T00:00:00.000Z',
          message: 'test message',
          sender: {
            name: 'user',
            surname: 'userSurname',
            is_this_user_message: false,
          },
        },
      ],
      pagination: {
        cursor: 'cursor',
        hasNextPage: false,
      },
    };
    jest
      .spyOn(apiWithAuth, 'get')
      .mockResolvedValue({ data: mockResponseData });
    const result = await chatsService.findAllMessages(mockPayload);
    const [[, options]] = (apiWithAuth.get as jest.Mock).mock.calls;
    const receivedParams = Object.fromEntries(options.params);

    expect(receivedParams).toEqual({
      cursor: mockPayload.cursor,
    });
    expect(apiWithAuth.get).toHaveBeenCalledWith(
      `/chats/${mockPayload.id}/messages`,
      expect.any(Object),
    );
    expect(result).toEqual(mockResponseData);
  });

  it('should create a chat', async () => {
    const mockPayload = {
      name: 'Chat 1',
      participants: ['user1', 'user2'],
    };
    const mockResponse = {
      id: 'chatId',
    };
    jest.spyOn(apiWithAuth, 'post').mockResolvedValue({ data: mockResponse });
    const result = await chatsService.create(mockPayload);

    expect(apiWithAuth.post).toHaveBeenCalledWith('/chats', mockPayload);
    expect(result).toEqual(mockResponse);
  });

  it('should update a chat', async () => {
    const mockId = 'chatId';
    const mockPayload = {
      name: 'Updated name',
    };
    const mockResponseData = {
      id: mockId,
      name: mockPayload.name,
      users: [
        {
          id: 'users1',
          name: 'User 1',
          surname: 'User 2',
        },
      ],
    };
    jest
      .spyOn(apiWithAuth, 'patch')
      .mockResolvedValue({ data: mockResponseData });
    const result = await apiWithAuth.patch(`/chats/${mockId}`, mockPayload);

    expect(apiWithAuth.patch).toHaveBeenCalledWith(
      `/chats/${mockId}`,
      mockPayload,
    );
    expect(result.data).toEqual(mockResponseData);
  });

  it('should delete a chat', async () => {
    const mockId = 'chatId';
    await apiWithAuth.delete(`/chats/${mockId}`);
    expect(apiWithAuth.delete).toHaveBeenCalledWith(`/chats/${mockId}`);
  });

  it('should create a message', async () => {
    const mockPayload = {
      chatId: 'chatId',
      message: 'message',
    };
    const mockResponse = {
      id: 'messageId',
      created_at: new Date().toISOString(),
      message: mockPayload.message,
      sender: {
        name: 'user1',
        surname: 'user1Surname',
        is_this_user_message: true,
      },
    };
    jest.spyOn(apiWithAuth, 'post').mockResolvedValue({ data: mockResponse });

    const result = await chatsService.createMessage(mockPayload);
    expect(apiWithAuth.post).toHaveBeenCalledWith(
      `/chats/${mockPayload.chatId}/messages`,
      {
        message: mockPayload.message,
      },
    );
    expect(result).toEqual(mockResponse);
  });

  it('should delete a message by id', async () => {
    const mockPayload = {
      chatId: 'chatId',
      messageId: 'messageId',
    };
    await chatsService.deleteMessage(mockPayload);
    expect(apiWithAuth.delete).toHaveBeenCalledWith(
      `/chats/${mockPayload.chatId}/messages/${mockPayload.messageId}`,
    );
  });
});
