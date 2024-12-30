import { useForm } from 'react-hook-form';
import { ISingInRequest } from '../../types/auth.interfaces';
import { Box, Button, SxProps } from '@mui/material';
import FormInput from '../../components/FormInput';

type AuthFormProps = {
  isLoading: boolean;
  onSubmit: (data: ISingInRequest) => void;
};

const passwordLength = { min: 8, max: 16 };
const formButtonStyles: SxProps = {
  mt: 1,
};

export default function AuthForm({ isLoading, onSubmit }: AuthFormProps) {
  const { control, handleSubmit } = useForm<ISingInRequest>();

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
      <FormInput
        name="email"
        label="Email"
        control={control}
        errorText="Incorrect email"
        required
        pattern={/^[^\s@]+@[^\s@]+\.[^\s@]+$/}
      />
      <FormInput
        name="password"
        label="Password"
        control={control}
        errorText="Incorrect password"
        required
        length={passwordLength}
        type="password"
      />
      <Button
        variant="contained"
        fullWidth
        disabled={isLoading}
        type="submit"
        sx={formButtonStyles}>
        {isLoading ? 'Signing in...' : 'Sign In'}
      </Button>
    </Box>
  );
}
