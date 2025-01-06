import { Box, Button } from '@mui/material';
import FormInput from '../../components/FormInput';
import { useForm } from 'react-hook-form';
import { ICreateLocation } from '../../types/locations.interfaces';
import { useEffect } from 'react';

const fieldValueLength = {
  min: 2,
  max: 15,
};

type CreateLocationFormProps = {
  isLoading: boolean;
  isSuccess: boolean;
  onSubmit: (data: ICreateLocation) => void;
};

export default function CreateLocationForm({
  isLoading,
  isSuccess,
  onSubmit,
}: CreateLocationFormProps) {
  const { control, handleSubmit, reset } = useForm<ICreateLocation>();

  useEffect(() => {
    if (isSuccess) {
      reset();
    }
  }, [isSuccess, reset]);

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
      <FormInput
        name="name"
        label="Name"
        control={control}
        errorText="The name must be between 2 and 15 characters long"
        length={fieldValueLength}
        required
      />
      <FormInput
        name="type"
        label="Type"
        control={control}
        errorText="The type must be between 2 and 15 characters long"
        length={fieldValueLength}
        required
      />
      <Button variant="contained" fullWidth disabled={isLoading} type="submit">
        {isLoading ? 'Creating...' : 'Create'}
      </Button>
    </Box>
  );
}
