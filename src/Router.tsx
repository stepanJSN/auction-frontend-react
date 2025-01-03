import { BrowserRouter, Routes, Route } from 'react-router';
import Signin from './pages/Signin';
import AuthLayout from './layouts/AuthLayout';
import Signup from './pages/Signup';
import MainLayout from './layouts/MainLayout/MainLayout';
import Profile from './pages/Profile';
import UserCardsPage from './pages/UserCardsPage';
import CardPage from './pages/CardPage';
import AllCardsPage from './pages/AllCardsPage';
import SetsPage from './pages/SetsPage';
import Transactions from './pages/Transactions';
import UsersPage from './pages/UsersPage';
import CreateCardPage from './pages/CreateCardPage';
import EditCardPage from './pages/EditCardPage';

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
          <Route path="/cards" element={<AllCardsPage />}>
            <Route path=":cardId" element={<CardPage />} />
          </Route>
          <Route path="/create-card" element={<CreateCardPage />} />
          <Route path="/edit-card/:cardId" element={<EditCardPage />} />
          <Route path="/sets" element={<SetsPage />}>
            <Route path=":cardId" element={<CardPage />} />
          </Route>
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/users" element={<UsersPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
