import { apiWithAuth } from '../apiConfig';
import { IChatSummary } from '../types/chats.interfaces';

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
};
