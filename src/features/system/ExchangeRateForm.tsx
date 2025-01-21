import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectExchangeRate,
  getExchangeRate,
  updateExchangeRate,
} from './systemSlice';
import { useForm } from 'react-hook-form';
import { Box, Button, LinearProgress, SxProps } from '@mui/material';
import FormInput from '../../components/FormInput';
import { MutationStatusEnum } from '../../enums/mutationStatus';
import Notification from '../../components/Notification';
import { QueryStatusEnum } from '../../enums/queryStatus.enum';

const formStyles: SxProps = {
  maxWidth: '500px',
};

const formValidationRules = {
  pattern: /^(?!0$)([1-9]\d*(\.\d{1,2})?|0\.\d{1,2})$/,
};

export default function ExchangeRateForm() {
  const dispatch = useDispatch();
  const {
    value: exchangeRate,
    status,
    updateStatus,
  } = useSelector(selectExchangeRate);
  const { control, handleSubmit, setValue } = useForm<{
    exchangeRate: string;
  }>();
  const isFormDisabled =
    status === QueryStatusEnum.LOADING ||
    updateStatus === MutationStatusEnum.PENDING;

  useEffect(() => {
    if (exchangeRate === 0) {
      dispatch(getExchangeRate());
    }
  }, [dispatch, exchangeRate]);

  useEffect(() => {
    setValue('exchangeRate', exchangeRate.toString());
  }, [setValue, exchangeRate]);

  const handleUpdateExchangeRate = useCallback(
    (data: { exchangeRate: string }) => {
      dispatch(updateExchangeRate(+data.exchangeRate));
    },
    [dispatch],
  );

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(handleUpdateExchangeRate)}
      sx={formStyles}>
      {isFormDisabled && <LinearProgress />}
      <FormInput
        name="exchangeRate"
        label="Exchange Rate"
        type="number"
        control={control}
        rules={formValidationRules}
        errorText="Exchange rate should be a positive number and not zero. Format: 0.00"
        disabled={isFormDisabled}
      />
      <Button type="submit" variant="contained" disabled={isFormDisabled}>
        {updateStatus === MutationStatusEnum.PENDING ? 'Updating...' : 'Update'}
      </Button>
      <Notification
        open={updateStatus === MutationStatusEnum.ERROR}
        message="Somethings went wrong while updating exchange rate"
        severity="error"
      />
    </Box>
  );
}
