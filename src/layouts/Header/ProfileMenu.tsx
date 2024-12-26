import {
  Button,
  CircularProgress,
  Divider,
  List,
  ListItem,
  SxProps,
  Typography,
  Menu as MuiMenu,
  styled,
} from '@mui/material';
import { MenuLink } from './MenuLink';
import { Link } from 'react-router';
import Menu from './Menu';

type ProfileMenuProps = {
  isMenuOpen: boolean;
  handleClose: () => void;
  anchorMenuEl: null | HTMLElement;
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
};

const containerStyles: SxProps = {
  backgroundColor: 'primary.main',
  color: 'common.white',
  width: 250,
};
const dividerStyles = {
  backgroundColor: 'common.white',
};
const balanceItemStyles = {
  display: 'block',
};

const StyledMenu = styled(MuiMenu)(() => ({
  '& .MuiMenu-list': {
    padding: '0',
  },
}));

export default function ProfileMenu({
  username,
  balance,
  isBigScreen,
  rating,
  onLogout,
  isUserDataLoaded,
  menuItems,
  isMenuOpen,
  handleClose,
  anchorMenuEl,
}: ProfileMenuProps) {
  return (
    <StyledMenu anchorEl={anchorMenuEl} open={isMenuOpen} onClose={handleClose}>
      <List sx={containerStyles} dense>
        {!isBigScreen && (
          <>
            <Menu menuItems={menuItems} />
            <Divider sx={dividerStyles} component="li" />
          </>
        )}
        {!isUserDataLoaded && <CircularProgress />}
        {isUserDataLoaded && (
          <>
            <ListItem>
              <Typography>Hi, {username}</Typography>
            </ListItem>
            <Divider sx={dividerStyles} component="li" />
            {rating !== null && (
              <>
                <ListItem>
                  <Typography>Rating: {rating}</Typography>
                </ListItem>
                <Divider sx={dividerStyles} component="li" />
              </>
            )}
            <ListItem sx={balanceItemStyles}>
              <Typography>Balance:</Typography>
              <List dense disablePadding>
                <ListItem>Available: {balance.available}</ListItem>
                <ListItem>Total: {balance.total}</ListItem>
              </List>
            </ListItem>
            <Divider sx={dividerStyles} component="li" />
          </>
        )}
        <ListItem>
          <MenuLink component={Link} to="/profile">
            More info
          </MenuLink>
        </ListItem>
        <ListItem>
          <Button
            variant="contained"
            color="secondary"
            fullWidth
            onClick={onLogout}>
            Logout
          </Button>
        </ListItem>
      </List>
    </StyledMenu>
  );
}
