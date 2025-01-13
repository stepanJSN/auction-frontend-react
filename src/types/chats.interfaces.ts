import { IPagination } from './pagination.interface';

export interface IChatSummary {
  id: string;
  name: string;
  lastMessage: {
    id: string;
    created_at: Date;
    message: string;
    sender: {
      name: string;
      surname: string;
      is_this_user_message: boolean;
    };
  } | null;
}

export interface IGetChatsResponse {
  data: IChatSummary[];
  info: IPagination;
}
