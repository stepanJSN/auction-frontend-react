import { useCallback } from 'react';
import TransactionForm from '../features/users/TransactionForm';
import { Alert, Grid2, GridSize, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectUser,
  topUpBalance,
  withdrawBalance,
} from '../features/users/userSlice';
import { AppDispatch } from '../redux/store';
import { MutationStatusEnum } from '../enums/mutationStatus';
import { transactionErrorMessages } from '../features/users/transactionErrorMessages';
import useErrorMessage from '../hooks/useErrorMessage';

const alertStyles = {
  mb: 2,
};

const gridFormColumns: Record<string, GridSize> = {
  xs: 12,
  md: 'grow',
};

export default function Transactions() {
  const { balance, updateStatus, errorCode } = useSelector(selectUser);
  const dispatch = useDispatch<AppDispatch>();
  const isPending = updateStatus === MutationStatusEnum.PENDING;
  const getErrorMessage = useErrorMessage(transactionErrorMessages);

  const onTopUpSubmit = useCallback(
    (data: { amount: string }) => {
      dispatch(topUpBalance(+data.amount));
    },
    [dispatch],
  );

  const onWithdrawSubmit = useCallback(
    (data: { amount: string }) => {
      dispatch(withdrawBalance(+data.amount));
    },
    [dispatch],
  );

  return (
    <>
      <Typography variant="h5">Total balance: {balance?.total}</Typography>
      <Typography variant="h5" gutterBottom>
        Available balance: {balance?.available}
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
            isPending={isPending}
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
    </>
  );
}
