import '@testing-library/jest-dom';
import { Gender } from '../../enums/gender.enum';
import { act, fireEvent, render, screen, waitFor } from '../../test-utils';
import SetForm from './SetForm';
import FormInput from '../../components/FormInput';
import {
  numberFieldValidationRules,
  textFieldValidationRules,
} from '../../constants/textFieldValidationRules';
import Card from '../../components/Card';
import CardsList from './CardsList';

jest.mock('../../components/FormInput', () => ({
  __esModule: true,
  default: jest.fn(({ name, control, rules, label }) => {
    const { ref, ...rest } = control.register(name, rules);
    return <input {...rest} name={name} aria-label={label} ref={ref} />;
  }),
}));
jest.mock('../../components/Card');
jest.mock('./CardsList');
jest.mock('./RemoveCardButton');

describe('SetForm', () => {
  const mockSet = {
    name: 'set name',
    bonus: 2,
    cards: [
      {
        id: 'cardId',
        name: 'cardName',
        created_at: '2025-01-01T00:00:00.000Z',
        image_url: 'imageUrl',
        type: 'type',
        gender: Gender.MALE,
        is_active: true,
        is_created_by_admin: false,
        location_id: 1,
      },
      {
        id: 'cardId2',
        name: 'cardName',
        created_at: '2025-01-01T00:00:00.000Z',
        image_url: 'imageUrl',
        type: 'type',
        gender: Gender.MALE,
        is_active: true,
        is_created_by_admin: false,
        location_id: 1,
      },
    ],
  };
  const mockActions = <button>Submit</button>;

  afterEach(() => jest.clearAllMocks());

  it('should render form', () => {
    const mockOnSubmit = jest.fn();
    render(
      <SetForm
        onSubmit={mockOnSubmit}
        data={mockSet}
        actions={mockActions}
        isSubmitSuccessful={false}
      />,
    );

    expect(FormInput).toHaveBeenCalledWith(
      expect.objectContaining({
        name: 'name',
        label: 'Name',
        errorText: 'The name must be between 2 and 15 characters long',
        rules: textFieldValidationRules,
      }),
      expect.anything(),
    );
    expect(FormInput).toHaveBeenCalledWith(
      expect.objectContaining({
        name: 'bonus',
        label: 'Bonus',
        type: 'number',
        errorText: 'The bonus is required',
        rules: numberFieldValidationRules,
      }),
      expect.anything(),
    );
    expect(Card).toHaveBeenCalledTimes(2);
    expect(CardsList).toHaveBeenCalled();
  });

  it('should call onSubmit on form submit', async () => {
    const mockOnSubmit = jest.fn();
    render(
      <SetForm
        onSubmit={mockOnSubmit}
        data={mockSet}
        actions={mockActions}
        isSubmitSuccessful={false}
      />,
    );

    const submitBtn = screen.getByRole('button', { name: 'Submit' });
    act(() => {
      fireEvent.click(submitBtn);
    });

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith({
        name: mockSet.name,
        bonus: mockSet.bonus,
        cardsId: [mockSet.cards[0].id, mockSet.cards[1].id],
      });
    });
  });

  it('should reset fields when isSubmitSuccessful is true', () => {
    const mockOnSubmit = jest.fn();
    const { rerender } = render(
      <SetForm
        onSubmit={mockOnSubmit}
        actions={mockActions}
        isSubmitSuccessful={false}
      />,
    );
    const nameInput = screen.getByRole('textbox', { name: 'Name' });
    const bonusInput = screen.getByRole('textbox', { name: 'Bonus' });

    act(() => {
      fireEvent.change(nameInput, { target: { value: 'name' } });
      fireEvent.change(bonusInput, { target: { value: '4' } });
    });

    rerender(
      <SetForm
        onSubmit={mockOnSubmit}
        actions={mockActions}
        isSubmitSuccessful
      />,
    );

    expect(screen.getByRole('textbox', { name: 'Name' })).toHaveDisplayValue(
      '',
    );
    expect(screen.getByRole('textbox', { name: 'Bonus' })).toHaveDisplayValue(
      '',
    );
    expect(Card).not.toHaveBeenCalled();
  });
});
