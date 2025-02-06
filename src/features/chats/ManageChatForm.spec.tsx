import '@testing-library/jest-dom';
import { act, cleanup, fireEvent, render, screen } from '../../test-utils';
import ManageChatForm from './ManageChatForm';
import FormInput from '../../components/FormInput';
import { optionalTextFieldValidationRules } from '../../constants/textFieldValidationRules';
import ParticipantsFormList from './ParticipantsFormList';
jest.mock('../../components/FormInput', () => ({
  __esModule: true,
  default: jest.fn(({ name, control, rules }) => {
    const { ref, ...rest } = control.register(name, rules);
    return <input {...rest} name={name} data-testid="name-input" ref={ref} />;
  }),
}));
jest.mock('./ParticipantsFormList', () => ({
  __esModule: true,
  default: jest.fn(({ control }) => {
    const { ref, onChange, ...rest } = control.register('participants.0');
    return (
      <input
        {...rest}
        name="participants.0"
        data-testid="participants-input"
        ref={ref}
      />
    );
  }),
}));

describe('MessageChatForm', () => {
  const submitBtn = <button>Submit</button>;
  afterEach(cleanup);

  it('should render component correctly', () => {
    render(<ManageChatForm actions={submitBtn} onSubmit={jest.fn()} />);

    expect(FormInput).toHaveBeenCalledWith(
      expect.objectContaining({
        name: 'name',
        label: 'Name',
        errorText: 'The name must be between 2 and 30 characters long',
        rules: optionalTextFieldValidationRules,
      }),
      expect.anything(),
    );
    expect(ParticipantsFormList).toHaveBeenCalled();
    expect(screen.getByRole('button', { name: 'Submit' })).toBeInTheDocument();
  });

  it('should call onSubmit when user submits form', async () => {
    const mockHandleSubmit = jest.fn();
    const mockChatName = 'chat name';
    const mockParticipant = 'someParticipant';
    render(<ManageChatForm actions={submitBtn} onSubmit={mockHandleSubmit} />);

    const nameInput = screen.getByTestId('name-input');
    const participantsInput = screen.getByTestId('participants-input');
    const submitBtnElem = screen.getByRole('button', { name: 'Submit' });
    await act(async () => {
      fireEvent.change(nameInput, { target: { value: mockChatName } });
      fireEvent.change(participantsInput, {
        target: { value: mockParticipant },
      });
      fireEvent.click(submitBtnElem);
    });

    expect(mockHandleSubmit).toHaveBeenCalledWith({
      name: mockChatName,
      participants: expect.any(Array),
    });
  });
});
