import { apiWithAuth } from '../apiConfig';
import {
  IChat,
  IChatSummary,
  ICreateChat,
  ICreateChatResponse,
} from '../types/chats.interfaces';
import { IGetMessagesResponse } from '../types/message.interfaces';

export const chatsService = {
  findAll: async ({ page, name }: { page?: number; name?: string }) => {
    const params = new URLSearchParams();
    if (page) params.append('page', page.toString());
    if (name) params.append('name', name);
    const chats = await apiWithAuth.get<IChatSummary[]>('/chats', {
      params,
    });
    return chats.data;
  },

  findOne: async (id: string) => {
    const chat = await apiWithAuth.get<IChat>(`/chats/${id}`);
    return chat.data;
  },

  findAllMessages: async ({ id, cursor }: { cursor?: string; id: string }) => {
    const params = new URLSearchParams();
    if (cursor) params.append('cursor', cursor);
    const chat = await apiWithAuth.get<IGetMessagesResponse>(
      `/chats/${id}/messages`,
      {
        params,
      },
    );
    return chat.data;
  },

  create: async (data: ICreateChat) => {
    const chat = await apiWithAuth.post<ICreateChatResponse>('/chats', data);
    return chat.data;
  },

  deleteMessage: async ({
    chatId,
    messageId,
  }: {
    chatId: string;
    messageId: string;
  }) => {
    await apiWithAuth.delete(`/chats/${chatId}/messages/${messageId}`);
  },
};
