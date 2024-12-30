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
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { selectAuth } from '../../features/auth/authSlice';
import MenuIcon from '@mui/icons-material/Menu';
import { selectUser } from '../../features/users/userSlice';
import { QueryStatusEnum } from '../../enums/queryStatus.enum';
import { Role } from '../../enums/role.enum';
import MainContainer from '../MainContainer';
import useMenu from './useMenu';

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
  const { role } = useSelector(selectAuth);
  const { status, name, surname, balance, rating } = useSelector(selectUser);
  const { anchorMenuEl, isMenuOpen, handleMenuClick, handleMenuClose } =
    useMenu();
  const theme = useTheme();
  const isBigScreen = useMediaQuery(theme.breakpoints.up('md'));

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
          username={`${name} ${surname}`}
          balance={balance!}
          rating={rating}
          isBigScreen={isBigScreen}
        />
      </HeaderStyled>
    </MainContainer>
  );
}
