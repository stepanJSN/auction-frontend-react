import { createBrowserRouter, RouterProvider } from 'react-router';
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
import LocationsPage from './pages/LocationsPage';
import CreateLocationPage from './pages/CreateLocationPage';
import EditLocationPage from './pages/EditLocationPage';
import EpisodesPage from './pages/EpisodesPage';
import CreateEpisodePage from './pages/CreateEpisodePage';
import EditEpisodePage from './pages/EditEpisodePage';
import CreateSetPage from './pages/CreateSetPage';
import EditSetPage from './pages/EditSetPage';
import CreateAuctionPage from './pages/CreateAuctionPage';
import AuctionsPage from './pages/AuctionsPage';
import AuctionPage from './pages/AuctionPage';
import EditAuctionPage from './pages/EditAuctionPage';
import AllChatsPage from './pages/AllChatsPage';
import CreateChatPage from './pages/CreateChatPage';
import ChatPage from './pages/ChatPage';
import EditChatPage from './pages/EditChatPage';
import StatisticsPage from './pages/StatisticsPage';
import NotFoundPage from './pages/NotFoundPage';
import { ErrorBoundary } from './ErrorBoundary';
import PaymentFormPage from './pages/PaymentFormPage';
import SystemSettingsPage from './pages/SystemSettingsPage';

const router = createBrowserRouter([
  {
    element: <AuthLayout />,
    errorElement: <ErrorBoundary />,
    children: [
      { path: '/signin', element: <Signin /> },
      { path: '/signup', element: <Signup /> },
    ],
  },
  {
    element: <MainLayout />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        path: '/',
        element: <UserCardsPage />,
        children: [
          { path: 'my-cards/:cardId', element: <CardPage parentPath="/" /> },
        ],
      },
      { path: 'profile', element: <Profile /> },
      { path: 'cards/create', element: <CreateCardPage /> },
      { path: 'cards/edit/:cardId', element: <EditCardPage /> },
      {
        path: 'cards',
        element: <AllCardsPage />,
        children: [{ path: ':cardId', element: <CardPage /> }],
      },
      {
        path: 'sets/create',
        element: <CreateSetPage />,
        children: [
          {
            path: 'cards/:cardId',
            element: <CardPage parentPath="/sets/create" />,
          },
        ],
      },
      {
        path: 'sets/edit/:setId',
        element: <EditSetPage />,
        children: [
          {
            path: 'cards/:cardId',
            element: <CardPage parentPath="../" />,
          },
        ],
      },
      {
        path: 'sets',
        element: <SetsPage />,
        children: [
          {
            path: 'cards/:cardId',
            element: <CardPage parentPath="/sets" />,
          },
        ],
      },
      {
        path: 'transactions',
        element: <Transactions />,
        children: [{ path: 'topUp', element: <PaymentFormPage /> }],
      },
      { path: 'users', element: <UsersPage /> },
      {
        path: 'locations',
        element: <LocationsPage />,
        children: [
          { path: 'create', element: <CreateLocationPage /> },
          { path: 'edit/:locationId', element: <EditLocationPage /> },
        ],
      },
      {
        path: 'episodes',
        element: <EpisodesPage />,
        children: [
          { path: 'create', element: <CreateEpisodePage /> },
          { path: 'edit/:episodeId', element: <EditEpisodePage /> },
        ],
      },
      { path: 'auctions', element: <AuctionsPage /> },
      { path: 'auctions/create/:cardId', element: <CreateAuctionPage /> },
      { path: 'auctions/edit/:auctionId', element: <EditAuctionPage /> },
      { path: 'auctions/:auctionId', element: <AuctionPage /> },
      {
        path: 'chats',
        element: <AllChatsPage />,
        children: [{ path: 'create', element: <CreateChatPage /> }],
      },
      {
        path: 'chats/:chatId',
        element: <ChatPage />,
        children: [{ path: 'edit', element: <EditChatPage /> }],
      },
      { path: 'statistics', element: <StatisticsPage /> },
      { path: 'settings', element: <SystemSettingsPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
]);

export default function Router() {
  return <RouterProvider router={router} />;
}
