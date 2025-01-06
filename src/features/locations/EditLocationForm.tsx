import { useMemo } from 'react';
import { Box, Button } from '@mui/material';
import FormInput from '../../components/FormInput';
import { useForm } from 'react-hook-form';
import { ICreateLocation } from '../../types/locations.interfaces';

const fieldValueLength = {
  min: 2,
  max: 15,
};

type EditLocationFormProps = {
  location: ICreateLocation;
  isLoading: boolean;
  onSubmit: (data: ICreateLocation) => void;
};

export default function EditLocationForm({
  isLoading,
  location,
  onSubmit,
}: EditLocationFormProps) {
  const { control, handleSubmit } = useForm<ICreateLocation>(
    useMemo(
      () => ({
        defaultValues: {
          ...location,
        },
      }),
      [location],
    ),
  );

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
        {isLoading ? 'Updating...' : 'Update'}
      </Button>
    </Box>
  );
}
