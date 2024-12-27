import { styled, Typography } from '@mui/material';

export const CardLabel = styled(Typography)(({ theme }) => ({
  color: theme.palette.common.white,
  backgroundColor: theme.palette.error.light,
  padding: theme.spacing(0.5),
}));
