export interface IMessageEventPayload {
  id: string;
  chat_id: string;
  message: string;
  created_at: string;
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
  created_at: string;
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

export interface ICreateMessage {
  chatId: string;
  message: string;
}

export interface IDeleteMessage {
  chatId: string;
  messageId: string;
}
