import { CircularProgress, Stack, SxProps } from '@mui/material';

const loaderContainerStyles: SxProps = {
  height: '70vh',
  width: '100%',
  alignItems: 'center',
  justifyContent: 'center',
};

export default function PageLoader() {
  return (
    <Stack sx={loaderContainerStyles}>
      <CircularProgress />
    </Stack>
  );
}
