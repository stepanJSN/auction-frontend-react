import { Button, Grid2, Grid2Props, styled, SxProps, Theme, Typography, useMediaQuery, useTheme } from "@mui/material";
import Menu from "./Menu";
import { userMenu } from "../../config/menuConfig";
import ProfileMenu from "./ProfileMenu";
import { useRef, useMemo, useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { logout } from "../../features/auth/authSlice";
import { useOnClickOutside } from "usehooks-ts";
import { useNavigate } from "react-router";
import MenuIcon from '@mui/icons-material/Menu';

const HeaderStyled = styled(Grid2)<Grid2Props>(({ theme }) => ({
  position: "relative",
  backgroundColor: theme.palette.primary.main,
  padding: theme.spacing(1, 2),
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(0, 2),
  },
}));

const logoStyles: SxProps<Theme> = (theme: Theme) => ({
  color: theme.palette.common.white,
  fontWeight: 500,
  fontSize: {
    xs: theme.typography.subtitle1.fontSize,
    md: theme.typography.h6.fontSize,
  }
});

const logoGridStyles: Grid2Props = {
  size: {
    xs: 'grow',
    md: 3,
  }
}

export default function Header() {
  const dispatch = useDispatch<AppDispatch>();
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const ref = useRef(null);
  const navigate = useNavigate();
  const theme = useTheme();
  const isBigScreen = useMediaQuery(theme.breakpoints.up('md'));

  const handleProfileMenuOpen = useCallback(() => {
    setIsProfileMenuOpen(!isProfileMenuOpen);
  }, [isProfileMenuOpen])

  const handleClickOutside = useCallback(() => {
    setIsProfileMenuOpen(false);
  }, [])

  useOnClickOutside(ref, handleClickOutside)

  const handleLogout = useCallback(() => {
    dispatch(logout());
    navigate('/signin');
  }, [dispatch, navigate])

  const balance = useMemo(() => ({
    available: 100,
    total: 200,
  }), []);

  return (
    <HeaderStyled ref={ref} container component="header" alignItems="center" spacing={2}>
      <Grid2 {...logoGridStyles}>
        <Typography sx={logoStyles}>
          Rick and Morty cards auction
        </Typography>
      </Grid2>
      {isBigScreen &&
        <Grid2 size={5}>
          <Menu menuItems={userMenu} />
        </Grid2>
      }
      <Grid2 display="flex" justifyContent="end" size="grow">
        <Button variant="contained" color="secondary" onClick={handleProfileMenuOpen}>
          {isBigScreen ? "Profile" : <MenuIcon />}
        </Button>
      </Grid2>
      {isProfileMenuOpen &&
        <ProfileMenu
          onLogout={handleLogout}
          username="John Doe"
          balance={balance}
          rating={5}
          isBigScreen={isBigScreen}
        />}
    </HeaderStyled>
  );
}

