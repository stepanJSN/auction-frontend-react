import { useCallback, useMemo } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { Button, Grid2, IconButton, Stack } from '@mui/material';
import FormInput from '../../components/FormInput';
import FormSelect from '../../components/FormSelect';
import FormSwitch from '../../components/FormSwitch';
import FormAutocomplete from '../../components/FormAutocomplete';
import { locationsService } from '../../services/locationsService';
import { ILocation } from '../../types/locations.interfaces';
import { episodesService } from '../../services/episodesService';
import { IEpisode } from '../../types/episodes.interfaces';
import { Gender } from '../../enums/gender.enum';
import DeleteIcon from '@mui/icons-material/Delete';
import { ICreateCard } from '../../types/cards.interface';

interface ICreateCardFrom {
  name: string;
  type?: string;
  gender: Gender;
  isActive: boolean;
  locationId: ILocation;
  episodesId: IEpisode[];
}

type ManageCardFormProps = {
  onSubmit: (data: ICreateCard) => void;
  isPending: boolean;
};

const stringLength = {
  min: 2,
  max: 15,
};

const genderOptions = [
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
];

const formOptions = {
  defaultValues: {
    episodesId: [
      {
        id: 0,
        name: '',
        code: '',
      },
    ],
  },
};

const formContainerStyles = {
  width: '100%',
};

export default function ManageCardForm({
  onSubmit,
  isPending,
}: ManageCardFormProps) {
  const { control, handleSubmit, setError } =
    useForm<ICreateCardFrom>(formOptions);

  const { fields, append, remove } = useFieldArray(
    useMemo(
      () => ({
        control,
        name: 'episodesId',
      }),
      [control],
    ),
  );

  const searchLocationFunc = useCallback(
    (searchValue: string) => locationsService.getAll({ name: searchValue }),
    [],
  );
  const getLocationLabel = useCallback(
    (location: ILocation | null) => location?.name || '',
    [],
  );

  const searchEpisodesFunc = useCallback(
    (searchValue: string) => episodesService.getAll({ name: searchValue }),
    [],
  );
  const getEpisodesLabel = useCallback(
    (location: IEpisode | null) => location?.name || '',
    [],
  );

  const removeEpisode = useCallback(
    (index: number) => () => {
      remove(index);
    },
    [remove],
  );
  const addEpisode = useCallback(
    () => append({ id: Date.now(), name: '', code: '' }),
    [append],
  );

  const transformData = useCallback(
    (values: ICreateCardFrom) => {
      if (values.episodesId.every((episode) => episode.name === '')) {
        setError('episodesId.0', { type: 'required' });
      }
      onSubmit({
        ...values,
        locationId: values.locationId.id,
        episodesId: values.episodesId
          .filter((episode) => episode.name !== '')
          .map((episode) => episode.id),
      });
    },
    [onSubmit, setError],
  );

  return (
    <Stack
      spacing={1}
      component="form"
      onSubmit={handleSubmit(transformData)}
      sx={formContainerStyles}>
      <FormInput
        name="name"
        label="Name"
        control={control}
        errorText="The name must be between 2 and 15 characters long"
        required
        length={stringLength}
      />
      <FormInput
        name="type"
        label="Type"
        control={control}
        errorText="The type must be between 2 and 15 characters long"
        length={stringLength}
      />
      <FormSelect
        name="gender"
        control={control}
        label="Gender"
        defaultValue={genderOptions[0].value}
        options={genderOptions}
      />
      <FormSwitch
        control={control}
        name="isActive"
        label="Active"
        defaultValue={false}
      />
      <FormAutocomplete
        control={control}
        name="locationId"
        label="Location"
        searchFunc={searchLocationFunc}
        getLabel={getLocationLabel}
        startFromLetter={2}
        required
        noOptionsText="No locations found"
        errorText="Please select a location"
      />
      {fields.map((field, index) => (
        <Grid2 container spacing={1} key={field.id}>
          <Grid2 size="grow">
            <FormAutocomplete
              control={control}
              name={`episodesId.${index}`}
              label="Episode"
              searchFunc={searchEpisodesFunc}
              getLabel={getEpisodesLabel}
              startFromLetter={2}
              noOptionsText="No episodes found"
              errorText="Please select an episode"
            />
          </Grid2>
          {index > 0 && (
            <Grid2>
              <IconButton onClick={removeEpisode(index)} color="error">
                <DeleteIcon />
              </IconButton>
            </Grid2>
          )}
        </Grid2>
      ))}
      <Button onClick={addEpisode}>Add episode</Button>
      <Button type="submit" variant="contained" disabled={isPending}>
        {isPending ? 'Creating...' : 'Create'}
      </Button>
    </Stack>
  );
}
