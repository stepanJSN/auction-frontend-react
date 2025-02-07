import '@testing-library/jest-dom';
import { act, cleanup, fireEvent } from '@testing-library/react';
import { render, screen } from '../../test-utils';
import FormInput from '../../components/FormInput';
import { textFieldValidationRules } from '../../constants/textFieldValidationRules';
import EditEpisodeForm from './EditEpisodeForm';

jest.mock('../../components/FormInput', () => ({
  __esModule: true,
  default: jest.fn(({ name, control, rules, label }) => {
    const { ref, ...rest } = control.register(name, rules);
    return <input {...rest} name={name} aria-label={label} ref={ref} />;
  }),
}));

describe('EditEpisodeForm', () => {
  const mockEpisode = {
    name: 'Name',
    code: 'Code',
  };
  afterEach(cleanup);

  it('should render correctly', () => {
    render(
      <EditEpisodeForm
        onSubmit={jest.fn()}
        isLoading={false}
        episode={mockEpisode}
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
    expect(screen.getByRole('button', { name: 'Update' })).toBeInTheDocument();
    expect(screen.getByDisplayValue(mockEpisode.name)).toBeInTheDocument();
    expect(screen.getByDisplayValue(mockEpisode.code)).toBeInTheDocument();
  });

  it('should submit form with name and code', async () => {
    const mockNewName = 'newName';
    const mockOnSubmit = jest.fn();
    render(
      <EditEpisodeForm
        onSubmit={mockOnSubmit}
        isLoading={false}
        episode={mockEpisode}
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
        code: mockEpisode.code,
      },
      expect.anything(),
    );
  });

  it('should disable update button when isLoading is true', async () => {
    render(
      <EditEpisodeForm onSubmit={jest.fn()} isLoading episode={mockEpisode} />,
    );

    expect(screen.getByRole('button', { name: 'Updating...' })).toBeDisabled();
  });
});
