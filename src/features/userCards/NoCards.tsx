import { Stack, Typography, Button, SxProps } from '@mui/material';
import { Link as RouterLink } from 'react-router';
import { ROUTES } from '../../config/routesConfig';
import Link from '../../components/Link';

const containerStyles: SxProps = {
  alignItems: 'center',
};
const actionStyles: SxProps = {
  alignItems: 'center',
  justifyContent: 'center',
};
export default function NoCards() {
  return (
    <Stack sx={containerStyles}>
      <Typography variant="h5" gutterBottom>
        You have no cards
      </Typography>
      <Stack direction="row" spacing={2} sx={actionStyles}>
        <Button
          component={RouterLink}
          to={ROUTES.AUCTIONS}
          variant="contained"
          color="success">
          Buy cards on auctions
        </Button>
        <Link to={ROUTES.CARDS}>See all cards</Link>
      </Stack>
    </Stack>
  );
}
