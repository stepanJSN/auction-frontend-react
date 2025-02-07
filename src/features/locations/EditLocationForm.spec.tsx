import '@testing-library/jest-dom';
import { act, cleanup, fireEvent } from '@testing-library/react';
import { render, screen } from '../../test-utils';
import FormInput from '../../components/FormInput';
import { textFieldValidationRules } from '../../constants/textFieldValidationRules';
import EditLocationForm from './EditLocationForm';

jest.mock('../../components/FormInput', () => ({
  __esModule: true,
  default: jest.fn(({ name, control, rules, label }) => {
    const { ref, ...rest } = control.register(name, rules);
    return <input {...rest} name={name} aria-label={label} ref={ref} />;
  }),
}));

describe('EditLocationForm', () => {
  const mockLocation = {
    name: 'Name',
    type: 'Type',
  };
  afterEach(cleanup);

  it('should render correctly', () => {
    render(
      <EditLocationForm
        onSubmit={jest.fn()}
        isLoading={false}
        location={mockLocation}
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
    expect(screen.getByRole('button', { name: 'Update' })).toBeInTheDocument();
    expect(screen.getByDisplayValue(mockLocation.name)).toBeInTheDocument();
    expect(screen.getByDisplayValue(mockLocation.type)).toBeInTheDocument();
  });

  it('should submit form with name and type', async () => {
    const mockNewName = 'newName';
    const mockOnSubmit = jest.fn();
    render(
      <EditLocationForm
        onSubmit={mockOnSubmit}
        isLoading={false}
        location={mockLocation}
      />,
    );

    const nameInput = screen.getByLabelText('Name');
    const submitBtn = screen.getByRole('button', { name: 'Update' });
    await act(async () => {
      fireEvent.change(nameInput, { target: { value: mockNewName } });
      fireEvent.click(submitBtn);
    });

    expect(mockOnSubmit).toHaveBeenCalledWith(
      {
        name: mockNewName,
        type: mockLocation.type,
      },
      expect.anything(),
    );
  });

  it('should disable update button when isLoading is true', async () => {
    render(
      <EditLocationForm
        onSubmit={jest.fn()}
        isLoading
        location={mockLocation}
      />,
    );

    expect(screen.getByRole('button', { name: 'Updating...' })).toBeDisabled();
  });
});
