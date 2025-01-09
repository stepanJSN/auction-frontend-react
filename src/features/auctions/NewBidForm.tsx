import { useMemo } from 'react';
import { Button, Stack } from '@mui/material';
import FormInput from '../../components/FormInput';
import { useForm } from 'react-hook-form';

type NewBidFormProps = {
  onSubmit: (data: { bid: string }) => void;
  isFormInactive: boolean;
  isSubmitting: boolean;
  label: string;
  min: number;
  max?: number;
};

export default function NewBidForm({
  onSubmit,
  isFormInactive,
  isSubmitting,
  label,
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
      spacing={1}>
      <FormInput
        name="bid"
        label={label}
        type="number"
        margin="none"
        rules={rules}
        control={control}
        errorText="Starting bid is required and must ne number"
        disabled={isFormInactive}
      />
      <Button
        type="submit"
        disabled={isFormInactive || isSubmitting}
        variant="contained">
        {isSubmitting ? 'Submitting...' : 'Submit'}
      </Button>
    </Stack>
  );
}
