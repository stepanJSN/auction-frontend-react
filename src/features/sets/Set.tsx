import {
  Box,
  Stack,
  Typography,
  Chip,
  Grid2,
  SxProps,
  Button,
} from '@mui/material';
import { useCallback, useMemo } from 'react';
import { ISet } from '../../types/sets.interface';
import Card from '../../components/Card';
import { Link } from 'react-router';
import { ROUTES } from '../../config/routesConfig';

type SetProps = {
  set: ISet;
};

const cardColumnsNumber = { xs: 12, sm: 6, md: 4, lg: 3 };
const setHeaderStyles: SxProps = {
  alignItems: 'center',
};

const subHeaderStyles: SxProps = {
  mb: 1,
};

export default function Set({ set }: SetProps) {
  const setContainerStyles = useMemo(
    () => ({
      borderColor: set.is_user_has_set ? 'success.main' : 'text.secondary',
      borderWidth: 2,
      borderStyle: 'solid',
      borderRadius: 3,
      p: 2,
    }),
    [set.is_user_has_set],
  );

  const cardDetailsRoute = useCallback(
    (cardId: string) => ROUTES.SET_CARD_DETAILS(cardId),
    [],
  );
  const setEditRoute = useCallback(
    (setId: string) => ROUTES.EDIT_SET(setId),
    [],
  );

  return (
    <Box sx={setContainerStyles}>
      <Stack direction="row" spacing={2} sx={setHeaderStyles}>
        <Typography variant="h4" color={set.is_user_has_set ? 'success' : ''}>
          {set.name}
        </Typography>
        {set.is_user_has_set && (
          <Chip label="You have collected this set" color="success" />
        )}
      </Stack>
      <Stack direction="row" spacing={2} sx={subHeaderStyles}>
        <Typography variant="h6">Bonus: {set.bonus}</Typography>
        <Button variant="outlined" component={Link} to={setEditRoute(set.id)}>
          Edit
        </Button>
      </Stack>
      <Grid2 container spacing={2}>
        {set.cards.map((card) => (
          <Grid2 size={cardColumnsNumber} key={card.id}>
            <Card {...card} cardPagePath={cardDetailsRoute} />
          </Grid2>
        ))}
      </Grid2>
    </Box>
  );
}
