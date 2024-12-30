import { Container, Stack, SxProps } from '@mui/material';
import Header from '../Header/Header';
import { Outlet } from 'react-router';
import Footer from '../Footer';
import useUserData from './useUserData';

const globalWrapperStyles: SxProps = {
  minHeight: '100vh',
};

const containerStyles: SxProps = {
  flex: 'auto',
  py: 2,
};

export default function MainLayout() {
  useUserData();

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
