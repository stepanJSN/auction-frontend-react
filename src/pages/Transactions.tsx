import { useCallback, useMemo, useEffect } from 'react';
import TransactionForm from '../features/user/TransactionForm';
import { Alert, Grid2, GridSize, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import {
  getUser,
  selectUser,
  topUpBalance,
  withdrawBalance,
} from '../features/user/userSlice';
import { AppDispatch } from '../redux/store';
import { MutationStatusEnum } from '../enums/mutationStatus';
import { transactionErrorMessages } from '../features/user/transactionErrorMessages';
import useErrorMessage from '../hooks/useErrorMessage';
import {
  getSystemFee,
  selectSystemFee,
} from '../features/systemFee/systemFeeSlice';
import { Role } from '../enums/role.enum';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import usePayment from '../features/payment/usePayment';
import { Outlet } from 'react-router';
import {
  getExchangeRate,
  selectExchangeRate,
} from '../features/system/systemSlice';

const stripePromise = loadStripe(
  'pk_test_51QjJZaHXHc6gWwzQpo2D8AwOzPnYJxGF19wcPK2dgGVJrtJgX8Nu2UVlupKP9yXWeqlq6jPznObNhTcuefLqmwd500ZmEZTqjc',
);

const alertStyles = {
  mb: 2,
};

const gridFormColumns: Record<string, GridSize> = {
  xs: 12,
  md: 'grow',
};

export default function Transactions() {
  const { balance, updateStatus, errorCode, role } = useSelector(selectUser);
  const { totalAmount } = useSelector(selectSystemFee);
  const { value: exchangeRate } = useSelector(selectExchangeRate);
  const dispatch = useDispatch<AppDispatch>();
  const isPending = updateStatus === MutationStatusEnum.PENDING;
  const getErrorMessage = useErrorMessage(transactionErrorMessages);
  const { clientSecret, handleTopUp, topUpStatus } = usePayment();

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
      {updateStatus === MutationStatusEnum.ERROR && (
        <Alert severity="error" sx={alertStyles}>
          {getErrorMessage(errorCode)}
        </Alert>
      )}
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
      {clientSecret && (
        <Elements stripe={stripePromise} options={stripeOptions}>
          <Outlet />
        </Elements>
      )}
    </>
  );
}
