import { BrowserRouter, Routes, Route } from 'react-router';
import Signin from './pages/Signin';
import AuthLayout from './layouts/AuthLayout';
import Signup from './pages/Signup';
import MainLayout from './layouts/MainLayout';
import Profile from './pages/Profile';
import UserCardsPage from './pages/UserCardsPage';
import CardPage from './pages/CardPage';

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
        </Route>
        <Route element={<MainLayout />}>
          <Route path="/" element={<UserCardsPage />}>
            <Route path=":cardId" element={<CardPage />} />
          </Route>
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
