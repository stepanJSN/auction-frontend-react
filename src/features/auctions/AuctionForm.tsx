import { useMemo } from 'react';
import { Grid2 } from '@mui/material';
import FormInput from '../../components/FormInput';
import { useForm } from 'react-hook-form';
import { IAuction, ICreateAuction } from '../../types/auctions.interfaces';
import FormDateTimePicker from '../../components/FormDateTimePicker';
import dayjs, { Dayjs } from 'dayjs';

type AuctionFormProps = {
  data?: Omit<
    IAuction,
    'card' | 'is_this_user_auction' | 'highest_bid' | 'is_completed'
  >;
  actions: React.ReactNode;
  isFormInactive?: boolean;
  onSubmit: (
    data: Omit<ICreateAuction, 'cardId' | 'endTime'> & { endTime: Dayjs },
  ) => void;
};

const inputGridSize = {
  xs: 12,
  sm: 6,
};

const inputValidationRules = {
  pattern: /^\d+$/,
  required: true,
};

const optionalInputValidationRules = {
  pattern: /^\d+$/,
};

export default function AuctionForm({
  actions,
  onSubmit,
  isFormInactive,
  data,
}: AuctionFormProps) {
  const { control, handleSubmit } = useForm<
    Omit<ICreateAuction, 'cardId' | 'endTime'> & { endTime: Dayjs }
  >(
    useMemo(
      () => ({
        defaultValues: {
          startingBid: data?.starting_bid,
          minBidStep: data?.min_bid_step,
          minLength: data?.min_length,
          endTime: dayjs(data?.end_time),
          maxBid: data?.max_bid ?? undefined,
        },
      }),
      [
        data?.end_time,
        data?.max_bid,
        data?.min_bid_step,
        data?.min_length,
        data?.starting_bid,
      ],
    ),
  );
  return (
    <Grid2
      container
      spacing={1}
      component="form"
      onSubmit={handleSubmit(onSubmit)}>
      <Grid2 size={inputGridSize}>
        <FormInput
          name="startingBid"
          label="Starting bid"
          type="number"
          margin="none"
          rules={inputValidationRules}
          disabled={isFormInactive}
          control={control}
          errorText="Starting bid is required and must ne number"
        />
      </Grid2>
      <Grid2 size={inputGridSize}>
        <FormInput
          name="minBidStep"
          label="Min bid step"
          type="number"
          margin="none"
          rules={inputValidationRules}
          disabled={isFormInactive}
          control={control}
          errorText="Min bid step is required and must ne number"
        />
      </Grid2>
      <Grid2 size={inputGridSize}>
        <FormInput
          name="maxBid"
          label="Max bid"
          type="number"
          margin="none"
          rules={optionalInputValidationRules}
          disabled={isFormInactive}
          control={control}
          errorText="Max bid must ne number"
        />
      </Grid2>
      <Grid2 size={inputGridSize}>
        <FormInput
          name="minLength"
          label="Min length in minutes"
          type="number"
          margin="none"
          rules={inputValidationRules}
          disabled={isFormInactive}
          control={control}
          errorText="Min length is required and must ne number"
        />
      </Grid2>
      <Grid2 size={inputGridSize}>
        <FormDateTimePicker
          name="endTime"
          label="End time"
          control={control}
          disabled={isFormInactive}
          required
          errorText="End time is required"
        />
      </Grid2>
      <Grid2 size={12}>{actions}</Grid2>
    </Grid2>
  );
}
