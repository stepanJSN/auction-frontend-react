export const ROUTES = {
  SIGN_UP: '/signup',
  SIGN_IN: '/signin',
  PROFILE: '/profile',
  AUCTIONS: '/auctions',
  AUCTION_DETAILS: (auctionId: string) => `/auctions/${auctionId}`,
  CREATE_AUCTION: (cardId: string) => `/auctions/create/${cardId}`,
  EDIT_AUCTION: (auctionId: string) => `/auctions/edit/${auctionId}`,
  CHATS: '/chats',
  CHAT: (id: string) => `/chats/${id}`,
  CREATE_CHAT: '/chats/create',
  CARDS: '/cards',
  CARD_DETAILS: (cardId: string) => `/cards/${cardId}`,
  USER_CARDS: '/',
  USER_CARDS_DETAILS: (cardId: string) => `/my-cards/${cardId}`,
  CREATE_CARD: '/cards/create',
  EDIT_CARD: (cardId: string) => `/cards/edit/${cardId}`,
  SETS: '/sets',
  CREATE_SET: '/sets/create',
  EDIT_SET: (setId: string) => `/sets/edit/${setId}`,
  SET_CARD_DETAILS: (cardId: string) => `./cards/${cardId}`,
  STATISTICS: '/statistics',
  USERS: '/users',
  TRANSACTIONS: '/transactions',
  LOCATIONS: '/locations',
  CREATE_LOCATION: '/locations/create',
  EDIT_LOCATION: (locationId: number) => `/locations/edit/${locationId}`,
  EPISODES: '/episodes',
  CREATE_EPISODE: '/episodes/create',
  EDIT_EPISODE: (episodeId: number) => `/episodes/edit/${episodeId}`,
};
