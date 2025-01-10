import { useMemo } from 'react';
import { Button, Stack, SxProps } from '@mui/material';
import FormInput from '../../../components/FormInput';
import { useForm } from 'react-hook-form';

type NewBidFormProps = {
  onSubmit: (data: { bid: string }) => void;
  isFormInactive: boolean;
  isSubmitting: boolean;
  min: number;
  max?: number;
};

const containerStyles: SxProps = {
  maxWidth: '300px',
};

const buttonStyles: SxProps = {
  height: 'max-content',
};

export default function NewBidForm({
  onSubmit,
  isFormInactive,
  isSubmitting,
  min,
  max,
}: NewBidFormProps) {
  const { control, handleSubmit } = useForm<{ bid: string }>();
  const rules = useMemo(
    () => ({
      required: true,
      pattern: /^\d+$/,
      min,
      max,
    }),
    [max, min],
  );
  return (
    <Stack
      direction="row"
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      spacing={1}
      sx={containerStyles}>
      <FormInput
        name="bid"
        label="Your bid"
        type="number"
        margin="none"
        rules={rules}
        control={control}
        errorText={`Bid is required and should be more than ${min} ${max ? `and less than ${max}` : ''} `}
        disabled={isFormInactive}
      />
      <Button
        type="submit"
        disabled={isFormInactive || isSubmitting}
        variant="contained"
        sx={buttonStyles}>
        {isSubmitting ? 'Submitting...' : 'Submit'}
      </Button>
    </Stack>
  );
}
