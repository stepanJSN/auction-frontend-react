import { styled, Typography } from '@mui/material';

interface CardLabelProps {
  colorVariant?: 'success' | 'info';
}

export const CardLabel = styled(Typography, {
  shouldForwardProp: (prop) => prop !== 'colorVariant',
})<CardLabelProps>(({ theme, colorVariant }) => ({
  color: theme.palette.common.white,
  backgroundColor:
    colorVariant === 'info'
      ? theme.palette.primary.main
      : theme.palette.success.main,
  padding: theme.spacing(0.5),
}));
