export interface IMessageEventPayload {
  id: string;
  chat_id: string;
  message: string;
  created_at: Date;
  sender: {
    id: string;
    name: string;
    surname: string;
  };
}

export interface IDeleteMessageEventPayload {
  id: string;
  chat_id: string;
}

export interface IMessage {
  id: string;
  created_at: Date;
  message: string;
  sender: {
    name: string;
    surname: string;
    is_this_user_message: boolean;
  };
}

export interface IGetMessagesResponse {
  data: IMessage[];
  pagination: {
    cursor: string;
    hasNextPage: boolean;
  };
}
