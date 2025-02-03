import { FieldValues, useForm } from 'react-hook-form';
import FormInput, { FormInputProps } from './FormInput';
import { cleanup, render, screen, waitFor } from '../test-utils';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { useEffect } from 'react';

const FormInputWithForm = <T extends FieldValues>(
  props: Omit<FormInputProps<T>, 'control'> & { isError?: boolean },
) => {
  const { control, setError } = useForm<T>();

  useEffect(() => {
    if (props.isError) {
      setError(props.name, { type: 'required' });
    }
  });

  return <FormInput {...props} control={control} />;
};

describe('FormInput component', () => {
  afterEach(cleanup);

  it('should render input with label and placeholder', () => {
    const label = 'Name';
    const placeholder = 'test placeholder';
    render(
      <FormInputWithForm label={label} name="name" placeholder={placeholder} />,
    );

    expect(screen.getByLabelText(label)).toBeInTheDocument();
  });

  it('should change input value', () => {
    const label = 'Name';
    const inputValue = 'test';
    render(<FormInputWithForm label={label} name="name" />);

    const inputElement = screen.getByLabelText(label);

    userEvent.type(inputElement, inputValue);

    expect(screen.getByLabelText(label)).toHaveValue(inputValue);
  });

  it('should change password visibility', () => {
    const label = 'Password';
    render(<FormInputWithForm label={label} name="password" type="password" />);

    const inputElement = screen.getByLabelText(label);
    const visibilityButton = screen.getByRole('button', {
      name: 'display the password',
    });

    expect(inputElement).toHaveAttribute('type', 'password');
    userEvent.click(visibilityButton);
    expect(inputElement).toHaveAttribute('type', 'text');
    userEvent.click(visibilityButton);
    expect(inputElement).toHaveAttribute('type', 'password');
  });

  it('should display error message', async () => {
    const label = 'Name';
    const errorText = 'name is required';
    render(
      <FormInputWithForm
        label={label}
        name="name"
        isError
        errorText={errorText}
      />,
    );

    await waitFor(() => {
      expect(screen.getByText(errorText)).toBeInTheDocument();
    });
  });
});
