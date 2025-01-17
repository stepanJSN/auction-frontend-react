import { styled, LinkProps } from '@mui/material';
import Link from '../../components/Link';

export const MenuLink = styled(Link)<LinkProps & { to: string }>(
  ({ theme }) => ({
    width: '100%',
    color: theme.palette.common.white,
    fontWeight: 500,
  }),
);
