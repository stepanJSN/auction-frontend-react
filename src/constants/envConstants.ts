const {
  VITE_SERVER_URL: SERVER_URL = 'http://localhost:3000',
  VITE_STRIPE_PUBLISHABLE_KEY: STRIPE_PUBLISHABLE_KEY = 'pk_test',
} = import.meta.env;

export { SERVER_URL, STRIPE_PUBLISHABLE_KEY };
