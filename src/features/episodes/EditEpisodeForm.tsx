import { useMemo } from 'react';
import { Box, Button } from '@mui/material';
import FormInput from '../../components/FormInput';
import { useForm } from 'react-hook-form';
import { ICreateEpisode } from '../../types/episodes.interfaces';
import { textFieldValueLength } from '../../constants/textFieldValueLength';

type EditEpisodeFormProps = {
  episode: ICreateEpisode;
  isLoading: boolean;
  onSubmit: (data: ICreateEpisode) => void;
};

export default function EditEpisodeForm({
  isLoading,
  episode,
  onSubmit,
}: EditEpisodeFormProps) {
  const { control, handleSubmit } = useForm<ICreateEpisode>(
    useMemo(
      () => ({
        defaultValues: {
          ...episode,
        },
      }),
      [episode],
    ),
  );

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
      <FormInput
        name="name"
        label="Name"
        control={control}
        errorText="The name must be between 2 and 15 characters long"
        length={textFieldValueLength}
        required
      />
      <FormInput
        name="code"
        label="Code"
        control={control}
        errorText="The code must be between 2 and 15 characters long"
        length={textFieldValueLength}
        required
      />
      <Button variant="contained" fullWidth disabled={isLoading} type="submit">
        {isLoading ? 'Updating...' : 'Update'}
      </Button>
    </Box>
  );
}
