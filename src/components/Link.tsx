import { Link as MuiLink, LinkProps } from '@mui/material';
import { Link as RouterLink } from 'react-router';

export default function Link(props: LinkProps & { to: string }) {
  return (
    <MuiLink component={RouterLink} {...props}>
      {props.children}
    </MuiLink>
  );
}
