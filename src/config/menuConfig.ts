import { ROUTES } from './routesConfig';

export const userMenu = [
  { label: 'MyCards', path: ROUTES.USER_CARDS },
  { label: 'Auctions', path: ROUTES.AUCTIONS },
  { label: 'Chats', path: ROUTES.CHATS },
  { label: 'FAQ', path: ROUTES.CARDS },
];

export const adminMenu = [
  { label: 'Users', path: ROUTES.USERS },
  { label: 'MyCards', path: ROUTES.USER_CARDS },
  { label: 'Cards', path: ROUTES.CARDS },
  { label: 'Auctions', path: ROUTES.AUCTIONS },
  { label: 'Sets', path: ROUTES.SETS },
  { label: 'Chats', path: ROUTES.CHATS },
  { label: 'Locations', path: ROUTES.LOCATIONS },
  { label: 'Episodes', path: ROUTES.EPISODES },
  { label: 'Statistics', path: ROUTES.STATISTICS },
];
