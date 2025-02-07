import '@testing-library/jest-dom';
import { act, cleanup, fireEvent } from '@testing-library/react';
import { render, screen } from '../../test-utils';
import FormInput from '../../components/FormInput';
import { textFieldValidationRules } from '../../constants/textFieldValidationRules';
import CreateLocationForm from './CreateLocationForm';

jest.mock('../../components/FormInput', () => ({
  __esModule: true,
  default: jest.fn(({ name, control, rules, label }) => {
    const { ref, ...rest } = control.register(name, rules);
    return <input {...rest} name={name} aria-label={label} ref={ref} />;
  }),
}));

describe('CreateLocationForm', () => {
  const mockName = 'name';
  const mockType = 'type';
  afterEach(cleanup);

  it('should render correctly', () => {
    render(
      <CreateLocationForm
        onSubmit={jest.fn()}
        isLoading={false}
        isSuccess={false}
      />,
    );

    expect(FormInput).toHaveBeenCalledWith(
      expect.objectContaining({
        name: 'name',
        label: 'Name',
        rules: textFieldValidationRules,
        errorText: 'The name must be between 2 and 15 characters long',
      }),
      expect.anything(),
    );
    expect(FormInput).toHaveBeenCalledWith(
      expect.objectContaining({
        name: 'type',
        label: 'Type',
        rules: textFieldValidationRules,
        errorText: 'The type must be between 2 and 15 characters long',
      }),
      expect.anything(),
    );
    expect(screen.getByRole('button', { name: 'Create' })).toBeInTheDocument();
  });

  it('should submit form with name and type', async () => {
    const mockOnSubmit = jest.fn();
    render(
      <CreateLocationForm
        onSubmit={mockOnSubmit}
        isLoading={false}
        isSuccess={false}
      />,
    );

    const nameInput = screen.getByLabelText('Name');
    const typeInput = screen.getByLabelText('Type');
    const submitBtn = screen.getByRole('button', { name: 'Create' });
    await act(async () => {
      fireEvent.change(nameInput, { target: { value: mockName } });
      fireEvent.change(typeInput, { target: { value: mockType } });
      fireEvent.click(submitBtn);
    });

    expect(mockOnSubmit).toHaveBeenCalledWith(
      {
        name: mockName,
        type: mockType,
      },
      expect.anything(),
    );
  });

  it('should disable create button when isLoading is true', async () => {
    const mockOnSubmit = jest.fn();
    render(
      <CreateLocationForm
        onSubmit={mockOnSubmit}
        isLoading
        isSuccess={false}
      />,
    );

    expect(screen.getByRole('button', { name: 'Creating...' })).toBeDisabled();
  });

  it('should reset inputs when is success is true', async () => {
    const mockOnSubmit = jest.fn();
    const { rerender } = render(
      <CreateLocationForm
        onSubmit={mockOnSubmit}
        isLoading={false}
        isSuccess={false}
      />,
    );

    const nameInput = screen.getByLabelText('Name');
    const typeInput = screen.getByLabelText('Type');
    await act(async () => {
      fireEvent.change(nameInput, { target: { value: mockName } });
      fireEvent.change(typeInput, { target: { value: mockType } });
    });

    rerender(
      <CreateLocationForm
        onSubmit={mockOnSubmit}
        isLoading={false}
        isSuccess
      />,
    );

    expect(nameInput).toHaveDisplayValue('');
    expect(typeInput).toHaveDisplayValue('');
  });
});
