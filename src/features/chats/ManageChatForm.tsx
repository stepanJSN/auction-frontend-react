import { useCallback, useMemo } from 'react';
import { Button, Grid2, IconButton, Stack } from '@mui/material';
import { useFieldArray, useForm } from 'react-hook-form';
import FormInput from '../../components/FormInput';
import { optionalTextFieldValidationRules } from '../../constants/textFieldValidationRules';
import FormAutocomplete from '../../components/FormAutocomplete';
import DeleteIcon from '@mui/icons-material/Delete';
import { userService } from '../../services/userService';
import { IUserSummary } from '../../types/user.interfaces';
import { ICreateChat } from '../../types/chats.interfaces';

export interface ICreateChatForm {
  name?: string;
  participants: {
    id: string;
    name: string;
    surname: string;
  }[];
}

type ManageChatFormProps = {
  onSubmit: (data: ICreateChat) => void;
  actions: React.ReactNode;
};

export default function ManageChatForm({
  onSubmit,
  actions,
}: ManageChatFormProps) {
  const { control, handleSubmit } = useForm<ICreateChatForm>();
  const { fields, append, remove } = useFieldArray(
    useMemo(
      () => ({
        control,
        name: 'participants',
      }),
      [control],
    ),
  );

  const transformData = useCallback(
    (data: ICreateChatForm) => {
      onSubmit({
        name: data.name,
        participants: data.participants.map((participant) => participant.id),
      });
    },
    [onSubmit],
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
    <Stack spacing={1} component="form" onSubmit={handleSubmit(transformData)}>
      <FormInput
        name="name"
        label="Name"
        control={control}
        errorText="The name must be between 2 and 30 characters long"
        rules={optionalTextFieldValidationRules}
      />
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
      {actions}
    </Stack>
  );
}
