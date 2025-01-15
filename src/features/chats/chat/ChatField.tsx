import { List, Stack, SxProps } from '@mui/material';
import { MessageState } from './chatSlice';
import { useEffect, useRef } from 'react';
import Message from './Message';

type ChatFieldProps = {
  messages: MessageState[];
  onDeleteMessage: (messageId: string) => void;
  onResendMessage: (messageId: string) => void;
};

const messageFieldContainerStyles: SxProps = {
  height: '70vh',
  overflow: 'auto',
};

export default function ChatField({
  messages,
  onDeleteMessage,
  onResendMessage,
}: ChatFieldProps) {
  const chatBoxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <Stack direction="column-reverse" sx={messageFieldContainerStyles}>
      <List>
        {messages.map((message) => (
          <Message
            key={message.id}
            message={message}
            onDelete={onDeleteMessage}
            onResend={onResendMessage}
          />
        ))}
      </List>
    </Stack>
  );
}
