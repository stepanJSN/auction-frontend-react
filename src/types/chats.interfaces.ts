import { IMessage } from './message.interfaces';
import { IPagination } from './pagination.interface';

export interface IChatSummary {
  id: string;
  name: string;
  lastMessage: IMessage | null;
}

export interface IChat {
  id: string;
  name: string;
  users: {
    id: string;
    name: string;
    surname: string;
  }[];
}

export interface IGetChatsResponse {
  data: IChatSummary[];
  info: IPagination;
}

export interface ICreateChat {
  name?: string;
  participants: string[];
}

export interface ICreateChatResponse {
  id: string;
}

export interface ICreateChatEventPayload {
  id: string;
  name: string;
}
