import { Grid2 } from '@mui/material';
import FormInput from '../../components/FormInput';
import { textFieldValueLength } from '../../constants/textFieldValueLength';
import { useForm } from 'react-hook-form';
import { ICreateAuction } from '../../types/auctions.interfaces';
import FormDateTimePicker from '../../components/FormDateTimePicker';

type AuctionFormProps = {
  actions: React.ReactNode;
};

export default function AuctionForm({ actions }: AuctionFormProps) {
  const { control, handleSubmit } = useForm<Omit<ICreateAuction, 'cardId'>>();
  return (
    <Grid2
      container
      spacing={1}
      component="form"
      onSubmit={handleSubmit(() => {})}>
      <Grid2 size={6}>
        <FormInput
          name="startingBid"
          label="Starting bid"
          type="number"
          margin="none"
          pattern={/^\d+$/}
          control={control}
          errorText="Starting bid is required and must ne number"
          required
          length={textFieldValueLength}
        />
      </Grid2>
      <Grid2 size={6}>
        <FormInput
          name="minBidStep"
          label="Min bid step"
          type="number"
          margin="none"
          pattern={/^\d+$/}
          control={control}
          errorText="Min bid step is required and must ne number"
          required
          length={textFieldValueLength}
        />
      </Grid2>
      <Grid2 size={6}>
        <FormInput
          name="maxBid"
          label="Max bid"
          type="number"
          margin="none"
          pattern={/^\d+$/}
          control={control}
          errorText="Max bid must ne number"
          length={textFieldValueLength}
        />
      </Grid2>
      <Grid2 size={6}>
        <FormInput
          name="minLength"
          label="Min length in minutes"
          type="number"
          margin="none"
          pattern={/^\d+$/}
          control={control}
          required
          errorText="Min length is required and must ne number"
          length={textFieldValueLength}
        />
      </Grid2>
      <Grid2 size={6}>
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
