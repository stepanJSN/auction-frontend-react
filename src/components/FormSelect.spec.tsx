import { FieldValues, useForm } from 'react-hook-form';
import FormSelect, { FormSelectProps } from './FormSelect';
import '@testing-library/jest-dom';
import { act, render, screen } from '../test-utils';
import userEvent from '@testing-library/user-event';

const FormSelectWithForm = <T extends FieldValues>(
  props: Omit<FormSelectProps<T>, 'control'> & { isError?: boolean },
) => {
  const { control } = useForm<T>();

  return <FormSelect {...props} control={control} />;
};

describe('FormSelect component', () => {
  const label = 'test select';
  const defaultValue = 'option1';
  const options = [
    { value: defaultValue, label: 'option1' },
    { value: 'option2', label: 'option2' },
  ];

  it('should render select with label and default value', () => {
    render(
      <FormSelectWithForm
        name="select"
        label={label}
        defaultValue={defaultValue}
        options={options}
      />,
    );

    const selectElement = screen.getAllByText(label);
    expect(selectElement).toHaveLength(2);
    expect(screen.getByText(defaultValue)).toBeInTheDocument();
  });

  it('should list on options on select click and handle option select', async () => {
    render(
      <FormSelectWithForm
        name="select"
        label={label}
        defaultValue={defaultValue}
        options={options}
      />,
    );

    const inputElement = screen.getByRole('combobox');
    userEvent.click(inputElement);

    expect(screen.getAllByText(options[0].value)).toHaveLength(2);
    expect(screen.getByText(options[1].value)).toBeInTheDocument();
    await act(async () => {
      userEvent.click(screen.getByText(options[1].value));
    });
    expect(screen.getByText(options[1].value)).toBeInTheDocument();
  });
});
