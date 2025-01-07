import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import Router from './Router.tsx';
import { Provider } from 'react-redux';
import { store } from './redux/store.ts';
import { CssBaseline } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import './global.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <CssBaseline />
        <Router />
      </LocalizationProvider>
    </Provider>
  </StrictMode>,
);
