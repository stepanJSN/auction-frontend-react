import {
  Button,
  LinearProgress,
  Stack,
  SxProps,
  Typography,
} from '@mui/material';
import DebouncedInput from '../components/DebouncedInput';
import { useSelector } from 'react-redux';
import { selectChats } from '../features/chats/chatsSlice';
import ChatsTable from '../features/chats/ChatsTable';
import PageLoader from '../components/PageLoader';
import { QueryStatusEnum } from '../enums/queryStatus.enum';
import PageError from '../components/PageError';
import { LinearProgressPlaceholder } from '../components/LinearProgressPlaceholder';
import LoadMoreBtn from '../components/LoadMoreBtn';
import { ResponsiveStyleValue } from '@mui/system';
import useChats from '../features/chats/useChats';
import { Link, Outlet } from 'react-router';
import { ROUTES } from '../config/routesConfig';

const headerStyles: SxProps = {
  mb: 2,
};

const headerDirection: ResponsiveStyleValue<'row' | 'column'> = {
  xs: 'column',
  sm: 'row',
};

export default function AllChatsPage() {
  const { chats, hasMore, status } = useSelector(selectChats);
  const { handleLoadMore, handleNameFilterChange } = useChats();

  return (
    <>
      <Typography variant="h4" gutterBottom>
        Your chats
      </Typography>
      <Stack direction={headerDirection} spacing={1} sx={headerStyles}>
        <DebouncedInput
          handleDebouncedChange={handleNameFilterChange}
          label="Search"
        />
        <Button component={Link} to={ROUTES.CREATE_CHAT} variant="outlined">
          Create chat
        </Button>
      </Stack>
      {status === QueryStatusEnum.LOADING && chats.length === 0 && (
        <PageLoader />
      )}
      {status === QueryStatusEnum.ERROR && <PageError />}
      {status === QueryStatusEnum.SUCCESS && chats.length === 0 && (
        <Typography>Chats not found</Typography>
      )}
      {chats.length !== 0 && (
        <>
          {status === QueryStatusEnum.LOADING && <LinearProgress />}
          {status === QueryStatusEnum.SUCCESS && <LinearProgressPlaceholder />}
          <ChatsTable chats={chats} />
          <LoadMoreBtn
            isLoading={status === QueryStatusEnum.LOADING}
            hasMore={hasMore}
            handleLoadMore={handleLoadMore}
          />
        </>
      )}
      <Outlet />
    </>
  );
}
