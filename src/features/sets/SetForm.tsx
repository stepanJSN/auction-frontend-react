import { useMemo, useCallback } from 'react';
import { Button, Grid2, Stack } from '@mui/material';
import FormInput from '../../components/FormInput';
import { useFieldArray, useForm } from 'react-hook-form';
import { ICreateSet, ISet } from '../../types/sets.interface';
import Card from '../../components/Card';
import CardsList from './CardsList';
import { ICardSummary } from '../../types/cards.interface';
import RemoveCardButton from './RemoveCardButton';

type SetFormProps = {
  data?: Pick<ISet, 'name' | 'bonus' | 'cards'>;
  onSubmit: (data: ICreateSet) => void;
  actions: React.ReactNode;
};

const formContainerStyles = {
  width: '100%',
};

const stringLength = {
  min: 2,
  max: 15,
};

const cardColumnsNumber = { xs: 12, sm: 6, md: 4, lg: 3 };

export default function SetForm({ onSubmit, data, actions }: SetFormProps) {
  const { control, handleSubmit } = useForm<
    Pick<ISet, 'name' | 'bonus' | 'cards'>
  >(
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

  const { fields, append, remove } = useFieldArray(
    useMemo(
      () => ({
        control,
        name: 'cards',
        keyName: 'formId',
      }),
      [control],
    ),
  );

  const handleAddCard = useCallback(
    (value: ICardSummary) => {
      append(value);
    },
    [append],
  );

  const handleSubmitWithTransformation = (
    data: Pick<ISet, 'name' | 'bonus' | 'cards'>,
  ) => {
    onSubmit({
      name: data.name,
      bonus: data.bonus,
      cardsId: data.cards.map((card) => card.id),
    });
  };

  return (
    <Grid2
      container
      spacing={1}
      component="form"
      onSubmit={handleSubmit(handleSubmitWithTransformation)}
      sx={formContainerStyles}>
      <Grid2 size={6}>
        <FormInput
          name="name"
          label="Name"
          control={control}
          errorText="The name must be between 2 and 15 characters long"
          required
          length={stringLength}
        />
      </Grid2>
      <Grid2 size={6}>
        <FormInput
          name="bonus"
          label="Bonus"
          type="number"
          pattern={/^\d+$/}
          control={control}
          errorText="The bonus is required"
          required
        />
      </Grid2>
      <Grid2 container spacing={2} size={12}>
        {fields.map((field, index) => (
          <Grid2 key={field.formId} size={cardColumnsNumber}>
            <Card {...field}>
              <RemoveCardButton index={index} remove={remove} />
            </Card>
          </Grid2>
        ))}
      </Grid2>
      <Grid2 size="auto">{actions}</Grid2>
      <Grid2 size={12}>
        <CardsList handleAddCard={handleAddCard} cardsInSet={fields} />
      </Grid2>
    </Grid2>
  );
}
