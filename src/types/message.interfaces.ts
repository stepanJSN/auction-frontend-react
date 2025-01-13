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
