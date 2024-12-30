import { styled, Typography } from '@mui/material';

interface CardLabelProps {
  colorVariant?: 'success' | 'error';
}

export const CardLabel = styled(Typography, {
  shouldForwardProp: (prop) => prop !== 'colorVariant',
})<CardLabelProps>(({ theme, colorVariant }) => ({
  color: theme.palette.common.white,
  backgroundColor:
    colorVariant === 'error'
      ? theme.palette.error.light
      : theme.palette.success.main,
  padding: theme.spacing(0.5),
}));
