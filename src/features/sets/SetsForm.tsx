import { useMemo } from 'react';
import { Stack } from '@mui/material';
import FormInput from '../../components/FormInput';
import { useForm } from 'react-hook-form';
import { ICreateSet, ISet } from '../../types/sets.interface';

type SetsFormProps = {
  data?: Pick<ISet, 'name' | 'bonus'>;
  onSubmit: (data: Omit<ICreateSet, 'cardsId'>) => void;
  actions: React.ReactNode;
};

const formContainerStyles = {
  width: '100%',
};

const stringLength = {
  min: 2,
  max: 15,
};

export default function SetsForm({ onSubmit, data, actions }: SetsFormProps) {
  const { control, handleSubmit } = useForm<Omit<ICreateSet, 'cardsId'>>(
    useMemo(
      () => ({
        defaultValues: {
          name: data?.name,
          bonus: data?.bonus,
        },
      }),
      [data?.bonus, data?.name],
    ),
  );
  return (
    <Stack
      spacing={1}
      component="form"
      onSubmit={handleSubmit(onSubmit)}
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
        name="bonus"
        label="Bonus"
        type="number"
        control={control}
        errorText="The bonus is required"
        required
      />
      {actions}
    </Stack>
  );
}
