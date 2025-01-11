import { Button, Stack, SxProps, Typography } from '@mui/material';
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

const buttonsContainerStyles: SxProps = {
  justifyContent: 'center',
};

const headerStyles: SxProps = {
  mb: 2,
};

export default function AllChatsPage() {
  const { chats, hasMore } = useSelector(selectChats);
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
      <ChatsTable chats={chats} />
      <Stack direction="row" sx={buttonsContainerStyles}>
        <Button
          variant="contained"
          onClick={handleLoadMore}
          disabled={!hasMore}>
          Load more
        </Button>
      </Stack>
    </>
  );
}
