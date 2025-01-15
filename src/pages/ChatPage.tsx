import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { selectChat } from '../features/chats/chat/chatSlice';
import { Divider, Grid2 } from '@mui/material';
import ChatHeader from '../features/chats/chat/ChatHeader';
import { QueryStatusEnum } from '../enums/queryStatus.enum';
import ChatField from '../features/chats/chat/ChatField';
import ChatSettings from '../features/chats/chat/ChatSettings';
import MessageForm from '../features/chats/chat/MessageForm';
import ChatDeletedDialog from '../features/chats/chat/ChatDeletedDialog';
import useSidebarVisibility from '../hooks/useSidebarVisibility';
import useChat from '../features/chats/chat/useChat';

const settingsGridBreakpoints = {
  xs: 0,
  md: 4,
};

export default function ChatPage() {
  const { chatId } = useParams();
  const { name, participants, status, messages } = useSelector(selectChat);
  const {
    isSidebarOpen,
    isMobileVersion,
    handleSidebarOpen,
    handleSidebarClose,
    ref,
  } = useSidebarVisibility('md');
  const {
    handleLoadMore,
    handleCreateMessage,
    handleMessageDelete,
    handleMessageResend,
    isScrollToBottomActive,
    isChatDeletedDialogOpen,
  } = useChat(chatId);

  return (
    <>
      <Grid2 container spacing={1}>
        <Grid2 size="grow">
          {status === QueryStatusEnum.SUCCESS && (
            <>
              <ChatHeader
                name={name!}
                isOpenSettingsButtonShown={isMobileVersion}
                numberOfParticipants={participants!.length}
                onSettingsButtonClick={handleSidebarOpen}
              />
              <ChatField
                messages={messages!.data}
                isScrollToBottomActive={isScrollToBottomActive}
                onDeleteMessage={handleMessageDelete}
                onResendMessage={handleMessageResend}
                onLoadMoreMessages={handleLoadMore}
              />
              <MessageForm onSubmit={handleCreateMessage} />
            </>
          )}
        </Grid2>
        {!isMobileVersion && <Divider orientation="vertical" flexItem />}
        <Grid2 size={settingsGridBreakpoints}>
          {status === QueryStatusEnum.SUCCESS && (
            <ChatSettings
              ref={ref}
              isOpen={isSidebarOpen}
              participants={participants!}
              chatId={chatId!}
              onClose={handleSidebarClose}
              isMobileVersion={isMobileVersion}
            />
          )}
        </Grid2>
      </Grid2>
      <ChatDeletedDialog open={isChatDeletedDialogOpen} />
    </>
  );
}
