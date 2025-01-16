import { Button, Grid2, IconButton } from '@mui/material';
import FormAutocomplete from '../../components/FormAutocomplete';
import DeleteIcon from '@mui/icons-material/Delete';
import { useMemo, useCallback, useState } from 'react';
import { Control, useFieldArray } from 'react-hook-form';
import { userService } from '../../services/userService';
import { IUserSummary } from '../../types/user.interfaces';
import { ICreateChatForm } from './ManageChatForm';
import Autocomplete from '../../components/Autocomplete';

type ParticipantsFormListProps = {
  control: Control<ICreateChatForm, any>;
};

export default function ParticipantsFormList({
  control,
}: ParticipantsFormListProps) {
  const [selectedUser, setSelectedUser] = useState<IUserSummary | null>(null);
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
  const addParticipant = useCallback(() => {
    if (selectedUser) {
      append({
        id: selectedUser.id.toString(),
        name: selectedUser.name,
        surname: selectedUser.surname,
      });
      setSelectedUser(null);
    }
  }, [append, selectedUser]);

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
          <Grid2>
            <IconButton onClick={removeParticipant(index)} color="error">
              <DeleteIcon />
            </IconButton>
          </Grid2>
        </Grid2>
      ))}
      <Grid2 container spacing={1} alignItems="center">
        <Grid2 size="grow">
          <Autocomplete
            label="participant"
            searchFunc={searchUsers}
            getLabel={getUserLabel}
            startFromLetter={2}
            noOptionsText="No users found"
            value={selectedUser}
            onChange={setSelectedUser}
          />
        </Grid2>
        <Grid2>
          <Button onClick={addParticipant} disabled={!selectedUser}>
            Add
          </Button>
        </Grid2>
      </Grid2>
    </>
  );
}
