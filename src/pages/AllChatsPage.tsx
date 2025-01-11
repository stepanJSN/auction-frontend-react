import {
  Button,
  LinearProgress,
  Stack,
  SxProps,
  Typography,
} from '@mui/material';
import DebouncedInput from '../components/DebouncedInput';
import { useDispatch, useSelector } from 'react-redux';
import {
  getChats,
  getMoreChats,
  selectChats,
  setNameFilter,
} from '../features/chats/chatsSlice';
import { useCallback, useEffect } from 'react';
import ChatsTable from '../features/chats/ChatsTable';
import PageLoader from '../components/PageLoader';
import { QueryStatusEnum } from '../enums/queryStatus.enum';
import PageError from '../components/PageError';
import { LinearProgressPlaceholder } from '../components/LinearProgressPlaceholder';
import LoadMoreBtn from '../components/LoadMoreBtn';

const headerStyles: SxProps = {
  mb: 2,
};

export default function AllChatsPage() {
  const { chats, hasMore, status } = useSelector(selectChats);
  const dispatch = useDispatch();

  const handleNameFilterChange = useCallback(
    (name: string) => {
      dispatch(setNameFilter(name));
    },
    [dispatch],
  );

  const handleLoadMore = useCallback(() => {
    dispatch(getMoreChats());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getChats());
  }, [dispatch]);

  return (
    <>
      <Typography variant="h4" gutterBottom>
        Your chats
      </Typography>
      <Stack direction="row" spacing={2} sx={headerStyles}>
        <DebouncedInput
          handleDebouncedChange={handleNameFilterChange}
          label="Search"
        />
        <Button variant="outlined">Create chat</Button>
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
    </>
  );
}
