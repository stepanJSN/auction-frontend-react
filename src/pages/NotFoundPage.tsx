import { Box, Stack, SxProps, Typography } from '@mui/material';
import Link from '../components/Link';
import { ROUTES } from '../config/routesConfig';

const containerStyles: SxProps = {
  height: '70vh',
  alignItems: 'center',
  justifyContent: 'center',
};

const textWrapperStyles: SxProps = {
  textAlign: 'center',
};

export default function NotFoundPage() {
  return (
    <Stack sx={containerStyles}>
      <Box sx={textWrapperStyles}>
        <Typography variant="h4" gutterBottom>
          404 Page not found
        </Typography>
        <Link to={ROUTES.USER_CARDS}>Go to the home page</Link>
      </Box>
    </Stack>
  );
}
