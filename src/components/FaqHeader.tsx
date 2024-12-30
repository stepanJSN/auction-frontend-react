import {
  Stack,
  Typography,
  ToggleButtonGroup,
  ToggleButton,
  SxProps,
} from '@mui/material';
import { useCallback } from 'react';
import { useNavigate } from 'react-router';
import { ROUTES } from '../config/routesConfig';

type FaqHeaderProps = {
  currentPage: string;
};

const containerStyles: SxProps = {
  mb: 2,
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
    <Stack direction="row" spacing={2} sx={containerStyles}>
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
    </Stack>
  );
}
