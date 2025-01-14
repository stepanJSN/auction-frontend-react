import { Button, Grid2, IconButton } from '@mui/material';
import FormAutocomplete from '../../components/FormAutocomplete';
import DeleteIcon from '@mui/icons-material/Delete';
import { useMemo, useCallback } from 'react';
import { Control, useFieldArray } from 'react-hook-form';
import { userService } from '../../services/userService';
import { IUserSummary } from '../../types/user.interfaces';
import { ICreateChatForm } from './ManageChatForm';

type ParticipantsFormListProps = {
  control: Control<ICreateChatForm, any>;
};

export default function ParticipantsFormList({
  control,
}: ParticipantsFormListProps) {
  const { fields, append, remove } = useFieldArray(
    useMemo(
      () => ({
        control,
        name: 'participants',
      }),
      [control],
    ),
  );

  const searchUsers = useCallback(
    (searchValue: string) => userService.getAll({ fullName: searchValue }),
    [],
  );
  const getUserLabel = useCallback(
    (user: IUserSummary | null) => `${user?.name} ${user?.surname}` || '',
    [],
  );

  const removeParticipant = useCallback(
    (index: number) => () => {
      remove(index);
    },
    [remove],
  );
  const addParticipant = useCallback(
    () =>
      append({
        id: fields.length.toString(),
        name: '',
        surname: '',
      }),
    [append, fields],
  );

  return (
    <>
      {fields.map((field, index) => (
        <Grid2 container spacing={1} key={field.id}>
          <Grid2 size="grow">
            <FormAutocomplete
              control={control}
              name={`participants.${index}`}
              label="participant"
              searchFunc={searchUsers}
              getLabel={getUserLabel}
              startFromLetter={2}
              noOptionsText="No users found"
              errorText="Please select an participant"
            />
          </Grid2>
          {index > 0 && (
            <Grid2>
              <IconButton onClick={removeParticipant(index)} color="error">
                <DeleteIcon />
              </IconButton>
            </Grid2>
          )}
        </Grid2>
      ))}
      <Button onClick={addParticipant}>Add participant</Button>
    </>
  );
}
