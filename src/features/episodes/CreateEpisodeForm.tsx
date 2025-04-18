import { Box, Button } from '@mui/material';
import FormInput from '../../components/FormInput';
import { useForm } from 'react-hook-form';
import { ICreateEpisode } from '../../types/episodes.interfaces';
import { useEffect } from 'react';
import { textFieldValidationRules } from '../../constants/textFieldValidationRules';

type CreateEpisodeFormProps = {
  isLoading: boolean;
  isSuccess: boolean;
  onSubmit: (data: ICreateEpisode) => void;
};

export default function CreateEpisodeForm({
  isLoading,
  isSuccess,
  onSubmit,
}: CreateEpisodeFormProps) {
  const { control, handleSubmit, reset } = useForm<ICreateEpisode>();

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
        rules={textFieldValidationRules}
      />
      <FormInput
        name="code"
        label="Code"
        control={control}
        errorText="The code must be between 2 and 15 characters long"
        rules={textFieldValidationRules}
      />
      <Button variant="contained" fullWidth disabled={isLoading} type="submit">
        {isLoading ? 'Creating...' : 'Create'}
      </Button>
    </Box>
  );
}
