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
import {
  optionalTextFieldValidationRules,
  textFieldValidationRules,
} from '../../constants/textFieldValidationRules';

export interface ICreateCardFrom {
  name: string;
  type?: string;
  gender: Gender;
  isActive: boolean;
  location: ILocation;
  episodes: IEpisode[];
}

type ManageCardFormProps = {
  data?: ICard;
  onSubmit: (data: ICreateCard) => void;
  actions: React.ReactNode;
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
  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<ICreateCardFrom>(
    useMemo(
      () => ({
        defaultValues: {
          episodesId: data?.episodes,
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
      if (values.episodes.length === 0) {
        setError('episodes', { type: 'required' });
      }
      onSubmit({
        ...values,
        locationId: values.location.id,
        episodesId: values.episodes
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
        rules={textFieldValidationRules}
      />
      <FormInput
        name="type"
        label="Type"
        control={control}
        errorText="The type must be between 2 and 15 characters long"
        rules={optionalTextFieldValidationRules}
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
        name="location"
        label="Location"
        searchFunc={searchLocationFunc}
        getLabel={getLocationLabel}
        startFromLetter={2}
        required
        noOptionsText="No locations found"
        errorText="Please select a location"
      />
      <EpisodesListForm control={control} isError={!!errors.episodes} />
      {actions}
    </Stack>
  );
}
