import { Button, Grid2, Grid2Props, styled, Typography } from "@mui/material";
import Menu from "./Menu";
import { userMenu } from "../../config/menuConfig";
import ProfileMenu from "./ProfileMenu";
import { useRef, useMemo, useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { logout } from "../../features/auth/authSlice";
import { useOnClickOutside } from "usehooks-ts";
import { useNavigate } from "react-router";

const HeaderStyled = styled(Grid2)<Grid2Props>(({ theme }) => ({
  position: "relative",
  backgroundColor: theme.palette.primary.main,
  padding: theme.spacing(0, 2),
}));

export default function Header() {
  const dispatch = useDispatch<AppDispatch>();
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const ref = useRef(null);
  const navigate = useNavigate();

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
      <Grid2 size={3}>
        <Typography color="white" variant="h6" fontWeight={500}>
          Rick and Morty cards auction
        </Typography>
      </Grid2>
      <Grid2 size={5}>
        <Menu menuItems={userMenu} />
      </Grid2>
      <Grid2 display="flex" justifyContent="end" size={4}>
        <Button variant="contained" color="secondary" onClick={handleProfileMenuOpen}>
          Profile
        </Button>
      </Grid2>
      {isProfileMenuOpen &&
        <ProfileMenu
          onLogout={handleLogout}
          username="John Doe"
          balance={balance}
          rating={5}
        />}
    </HeaderStyled>
  );
}

