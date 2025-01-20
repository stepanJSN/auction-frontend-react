import { Grid2, IconButton, Button, Typography } from '@mui/material';
import FormAutocomplete from '../../components/FormAutocomplete';
import { Control, useFieldArray } from 'react-hook-form';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { episodesService } from '../../services/episodesService';
import { IEpisode } from '../../types/episodes.interfaces';
import DeleteIcon from '@mui/icons-material/Delete';
import { ICreateCardFrom } from './ManageCardForm';
import Autocomplete from '../../components/Autocomplete';

type EpisodesListFormProps = {
  control: Control<ICreateCardFrom, any>;
  isError: boolean;
  isSubmitSuccessful?: boolean;
};

export default function EpisodesListForm({
  control,
  isError,
  isSubmitSuccessful,
}: EpisodesListFormProps) {
  const [selectedEpisode, setSelectedEpisode] = useState<IEpisode | null>(null);
  const { fields, append, remove } = useFieldArray(
    useMemo(
      () => ({
        control,
        name: 'episodes',
      }),
      [control],
    ),
  );

  useEffect(() => {
    if (isSubmitSuccessful) {
      setSelectedEpisode(null);
      remove();
    }
  }, [isSubmitSuccessful, remove]);

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
  const addEpisode = useCallback(() => {
    if (selectedEpisode) {
      append(selectedEpisode);
      setSelectedEpisode(null);
    }
  }, [append, selectedEpisode]);

  return (
    <>
      {fields.map((field, index) => (
        <Grid2 container spacing={1} key={field.id}>
          <Grid2 size="grow">
            <FormAutocomplete
              control={control}
              name={`episodes.${index}`}
              label="Episode"
              searchFunc={searchEpisodesFunc}
              getLabel={getEpisodesLabel}
              startFromLetter={2}
              noOptionsText="No episodes found"
              errorText="Please select an episode"
            />
          </Grid2>
          <Grid2>
            <IconButton onClick={removeEpisode(index)} color="error">
              <DeleteIcon />
            </IconButton>
          </Grid2>
        </Grid2>
      ))}
      <Grid2 container spacing={1} alignItems="center">
        <Grid2 size="grow">
          <Autocomplete
            label="Episode"
            searchFunc={searchEpisodesFunc}
            getLabel={getEpisodesLabel}
            startFromLetter={2}
            noOptionsText="No episodes found"
            value={selectedEpisode}
            onChange={setSelectedEpisode}
          />
          {isError && (
            <Typography color="error" variant="caption">
              Episodes are required
            </Typography>
          )}
        </Grid2>
        <Grid2>
          <Button onClick={addEpisode} disabled={!selectedEpisode}>
            Add
          </Button>
        </Grid2>
      </Grid2>
    </>
  );
}
