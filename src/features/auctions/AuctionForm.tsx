import { Grid2 } from '@mui/material';
import FormInput from '../../components/FormInput';
import { useForm } from 'react-hook-form';
import { ICreateAuction } from '../../types/auctions.interfaces';
import FormDateTimePicker from '../../components/FormDateTimePicker';

type AuctionFormProps = {
  actions: React.ReactNode;
  onSubmit: (data: Omit<ICreateAuction, 'cardId'>) => void;
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

export default function AuctionForm({ actions, onSubmit }: AuctionFormProps) {
  const { control, handleSubmit } = useForm<Omit<ICreateAuction, 'cardId'>>();
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
          control={control}
          errorText="Min length is required and must ne number"
        />
      </Grid2>
      <Grid2 size={inputGridSize}>
        <FormDateTimePicker
          name="endTime"
          label="End time"
          control={control}
          required
          errorText="End time is required"
        />
      </Grid2>
      <Grid2 size={12}>{actions}</Grid2>
    </Grid2>
  );
}
