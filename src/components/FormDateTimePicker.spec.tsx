import '@testing-library/jest-dom';
import { FieldValues, useForm } from 'react-hook-form';
import { act, render, screen } from '../test-utils';
import FormDateTimePicker, {
  FormDateTimePickerProps,
} from './FormDateTimePicker';
import userEvent from '@testing-library/user-event';

const DatePickerWithForm = <T extends FieldValues>(
  props: Omit<FormDateTimePickerProps<T>, 'control'>,
) => {
  const { control } = useForm();

  return <FormDateTimePicker {...props} control={control} />;
};

describe('FormDateTimePicker component', () => {
  it('should render with label', () => {
    const label = 'Test Date Picker';
    render(<DatePickerWithForm<{ date: string }> name="date" label={label} />);

    expect(screen.getByLabelText(label)).toBeInTheDocument();
  });

  it('should update value on change', async () => {
    const label = 'Test Date Picker';
    const date = '28';
    render(<DatePickerWithForm<{ date: string }> name="date" label={label} />);

    await act(async () => {
      userEvent.click(screen.getByRole('button', { name: 'Choose date' }));
    });
    await act(async () => {
      userEvent.click(screen.getByRole('gridcell', { name: date }));
    });

    const expectedMonth = String(new Date().getMonth() + 1).padStart(2, '0');
    expect(screen.getByRole('textbox')).toHaveValue(
      `${expectedMonth}/${date}/${new Date().getFullYear()} 00:00`,
    );
  });
});
