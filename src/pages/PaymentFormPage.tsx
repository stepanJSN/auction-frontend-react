import {
  Alert,
  Box,
  Button,
  LinearProgress,
  SxProps,
  Typography,
} from '@mui/material';
import {
  PaymentElement,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js';
import ModalPage from '../components/ModalPage';
import { useLocation } from 'react-router';
import { useSelector } from 'react-redux';
import { selectExchangeRate } from '../features/system/systemSlice';
import { ROUTES } from '../config/routesConfig';
import { useState } from 'react';

const formWrapperStyles: SxProps = {
  p: 2,
  minWidth: {
    xs: '300px',
    sm: '400px',
  },
  minHeight: '300px',
};

const titleStyles: SxProps = {
  maxWidth: '90%',
};

export default function PaymentFormPage() {
  const stripe = useStripe();
  const elements = useElements();
  const { state } = useLocation();
  const { numberOfPoints } = state;
  const { value: exchangeRate } = useSelector(selectExchangeRate);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    const result = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: window.location.origin + ROUTES.TRANSACTIONS,
      },
    });

    if (result.error) {
      setErrorMessage(result.error.message ?? 'Unknown error');
      console.log(result.error.message);
    }

    setIsLoading(false);
  };

  return (
    <ModalPage>
      {isLoading && <LinearProgress />}
      <Box sx={formWrapperStyles}>
        <Typography variant="h6" gutterBottom sx={titleStyles}>
          You will be charged ${(numberOfPoints * exchangeRate).toFixed(2)} for{' '}
          {numberOfPoints}CP
        </Typography>
        <form onSubmit={handleSubmit}>
          <PaymentElement />
          <Button disabled={!stripe} type="submit">
            Submit
          </Button>
        </form>
        {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
      </Box>
    </ModalPage>
  );
}
