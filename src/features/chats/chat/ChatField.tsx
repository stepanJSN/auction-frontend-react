import { List, Stack, SxProps } from '@mui/material';
import { MessageState } from './chatSlice';
import React, { useEffect, useRef } from 'react';
import Message from './Message';
import { useIntersectionObserver } from 'usehooks-ts';

type ChatFieldProps = {
  messages: MessageState[];
  isScrollToBottomActive: boolean;
  onDeleteMessage: (messageId: string) => void;
  onResendMessage: (messageId: string) => void;
  onLoadMoreMessages: () => void;
};

const messageFieldContainerStyles: SxProps = {
  height: '70vh',
  overflow: 'auto',
};

const intersectionObserverOptions = {
  threshold: 0.5,
};

export default function ChatField({
  messages,
  onDeleteMessage,
  onResendMessage,
  onLoadMoreMessages,
  isScrollToBottomActive,
}: ChatFieldProps) {
  const chatBoxRef = useRef<HTMLDivElement>(null);
  const { isIntersecting, ref } = useIntersectionObserver(
    intersectionObserverOptions,
  );

  useEffect(() => {
    if (chatBoxRef.current && isScrollToBottomActive) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages, isScrollToBottomActive]);

  useEffect(() => {
    if (isIntersecting) {
      onLoadMoreMessages();
    }
  }, [isIntersecting, onLoadMoreMessages]);

  return (
    <Stack
      ref={chatBoxRef}
      direction="column-reverse"
      sx={messageFieldContainerStyles}>
      <List>
        {messages.map((message, index) => (
          <React.Fragment key={message.id || index}>
            {index === 0 && <div key={index} ref={ref}></div>}
            <Message
              key={message.id}
              message={message}
              onDelete={onDeleteMessage}
              onResend={onResendMessage}
            />
          </React.Fragment>
        ))}
      </List>
    </Stack>
  );
}
