import { useCallback, useMemo } from 'react';
import { Stack } from '@mui/material';
import { useForm } from 'react-hook-form';
import FormInput from '../../components/FormInput';
import { optionalTextFieldValidationRules } from '../../constants/textFieldValidationRules';
import { ICreateChat } from '../../types/chats.interfaces';
import ParticipantsFormList from './ParticipantsFormList';
import { ChatState } from './chat/chatSlice';

export interface ICreateChatForm {
  name?: string;
  participants: {
    id: string;
    name: string;
    surname: string;
  }[];
}

type ManageChatFormProps = {
  name?: string;
  participants?: ChatState['participants'];
  onSubmit: (data: ICreateChat) => void;
  actions: React.ReactNode;
};

export default function ManageChatForm({
  onSubmit,
  name,
  participants,
  actions,
}: ManageChatFormProps) {
  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<ICreateChatForm>(
    useMemo(
      () => ({
        defaultValues: {
          name: name,
          participants: participants,
        },
      }),
      [name, participants],
    ),
  );

  const transformData = useCallback(
    (data: ICreateChatForm) => {
      if (data.participants.length === 0) {
        setError('participants', { type: 'required' });
        return;
      }
      onSubmit({
        name: data.name,
        participants: data.participants
          .filter((participant) => participant.name !== '')
          .map((participant) => participant.id),
      });
    },
    [onSubmit, setError],
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
      <ParticipantsFormList control={control} isError={!!errors.participants} />
      {actions}
    </Stack>
  );
}
