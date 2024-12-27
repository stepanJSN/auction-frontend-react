import { Container, Stack, SxProps } from '@mui/material';
import Header from './Header/Header';
import { Outlet } from 'react-router';
import Footer from './Footer';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { authService } from '../services/authService';
import { signinSuccess } from '../features/auth/authSlice';
import { Role } from '../enums/role.enum';

const globalWrapperStyles: SxProps = {
  minHeight: '100vh',
};

const containerStyles: SxProps = {
  flex: 'auto',
  py: 2,
};

export default function MainLayout() {
  const dispatch = useDispatch();

  useEffect(() => {
    const userId = authService.getUserId();
    const userRole = authService.getUserRole() as Role;
    if (userId && userRole) {
      dispatch(signinSuccess({ id: userId, role: userRole }));
    }
  }, [dispatch]);

  return (
    <Stack sx={globalWrapperStyles}>
      <Header />
      <Container sx={containerStyles}>
        <Outlet />
      </Container>
      <Footer />
    </Stack>
  );
}
