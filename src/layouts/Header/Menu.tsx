import { List, ListItem, SxProps } from '@mui/material';
import { Link as RouterLink } from 'react-router';
import { MenuLink } from './MenuLink';

type MenuProps = {
  menuItems: {
    label: string;
    path: string;
  }[];
};

const listStyles: SxProps = {
  display: {
    xs: 'block',
    md: 'flex',
  },
};

export default function Menu({ menuItems }: MenuProps) {
  return (
    <List sx={listStyles}>
      {menuItems.map((item) => (
        <ListItem key={item.label}>
          <MenuLink component={RouterLink} to={item.path}>
            {item.label}
          </MenuLink>
        </ListItem>
      ))}
    </List>
  );
}
