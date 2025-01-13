import { Button, Stack, SxProps } from '@mui/material';

type LoadMoreBtnProps = {
  hasMore: boolean;
  isLoading: boolean;
  handleLoadMore: () => void;
};

const buttonsContainerStyles: SxProps = {
  justifyContent: 'center',
};

export default function LoadMoreBtn({
  hasMore,
  isLoading,
  handleLoadMore,
}: LoadMoreBtnProps) {
  return (
    <Stack direction="row" sx={buttonsContainerStyles}>
      <Button variant="contained" onClick={handleLoadMore} disabled={!hasMore}>
        {isLoading ? 'Loading...' : 'Load more'}
      </Button>
    </Stack>
  );
}
