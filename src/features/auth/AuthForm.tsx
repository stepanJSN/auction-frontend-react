import { useForm } from 'react-hook-form';
import { ISingInRequest } from '../../types/auth.interfaces';
import { Box, Button, SxProps } from '@mui/material';
import FormInput from '../../components/FormInput';
import {
  emailValidationRules,
  passwordValidationRules,
} from '../../constants/textFieldValidationRules';

type AuthFormProps = {
  isLoading: boolean;
  onSubmit: (data: ISingInRequest) => void;
};

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
        rules={emailValidationRules}
      />
      <FormInput
        name="password"
        label="Password"
        control={control}
        errorText="Incorrect password"
        rules={passwordValidationRules}
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
