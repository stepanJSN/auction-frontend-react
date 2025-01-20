import {
  Typography,
  ToggleButtonGroup,
  ToggleButton,
  SxProps,
  Button,
  Grid2,
} from '@mui/material';
import { useCallback } from 'react';
import { Link, useNavigate } from 'react-router';
import { ROUTES } from '../config/routesConfig';

type FaqHeaderProps = {
  currentPage: string;
};

const containerStyles: SxProps = {
  mb: 2,
  alignItems: 'center',
};

export default function FaqHeader({ currentPage }: FaqHeaderProps) {
  const navigate = useNavigate();
  const handleChange = useCallback(
    (_event: React.MouseEvent<HTMLElement>, newAlignment: string) => {
      navigate(newAlignment);
    },
    [navigate],
  );

  return (
    <Grid2 container spacing={1} sx={containerStyles}>
      <Typography variant="h4">FAQ</Typography>
      <ToggleButtonGroup
        color="primary"
        value={currentPage}
        onChange={handleChange}
        size="small"
        exclusive
        aria-label="FAQ">
        <ToggleButton value={ROUTES.CARDS}>Cards</ToggleButton>
        <ToggleButton value={ROUTES.SETS}>Sets</ToggleButton>
      </ToggleButtonGroup>
      <Button
        component={Link}
        to={
          currentPage === ROUTES.CARDS ? ROUTES.CREATE_CARD : ROUTES.CREATE_SET
        }
        variant="outlined">
        {currentPage === ROUTES.CARDS ? 'Create card' : 'Create set'}
      </Button>
    </Grid2>
  );
}
