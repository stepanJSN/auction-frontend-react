import {
  Alert,
  Box,
  Button,
  LinearProgress,
  SxProps,
  Typography,
} from '@mui/material';
import { PaymentElement } from '@stripe/react-stripe-js';
import ModalPage from '../components/ModalPage';
import { useLocation } from 'react-router';
import { useSelector } from 'react-redux';
import { selectExchangeRate } from '../features/system/systemSlice';
import usePayment from '../features/transactions/usePayment';

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
  const { state } = useLocation();
  const { numberOfPoints } = state;
  const { value: exchangeRate } = useSelector(selectExchangeRate);
  const { isLoading, errorMessage, handleConfirmPayment, isSubmitAvailable } =
    usePayment();

  return (
    <ModalPage>
      {isLoading && <LinearProgress />}
      <Box sx={formWrapperStyles}>
        <Typography variant="h6" gutterBottom sx={titleStyles}>
          You will be charged ${(numberOfPoints * exchangeRate).toFixed(2)} for{' '}
          {numberOfPoints}CP
        </Typography>
        <form onSubmit={handleConfirmPayment}>
          <PaymentElement />
          <Button disabled={!isSubmitAvailable} type="submit">
            Submit
          </Button>
        </form>
        {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
      </Box>
    </ModalPage>
  );
}
