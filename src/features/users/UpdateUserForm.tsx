import { Box, Button, SxProps } from '@mui/material';
import { useForm } from 'react-hook-form';
import FormInput from '../../components/FormInput';
import { ICreateUser } from '../../types/userService.interfaces';

type UpdateUserProps = {
  isLoading: boolean;
  onSubmit: (data: ICreateUser) => void;
};

const nameAndSurnameLength = { min: 2, max: 15 };
const passwordLength = { min: 8, max: 16 };
const formButtonStyles: SxProps = { mt: 1 };
export default function UpdateUserForm({
  isLoading,
  onSubmit,
}: UpdateUserProps) {
  const { control, handleSubmit } = useForm<ICreateUser>();

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
      <FormInput
        name="email"
        label="Email"
        control={control}
        errorText="Incorrect email"
        pattern={/^[^\s@]+@[^\s@]+\.[^\s@]+$/}
      />
      <FormInput
        name="name"
        label="Name"
        control={control}
        errorText="The name must be between 2 and 15 characters long"
        length={nameAndSurnameLength}
      />
      <FormInput
        name="surname"
        label="Surname"
        control={control}
        errorText="The surname must be between 2 and 15 characters long"
        length={nameAndSurnameLength}
      />
      <FormInput
        name="password"
        label="Password"
        control={control}
        errorText="The password must be between 8 and 16 characters long"
        length={passwordLength}
      />
      <Button
        variant="contained"
        fullWidth
        disabled={isLoading}
        type="submit"
        sx={formButtonStyles}>
        {isLoading ? 'Updating...' : 'Update'}
      </Button>
    </Box>
  );
}
