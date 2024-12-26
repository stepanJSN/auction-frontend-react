import { styled, LinkProps, Link } from '@mui/material';

export const MenuLink = styled(Link)<LinkProps & { to: string }>(
  ({ theme }) => ({
    color: theme.palette.common.white,
    fontWeight: 500,
  }),
);
