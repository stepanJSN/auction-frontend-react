import {
  Button,
  Grid2,
  Grid2Props,
  styled,
  SxProps,
  Theme,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import Menu from './Menu';
import { adminMenu, userMenu } from '../../config/menuConfig';
import ProfileMenu from './ProfileMenu';
import { useCallback, useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import { selectAuth } from '../../features/auth/authSlice';
import MenuIcon from '@mui/icons-material/Menu';
import { getUser, selectUser } from '../../features/users/userSlice';
import { QueryStatusEnum } from '../../enums/queryStatus.enum';
import { Role } from '../../enums/role.enum';
import MainContainer from '../MainContainer';
import useLogout from '../../hooks/useLogout';

const HeaderStyled = styled(Grid2)<Grid2Props>(({ theme }) => ({
  position: 'relative',
  padding: theme.spacing(1, 0),
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(0),
  },
}));

const logoStyles: SxProps<Theme> = (theme: Theme) => ({
  color: theme.palette.common.white,
  fontWeight: 500,
  fontSize: {
    xs: theme.typography.subtitle1.fontSize,
    md: theme.typography.h6.fontSize,
  },
});

const logoGridStyles: Grid2Props = {
  size: {
    xs: 'grow',
    md: 3,
  },
};

export default function Header() {
  const dispatch = useDispatch<AppDispatch>();
  const { id, role } = useSelector(selectAuth);
  const { status, name, surname, balance, rating } = useSelector(selectUser);
  const [anchorMenuEl, setAnchorMenuEl] = useState<null | HTMLElement>(null);
  const isMenuOpen = Boolean(anchorMenuEl);
  const theme = useTheme();
  const isBigScreen = useMediaQuery(theme.breakpoints.up('md'));
  const logout = useLogout();

  const handleMenuClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorMenuEl(event.currentTarget);
    },
    [],
  );
  const handleMenuClose = useCallback(() => {
    setAnchorMenuEl(null);
  }, []);

  useEffect(() => {
    if (id && status === QueryStatusEnum.IDLE) {
      dispatch(getUser(id));
    }
    if (id === null) {
      logout();
    }
  }, [dispatch, id, logout, status]);

  const menuItems = useMemo(
    () => (role === Role.USER ? userMenu : adminMenu),
    [role],
  );

  return (
    <MainContainer>
      <HeaderStyled
        container
        component="header"
        alignItems="center"
        spacing={2}>
        <Grid2 {...logoGridStyles}>
          <Typography sx={logoStyles}>Rick and Morty cards auction</Typography>
        </Grid2>
        {isBigScreen && (
          <Grid2 size={5}>
            <Menu menuItems={menuItems} />
          </Grid2>
        )}
        <Grid2 display="flex" justifyContent="end" size="grow">
          <Button
            variant="contained"
            color="secondary"
            onClick={handleMenuClick}>
            {isBigScreen ? 'Profile' : <MenuIcon />}
          </Button>
        </Grid2>
        <ProfileMenu
          isMenuOpen={isMenuOpen}
          handleClose={handleMenuClose}
          anchorMenuEl={anchorMenuEl}
          menuItems={menuItems}
          isUserDataLoaded={status === QueryStatusEnum.SUCCESS}
          onLogout={logout}
          username={`${name} ${surname}`}
          balance={balance!}
          rating={rating}
          isBigScreen={isBigScreen}
        />
      </HeaderStyled>
    </MainContainer>
  );
}
