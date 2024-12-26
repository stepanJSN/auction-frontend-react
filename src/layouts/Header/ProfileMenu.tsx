import { Button, CircularProgress, Divider, List, ListItem, SxProps, Typography } from "@mui/material";
import { MenuLink } from "./MenuLink";
import { Link } from "react-router";
import Menu from "./Menu";

type ProfileMenuProps = {
  isUserDataLoaded: boolean;
  username: string;
  isBigScreen: boolean;
  menuItems: { label: string; path: string }[];
  balance: {
    available: number;
    total: number;
  };
  rating: number | null;
  onLogout: () => void;
}

const containerStyles: SxProps = {
  position: 'absolute',
  top: {
    xs: 47,
    md: 50,
  },
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

export default function ProfileMenu({ username, balance, isBigScreen, rating, onLogout, isUserDataLoaded, menuItems }: ProfileMenuProps) {
  return (
    <List sx={containerStyles} dense>
      {!isBigScreen && 
        <>
          <Menu menuItems={menuItems} />
          <Divider sx={dividerStyles} component="li" />
        </>
      }
      {!isUserDataLoaded && <CircularProgress />}
      {
        isUserDataLoaded &&
        <>
          <ListItem>
            <Typography>Hi, {username}</Typography>
          </ListItem>
          <Divider sx={dividerStyles} component="li" />
          {rating && 
            <>
            <ListItem>
              <Typography>Rating: {rating}</Typography>
            </ListItem>
            <Divider sx={dividerStyles} component="li" />
            </>
          }
          <ListItem sx={balanceItemStyles}>
            <Typography>Balance:</Typography>
            <List dense disablePadding>
              <ListItem>Available: {balance.available}</ListItem>
              <ListItem>Total: {balance.total}</ListItem>
            </List>
          </ListItem>
          <Divider sx={dividerStyles} component="li" />
        </>
      }
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
