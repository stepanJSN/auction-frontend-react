import { useCallback, useMemo, useEffect } from 'react';
import TransactionForm from '../features/transactions/TransactionForm';
import { Alert, Button, Grid2, GridSize, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import {
  getUser,
  selectUser,
  topUpBalance,
  withdrawBalance,
} from '../features/user/userSlice';
import { AppDispatch } from '../redux/store';
import { MutationStatusEnum } from '../enums/mutationStatus';
import {
  TransactionBedRequestCodesEnum,
  transactionErrorMessages,
} from '../features/transactions/transactionErrorMessages';
import useErrorMessage from '../hooks/useErrorMessage';
import {
  getSystemFee,
  selectSystemFee,
} from '../features/systemFee/systemFeeSlice';
import { Role } from '../enums/role.enum';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import usePaymentIntent from '../features/transactions/usePaymentIntent';
import { Outlet } from 'react-router';
import {
  getExchangeRate,
  selectExchangeRate,
} from '../features/system/systemSlice';
import useCreateStripeAccount from '../features/transactions/useCreateStripeAccount';
import { ErrorCodesEnum } from '../enums/errorCodes.enum';
import { STRIPE_PUBLISHABLE_KEY } from '../constants/envConstants';

const stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY);

const alertStyles = {
  mt: 1,
};

const gridFormColumns: Record<string, GridSize> = {
  xs: 12,
  md: 'grow',
};

export default function Transactions() {
  const { balance, updateStatus, errorCode, role, hasStripeAccount } =
    useSelector(selectUser);
  const { totalAmount } = useSelector(selectSystemFee);
  const { value: exchangeRate } = useSelector(selectExchangeRate);
  const dispatch = useDispatch<AppDispatch>();
  const isPending = updateStatus === MutationStatusEnum.PENDING;
  const getErrorMessage = useErrorMessage(transactionErrorMessages);
  const { clientSecret, handleTopUp, topUpStatus } = usePaymentIntent();
  const { createAccountStatus, createAccount } = useCreateStripeAccount();
  const isAccountCreating = createAccountStatus === MutationStatusEnum.PENDING;

  useEffect(() => {
    dispatch(getUser());
    dispatch(getExchangeRate());
    if (role === Role.ADMIN) {
      dispatch(getSystemFee());
    }
  }, [dispatch, role]);

  const onTopUpSubmit = useCallback(
    (data: { amount: string }) => {
      if (role === Role.ADMIN) {
        dispatch(topUpBalance(+data.amount));
        return;
      }
      handleTopUp(+data.amount);
    },
    [dispatch, role, handleTopUp],
  );

  const onWithdrawSubmit = useCallback(
    (data: { amount: string }) => {
      dispatch(withdrawBalance(+data.amount));
    },
    [dispatch],
  );

  const stripeOptions = useMemo(() => ({ clientSecret }), [clientSecret]);
  return (
    <>
      <Typography variant="h5">
        Total balance: {balance?.total ?? 'Loading...'} CP
      </Typography>
      <Typography variant="h5">
        Available balance: {balance?.available ?? 'Loading...'} CP
      </Typography>
      {role === Role.ADMIN && (
        <Typography variant="h5" gutterBottom>
          System fee amount: {totalAmount ?? 'Loading...'} CP
        </Typography>
      )}
      <Typography variant="h5" gutterBottom>
        Exchange rate:{' '}
        {exchangeRate ? `for 1CP = ${exchangeRate}$` : 'Loading...'}
      </Typography>
      <Grid2 container spacing={2}>
        <Grid2 size="grow">
          <TransactionForm
            title="Top Up"
            onSubmit={onTopUpSubmit}
            isPending={isPending || topUpStatus === MutationStatusEnum.PENDING}
          />
        </Grid2>
        <Grid2 size={gridFormColumns}>
          <TransactionForm
            title="Withdraw"
            onSubmit={onWithdrawSubmit}
            isPending={isPending}
          />
        </Grid2>
      </Grid2>
      {!hasStripeAccount && role === Role.USER && (
        <Alert severity="warning" sx={alertStyles}>
          If you want to withdraw funds, you need to add create a Stripe
          account.
          <Button
            disabled={isAccountCreating}
            onClick={createAccount}
            size="small">
            {isAccountCreating ? 'Creating...' : 'Create account'}
          </Button>
        </Alert>
      )}
      {updateStatus === MutationStatusEnum.ERROR && (
        <Alert severity="error" sx={alertStyles}>
          {getErrorMessage(errorCode)}
          {(errorCode ===
            TransactionBedRequestCodesEnum.STRIPE_ACCOUNT_NOT_COMPLETED ||
            errorCode === ErrorCodesEnum.NotFound) && (
            <Button
              disabled={isAccountCreating}
              onClick={createAccount}
              size="small">
              {isAccountCreating ? 'Creating...' : 'Create account'}
            </Button>
          )}
        </Alert>
      )}
      {clientSecret && (
        <Elements stripe={stripePromise} options={stripeOptions}>
          <Outlet />
        </Elements>
      )}
    </>
  );
}
