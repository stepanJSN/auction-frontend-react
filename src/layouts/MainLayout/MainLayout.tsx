import { Container, Stack, SxProps } from '@mui/material';
import Header from '../Header/Header';
import { Outlet } from 'react-router';
import Footer from '../Footer';
import useUserData from './useUserData';
import useWebsocket from './useWebsocket';
import NewMessageNotification from '../../features/chats/NewMessageNotification';
import useMessageNotification from '../../features/chats/useMessageNotification';
import useNewMessageListener from '../../features/chats/useNewMessageListener';

const globalWrapperStyles: SxProps = {
  minHeight: '100vh',
};

const containerStyles: SxProps = {
  flex: 'auto',
  py: 2,
};

export default function MainLayout() {
  const { notification, handleNotificationClose, handleNewMessage } =
    useMessageNotification();
  useUserData();
  useWebsocket();
  useNewMessageListener(handleNewMessage);

  return (
    <Stack sx={globalWrapperStyles}>
      <Header />
      <NewMessageNotification
        open={!!notification}
        handleClose={handleNotificationClose}
        sender={notification?.sender!}
        chatId={notification?.chatId!}
      />
      <Container sx={containerStyles}>
        <Outlet />
      </Container>
      <Footer />
    </Stack>
  );
}
