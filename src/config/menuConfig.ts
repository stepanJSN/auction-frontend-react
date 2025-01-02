import { ROUTES } from './routesConfig';

export const userMenu = [
  { label: 'MyCards', path: ROUTES.USER_CARDS },
  { label: 'Auctions', path: ROUTES.AUCTIONS },
  { label: 'chats', path: ROUTES.CHATS },
  { label: 'FAQ', path: ROUTES.CARDS },
];

export const adminMenu = [
  { label: 'Users', path: ROUTES.USERS },
  { label: 'MyCards', path: ROUTES.USER_CARDS },
  { label: 'Cards', path: ROUTES.CARDS },
  { label: 'Auctions', path: ROUTES.AUCTIONS },
  { label: 'Sets', path: ROUTES.SETS },
  { label: 'Statistics', path: ROUTES.STATISTICS },
];
