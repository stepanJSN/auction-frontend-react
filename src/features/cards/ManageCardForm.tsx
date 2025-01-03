import { useCallback, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { Stack } from '@mui/material';
import FormInput from '../../components/FormInput';
import FormSelect from '../../components/FormSelect';
import FormSwitch from '../../components/FormSwitch';
import FormAutocomplete from '../../components/FormAutocomplete';
import { locationsService } from '../../services/locationsService';
import { ILocation } from '../../types/locations.interfaces';
import { IEpisode } from '../../types/episodes.interfaces';
import { Gender } from '../../enums/gender.enum';
import { ICard, ICreateCard } from '../../types/cards.interface';
import EpisodesListForm from './EpisodesListForm';

export interface ICreateCardFrom {
  name: string;
  type?: string;
  gender: Gender;
  isActive: boolean;
  locationId: ILocation;
  episodesId: IEpisode[];
}

type ManageCardFormProps = {
  data?: ICard;
  onSubmit: (data: ICreateCard) => void;
  actions: React.ReactNode;
};

const stringLength = {
  min: 2,
  max: 15,
};

const genderOptions = [
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
];

const formContainerStyles = {
  width: '100%',
};

export default function ManageCardForm({
  onSubmit,
  actions,
  data,
}: ManageCardFormProps) {
  const { control, handleSubmit, setError } = useForm<ICreateCardFrom>(
    useMemo(
      () => ({
        defaultValues: {
          episodesId: data?.episodes || [
            {
              id: 0,
              name: '',
              code: '',
            },
          ],
          name: data?.name,
          type: data?.type,
          gender: data?.gender,
          isActive: data?.is_active,
          locationId: data?.location,
        },
      }),
      [
        data?.episodes,
        data?.gender,
        data?.is_active,
        data?.location,
        data?.name,
        data?.type,
      ],
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
        required
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
      <EpisodesListForm control={control} />
      {actions}
    </Stack>
  );
}
