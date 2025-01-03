import { Grid2, IconButton, Button } from '@mui/material';
import FormAutocomplete from '../../components/FormAutocomplete';
import { Control, useFieldArray } from 'react-hook-form';
import { useCallback, useMemo } from 'react';
import { episodesService } from '../../services/episodesService';
import { IEpisode } from '../../types/episodes.interfaces';
import DeleteIcon from '@mui/icons-material/Delete';
import { ICreateCardFrom } from './ManageCardForm';

type EpisodesListFormProps = {
  control: Control<ICreateCardFrom, any>;
};

export default function EpisodesListForm({ control }: EpisodesListFormProps) {
  const { fields, append, remove } = useFieldArray(
    useMemo(
      () => ({
        control,
        name: 'episodesId',
      }),
      [control],
    ),
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

  return (
    <>
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
    </>
  );
}
