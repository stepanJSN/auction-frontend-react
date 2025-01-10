import { IPagination } from './pagination.interface';

export interface IChatSummary {
  id: string;
  users: {
    name: string;
    surname: string;
  }[];
  name: string | null;
  lastMessage: {
    created_at: Date;
    message: string;
    sender: {
      name: string;
      surname: string;
    };
  };
}

export interface IGetChatsResponse {
  data: IChatSummary[];
  info: IPagination;
}
