import { Box, Button, SxProps } from '@mui/material';
import { useForm } from 'react-hook-form';
import FormInput from '../../components/FormInput';
import { ICreateUser } from '../../types/user.interfaces';
import { MutationStatusEnum } from '../../enums/mutationStatus';

type SignupFormProps = {
  status: MutationStatusEnum;
  onSubmit: (data: ICreateUser) => void;
};

const nameAndSurnameLength = { min: 2, max: 15 };
const passwordLength = { min: 8, max: 16 };
const formButtonStyles: SxProps = { mt: 1 };
export default function SignupForm({ status, onSubmit }: SignupFormProps) {
  const { control, handleSubmit } = useForm<ICreateUser>();

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
        name="name"
        label="Name"
        control={control}
        errorText="The name must be between 2 and 15 characters long"
        required
        length={nameAndSurnameLength}
      />
      <FormInput
        name="surname"
        label="Surname"
        control={control}
        errorText="The surname must be between 2 and 15 characters long"
        required
        length={nameAndSurnameLength}
      />
      <FormInput
        name="password"
        label="Password"
        control={control}
        errorText="The password must be between 8 and 16 characters long"
        type="password"
        required
        length={passwordLength}
      />
      <Button
        variant="contained"
        fullWidth
        disabled={
          status === MutationStatusEnum.PENDING ||
          status === MutationStatusEnum.SUCCESS
        }
        type="submit"
        sx={formButtonStyles}>
        {status === MutationStatusEnum.PENDING ? 'Signing up...' : 'Sign up'}
      </Button>
    </Box>
  );
}
