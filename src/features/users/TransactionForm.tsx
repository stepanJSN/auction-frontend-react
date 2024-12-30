import { Box, Typography, Button, Alert, SxProps } from '@mui/material';
import { useForm } from 'react-hook-form';
import FormInput from '../../components/FormInput';

type TransactionFormProps = {
  onSubmit: (data: { amount: number }) => void;
  title: string;
  isPending: boolean;
  errorMessage?: string;
};

const formStyles: SxProps = {
  border: 1,
  borderStyle: 'solid',
  borderColor: 'primary.main',
  borderRadius: 3,
  p: 2,
  maxWidth: '550px',
  minWidth: '300px',
};

export default function TransactionForm({
  title,
  onSubmit,
  isPending,
  errorMessage,
}: TransactionFormProps) {
  const { control, handleSubmit } = useForm<{ amount: number }>();
  return (
    <>
      <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={formStyles}>
        <Typography variant="h5">{title}</Typography>
        {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
        <FormInput
          control={control}
          name="amount"
          label="Amount"
          type="number"
          required
          pattern={/^\d+$/}
          errorText="Amount is required and must be a number"
        />
        <Button variant="contained" type="submit" disabled={isPending}>
          {isPending ? 'Processing...' : 'Submit'}
        </Button>
      </Box>
    </>
  );
}
