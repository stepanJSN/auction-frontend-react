import { LinkProps, SxProps } from '@mui/material';
import Link from './Link';

const linkStyles: SxProps = {
  display: 'block',
  textAlign: 'center',
  mt: 1,
};

export default function FormLink(props: LinkProps & { to: string }) {
  return (
    <Link {...props} sx={linkStyles}>
      {props.children}
    </Link>
  );
}
