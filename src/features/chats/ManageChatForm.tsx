import { useCallback } from 'react';
import { Stack } from '@mui/material';
import { useForm } from 'react-hook-form';
import FormInput from '../../components/FormInput';
import { optionalTextFieldValidationRules } from '../../constants/textFieldValidationRules';
import { ICreateChat } from '../../types/chats.interfaces';
import ParticipantsFormList from './ParticipantsFormList';

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

  const transformData = useCallback(
    (data: ICreateChatForm) => {
      onSubmit({
        name: data.name,
        participants: data.participants.map((participant) => participant.id),
      });
    },
    [onSubmit],
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
      <ParticipantsFormList control={control} />
      {actions}
    </Stack>
  );
}
