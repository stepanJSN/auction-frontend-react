import '@testing-library/jest-dom';
import { act, cleanup, fireEvent } from '@testing-library/react';
import { render, screen } from '../../../test-utils';
import MessageForm from './MessageForm';
import FormInput from '../../../components/FormInput';
import userEvent from '@testing-library/user-event';

jest.mock('../../../components/FormInput', () => ({
  __esModule: true,
  default: jest.fn(({ name, control, rules }) => {
    const { ref, ...rest } = control.register(name, rules);
    return (
      <input {...rest} name={name} data-testid="message-input" ref={ref} />
    );
  }),
}));

describe('MessageForm', () => {
  afterEach(cleanup);

  it('should render correctly', () => {
    const messageValidationRules = {
      required: true,
      minLength: 1,
      maxLength: 1000,
    };
    render(<MessageForm onSubmit={jest.fn()} />);

    expect(FormInput).toHaveBeenCalledWith(
      expect.objectContaining({
        name: 'message',
        label: 'Message',
        rules: messageValidationRules,
        errorText: 'The message must be between 1 and 1000 characters long',
      }),
      expect.anything(),
    );
    expect(screen.getByRole('button', { name: 'Send' })).toBeInTheDocument();
  });

  it('should submit form with message', async () => {
    const mockOnSubmit = jest.fn();
    const mockMessage = 'some message';
    render(<MessageForm onSubmit={mockOnSubmit} />);

    const inputElement = screen.getByRole('textbox');
    const submitBtn = screen.getByRole('button', { name: 'Send' });
    await act(async () => {
      fireEvent.change(inputElement, { target: { value: mockMessage } });
      userEvent.click(submitBtn);
    });

    screen.debug();

    expect(mockOnSubmit).toHaveBeenCalledWith({ message: mockMessage });
  });
});
