import { useMemo, useCallback, useEffect } from 'react';
import { Grid2 } from '@mui/material';
import FormInput from '../../components/FormInput';
import { useFieldArray, useForm } from 'react-hook-form';
import { ICreateSet, ISet } from '../../types/sets.interface';
import Card from '../../components/Card';
import CardsList from './CardsList';
import { ICardSummary } from '../../types/cards.interface';
import RemoveCardButton from './RemoveCardButton';
import {
  numberFieldValidationRules,
  textFieldValidationRules,
} from '../../constants/textFieldValidationRules';
import { ROUTES } from '../../config/routesConfig';

type SetFormProps = {
  data?: Pick<ISet, 'name' | 'bonus' | 'cards'>;
  onSubmit: (data: ICreateSet) => void;
  actions: React.ReactNode;
  isSubmitSuccessful?: boolean;
};

const formContainerStyles = {
  width: '100%',
};

const cardColumnsNumber = { xs: 12, sm: 6, md: 4, lg: 3 };
const inputColumnsNumber = { xs: 12, sm: 6 };

const formSpacing = { xs: 0, sm: 1 };

export default function SetForm({
  onSubmit,
  data,
  actions,
  isSubmitSuccessful,
}: SetFormProps) {
  const { control, handleSubmit, reset } = useForm<
    Pick<ISet, 'name' | 'bonus' | 'cards'>
  >(
    useMemo(
      () => ({
        defaultValues: {
          name: data?.name,
          bonus: data?.bonus,
          cards: data?.cards || [],
        },
      }),
      [data?.bonus, data?.name, data?.cards],
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

  const cardDetailsRoute = useCallback(
    (cardId: string) => ROUTES.SET_CARD_DETAILS(cardId),
    [],
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
      bonus: +data.bonus,
      cardsId: data.cards.map((card) => card.id),
    });
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  return (
    <Grid2
      container
      spacing={formSpacing}
      component="form"
      onSubmit={handleSubmit(handleSubmitWithTransformation)}
      sx={formContainerStyles}>
      <Grid2 size={inputColumnsNumber}>
        <FormInput
          name="name"
          label="Name"
          control={control}
          errorText="The name must be between 2 and 15 characters long"
          rules={textFieldValidationRules}
        />
      </Grid2>
      <Grid2 size={inputColumnsNumber}>
        <FormInput
          name="bonus"
          label="Bonus"
          type="number"
          control={control}
          errorText="The bonus is required"
          rules={numberFieldValidationRules}
        />
      </Grid2>
      <Grid2 container spacing={2} size={12}>
        {fields.map((field, index) => (
          <Grid2 key={field.formId} size={cardColumnsNumber}>
            <Card {...field} cardPagePath={cardDetailsRoute}>
              <RemoveCardButton index={index} remove={remove} />
            </Card>
          </Grid2>
        ))}
      </Grid2>
      <Grid2 size="auto">{actions}</Grid2>
      <Grid2 size={12}>
        <CardsList
          handleAddCard={handleAddCard}
          cardsInSet={fields}
          cardDetailsRoute={cardDetailsRoute}
        />
      </Grid2>
    </Grid2>
  );
}
