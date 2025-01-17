import { Stack, Box, Typography, SxProps } from '@mui/material';
import { useRouteError } from 'react-router';

const containerStyles: SxProps = {
  height: '100vh',
  alignItems: 'center',
  justifyContent: 'center',
};

const textWrapperStyles: SxProps = {
  textAlign: 'center',
};

export function ErrorBoundary() {
  const error = useRouteError();
  console.error(error);

  return (
    <Stack sx={containerStyles}>
      <Box sx={textWrapperStyles}>
        <Typography variant="h4" gutterBottom>
          Some error happened. Try again later
        </Typography>
      </Box>
    </Stack>
  );
}
