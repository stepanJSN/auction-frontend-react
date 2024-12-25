import { Button, Divider, List, ListItem, SxProps, Typography } from "@mui/material";
import { MenuLink } from "./MenuLink";
import { Link } from "react-router";

type ProfileMenuProps = {
  username: string;
  balance: {
    available: number;
    total: number;
  };
  rating: number;
  onLogout: () => void;
}

const containerStyles: SxProps = {
  position: 'absolute',
  top: 50,
  right: 0,
  backgroundColor: 'primary.main',
  color: 'common.white',
  width: 250
}
const dividerStyles = {
  backgroundColor: 'common.white'
}
const balanceItemStyles = {
  display: 'block',
}

export default function ProfileMenu({ username, balance, rating, onLogout }: ProfileMenuProps) {
  return (
    <List sx={containerStyles} dense>
      <ListItem>
        <Typography>Hi, {username}</Typography>
      </ListItem>
      <Divider sx={dividerStyles} component="li" />
      <ListItem>
        <Typography>Rating: {rating}</Typography>
      </ListItem>
      <Divider sx={dividerStyles} component="li" />
      <ListItem sx={balanceItemStyles}>
        <Typography>Balance:</Typography>
        <List dense disablePadding>
          <ListItem>Available: {balance.available}</ListItem>
          <ListItem>Total: {balance.total}</ListItem>
        </List>
      </ListItem>
      <Divider sx={dividerStyles} component="li" />
      <ListItem>
        <MenuLink 
          component={Link}
          to="/profile"
        >
          More info
        </MenuLink>
      </ListItem>
      <ListItem>
        <Button
          variant="contained" 
          color="secondary"
          fullWidth
          onClick={onLogout}
        >
          Logout
        </Button>
      </ListItem>
    </List>
  )
}
