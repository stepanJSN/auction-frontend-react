import { Button, Stack } from '@mui/material';
import { useForm } from 'react-hook-form';
import FormInput from '../../../components/FormInput';

const messageValidationRules = {
  required: true,
  minLength: 1,
  maxLength: 1000,
};

type MessageFormProps = {
  onSubmit: (data: { message: string }) => void;
};

export default function MessageForm({ onSubmit }: MessageFormProps) {
  const { control, handleSubmit, reset } = useForm<{ message: string }>();

  const onFormSubmit = (data: { message: string }) => {
    onSubmit(data);
    reset();
  };

  console.log(control);

  return (
    <Stack
      direction="row"
      spacing={1}
      component="form"
      onSubmit={handleSubmit(onFormSubmit)}>
      <FormInput
        name="message"
        label="Message"
        control={control}
        rules={messageValidationRules}
        errorText="The message must be between 1 and 1000 characters long"
      />
      <Button type="submit" variant="contained">
        Send
      </Button>
    </Stack>
  );
}
