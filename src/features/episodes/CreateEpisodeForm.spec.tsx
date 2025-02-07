import '@testing-library/jest-dom';
import { act, cleanup, fireEvent } from '@testing-library/react';
import { render, screen } from '../../test-utils';
import CreateEpisodeForm from './CreateEpisodeForm';
import FormInput from '../../components/FormInput';
import { textFieldValidationRules } from '../../constants/textFieldValidationRules';

jest.mock('../../components/FormInput', () => ({
  __esModule: true,
  default: jest.fn(({ name, control, rules, label }) => {
    const { ref, ...rest } = control.register(name, rules);
    return <input {...rest} name={name} aria-label={label} ref={ref} />;
  }),
}));

describe('CreateEpisodeForm', () => {
  const mockName = 'name';
  const mockCode = 'code';
  afterEach(cleanup);

  it('should render correctly', () => {
    render(
      <CreateEpisodeForm
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
        name: 'code',
        label: 'Code',
        rules: textFieldValidationRules,
        errorText: 'The code must be between 2 and 15 characters long',
      }),
      expect.anything(),
    );
    expect(screen.getByRole('button', { name: 'Create' })).toBeInTheDocument();
  });

  it('should submit form with name and code', async () => {
    const mockOnSubmit = jest.fn();
    render(
      <CreateEpisodeForm
        onSubmit={mockOnSubmit}
        isLoading={false}
        isSuccess={false}
      />,
    );

    const nameInput = screen.getByLabelText('Name');
    const codeInput = screen.getByLabelText('Code');
    const submitBtn = screen.getByRole('button', { name: 'Create' });
    await act(async () => {
      fireEvent.change(nameInput, { target: { value: mockName } });
      fireEvent.change(codeInput, { target: { value: mockCode } });
      fireEvent.click(submitBtn);
    });

    expect(mockOnSubmit).toHaveBeenCalledWith(
      {
        name: mockName,
        code: mockCode,
      },
      expect.anything(),
    );
  });

  it('should disable create button when isLoading is true', async () => {
    const mockOnSubmit = jest.fn();
    render(
      <CreateEpisodeForm onSubmit={mockOnSubmit} isLoading isSuccess={false} />,
    );

    expect(screen.getByRole('button', { name: 'Creating...' })).toBeDisabled();
  });

  it('should reset inputs when is success is true', async () => {
    const mockOnSubmit = jest.fn();
    const { rerender } = render(
      <CreateEpisodeForm
        onSubmit={mockOnSubmit}
        isLoading={false}
        isSuccess={false}
      />,
    );

    const nameInput = screen.getByLabelText('Name');
    const codeInput = screen.getByLabelText('Code');
    await act(async () => {
      fireEvent.change(nameInput, { target: { value: mockName } });
      fireEvent.change(codeInput, { target: { value: mockCode } });
    });

    rerender(
      <CreateEpisodeForm onSubmit={mockOnSubmit} isLoading={false} isSuccess />,
    );

    expect(nameInput).toHaveDisplayValue('');
    expect(codeInput).toHaveDisplayValue('');
  });
});
