import { Button, Grid2, Grid2Props, styled, SxProps, Theme, Typography, useMediaQuery, useTheme } from "@mui/material";
import Menu from "./Menu";
import { adminMenu, userMenu } from "../../config/menuConfig";
import ProfileMenu from "./ProfileMenu";
import { useRef, useCallback, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { logout, selectAuth } from "../../features/auth/authSlice";
import { useOnClickOutside } from "usehooks-ts";
import { useNavigate } from "react-router";
import MenuIcon from '@mui/icons-material/Menu';
import { getUser, selectUser } from "../../features/users/userSlice";
import { QueryStatusEnum } from "../../enums/queryStatus.enum";
import { Role } from "../../enums/role.enum";
import MainContainer from "../MainContainer";

const HeaderStyled = styled(Grid2)<Grid2Props>(({ theme }) => ({
  position: "relative",
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
  const { id, role } = useSelector(selectAuth);
  const { status, name, surname, balance, rating } = useSelector(selectUser);
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
    navigate('/signin');
    dispatch(logout());
  }, [dispatch, navigate]);

  useEffect(() => {
    if (!id) return;
    dispatch(getUser(id));
  }, [dispatch, id, navigate]);

  const menuItems = role === Role.USER ? userMenu : adminMenu;

  return (
    <MainContainer>
      <HeaderStyled ref={ref} container component="header" alignItems="center" spacing={2}>
        <Grid2 {...logoGridStyles}>
          <Typography sx={logoStyles}>
            Rick and Morty cards auction
          </Typography>
        </Grid2>
        {isBigScreen &&
          <Grid2 size={5}>
            <Menu menuItems={menuItems} />
          </Grid2>
        }
        <Grid2 display="flex" justifyContent="end" size="grow">
          <Button variant="contained" color="secondary" onClick={handleProfileMenuOpen}>
            {isBigScreen ? "Profile" : <MenuIcon />}
          </Button>
        </Grid2>
        {isProfileMenuOpen &&
          <ProfileMenu
            menuItems={menuItems}
            isUserDataLoaded={status === QueryStatusEnum.SUCCESS}
            onLogout={handleLogout}
            username={`${name} ${surname}`}
            balance={balance!}
            rating={rating}
            isBigScreen={isBigScreen}
          />}
      </HeaderStyled>
    </MainContainer>
  );
}

