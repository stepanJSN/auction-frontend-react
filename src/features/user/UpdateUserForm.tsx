import { Box, Button, SxProps } from '@mui/material';
import { useForm } from 'react-hook-form';
import FormInput from '../../components/FormInput';
import { IUpdateUser } from '../../types/user.interfaces';
import { useEffect } from 'react';

type UpdateUserProps = {
  isUpdating: boolean;
  onSubmit: (data: IUpdateUser) => void;
  name: string;
  surname: string;
};

const nameAndSurnameLength = { min: 2, max: 15 };
const passwordLength = { min: 8, max: 16 };
const formButtonStyles: SxProps = { my: 1 };
export default function UpdateUserForm({
  isUpdating,
  onSubmit,
  name,
  surname,
}: UpdateUserProps) {
  const { control, handleSubmit, setValue } = useForm<IUpdateUser>();

  useEffect(() => {
    setValue('name', name);
    setValue('surname', surname);
  }, [name, setValue, surname]);

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
      <FormInput
        name="name"
        label="Name"
        control={control}
        placeholder={name}
        errorText="The name must be between 2 and 15 characters long"
        length={nameAndSurnameLength}
      />
      <FormInput
        name="surname"
        label="Surname"
        control={control}
        placeholder={surname}
        errorText="The surname must be between 2 and 15 characters long"
        length={nameAndSurnameLength}
      />
      <FormInput
        name="password"
        label="Password"
        control={control}
        placeholder="********"
        errorText="The password must be between 8 and 16 characters long"
        length={passwordLength}
      />
      <Button
        variant="contained"
        fullWidth
        disabled={isUpdating}
        type="submit"
        sx={formButtonStyles}>
        {isUpdating ? 'Updating...' : 'Update'}
      </Button>
    </Box>
  );
}
