import { Box, Typography, Button, SxProps } from '@mui/material';
import { useForm } from 'react-hook-form';
import FormInput from '../../components/FormInput';

type TransactionFormProps = {
  onSubmit: (data: { amount: string }) => void;
  title: string;
  isPending: boolean;
};

const formStyles: SxProps = {
  border: 1,
  borderStyle: 'solid',
  borderColor: 'primary.main',
  borderRadius: 3,
  p: 2,
  minWidth: '300px',
};

const buttonStyles = {
  minWidth: '150px',
};

export default function TransactionForm({
  title,
  onSubmit,
  isPending,
}: TransactionFormProps) {
  const { control, handleSubmit, reset } = useForm<{ amount: string }>();

  const onFormSubmit = (data: { amount: string }) => {
    onSubmit(data);
    reset();
  };

  return (
    <>
      <Box
        component="form"
        onSubmit={handleSubmit(onFormSubmit)}
        sx={formStyles}>
        <Typography variant="h5">{title}</Typography>
        <FormInput
          control={control}
          name="amount"
          label="Amount"
          type="number"
          required
          pattern={/^\d+$/}
          errorText="Amount is required and must be a number"
        />
        <Button
          variant="contained"
          type="submit"
          disabled={isPending}
          sx={buttonStyles}>
          {isPending ? 'Processing...' : 'Submit'}
        </Button>
      </Box>
    </>
  );
}
