import '@testing-library/jest-dom';
import { act, cleanup } from '@testing-library/react';
import { MutationStatusEnum } from '../../../enums/mutationStatus';
import { render, screen } from '../../../test-utils';
import Message from './Message';
import userEvent from '@testing-library/user-event';

describe('Message', () => {
  const mockMessage = {
    id: 'messageId',
    created_at: '2025-01-01T10:30:00.000',
    message: 'message text',
    sender: {
      name: 'senderName',
      surname: 'senderSurname',
      is_this_user_message: true,
    },
    creationStatus: MutationStatusEnum.SUCCESS,
    deletionStatus: MutationStatusEnum.IDLE,
  };
  afterEach(cleanup);

  it('should render user message with delete button', () => {
    render(
      <Message
        message={mockMessage}
        onDelete={jest.fn()}
        onResend={jest.fn()}
      />,
    );

    expect(screen.getByText('You')).toBeInTheDocument();
    expect(screen.getByText(mockMessage.message)).toBeInTheDocument();
    expect(screen.getByText('01.01.2025 10:30')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'delete' })).toBeInTheDocument();
  });

  it('should render other user message without delete button', () => {
    const mockThisMessage = {
      ...mockMessage,
      sender: {
        ...mockMessage.sender,
        is_this_user_message: false,
      },
    };
    render(
      <Message
        message={mockThisMessage}
        onDelete={jest.fn()}
        onResend={jest.fn()}
      />,
    );

    expect(
      screen.getByText(
        `${mockThisMessage.sender.name} ${mockThisMessage.sender.surname}`,
      ),
    ).toBeInTheDocument();
    expect(screen.getByText(mockMessage.message)).toBeInTheDocument();
    expect(screen.getByText('01.01.2025 10:30')).toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: 'delete' }),
    ).not.toBeInTheDocument();
  });

  it('should call handleDelete on delete button click', async () => {
    const mockHandleDelete = jest.fn();
    render(
      <Message
        message={mockMessage}
        onDelete={mockHandleDelete}
        onResend={jest.fn()}
      />,
    );

    const deleteBtn = screen.getByRole('button', { name: 'delete' });

    await act(async () => {
      userEvent.click(deleteBtn);
    });

    expect(mockHandleDelete).toHaveBeenCalledWith(mockMessage.id);
  });

  it('should display "Sending..." message when creation status is PENDING', () => {
    const mockThisMessage = {
      ...mockMessage,
      creationStatus: MutationStatusEnum.PENDING,
    };
    render(
      <Message
        message={mockThisMessage}
        onDelete={jest.fn()}
        onResend={jest.fn()}
      />,
    );

    expect(screen.getByText('Sending...')).toBeInTheDocument();
    expect(screen.queryByText('01.01.2025 10:30')).not.toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: 'delete' }),
    ).not.toBeInTheDocument();
  });

  it('should display "Error" message and resend button when creation status is ERROR', () => {
    const mockThisMessage = {
      ...mockMessage,
      creationStatus: MutationStatusEnum.ERROR,
    };
    render(
      <Message
        message={mockThisMessage}
        onDelete={jest.fn()}
        onResend={jest.fn()}
      />,
    );

    expect(screen.getByText('Error')).toBeInTheDocument();
    expect(screen.queryByText('01.01.2025 10:30')).not.toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: 'delete' }),
    ).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'resend' })).toBeInTheDocument();
  });

  it('should call handleResend on resend button click', async () => {
    const mockThisMessage = {
      ...mockMessage,
      creationStatus: MutationStatusEnum.ERROR,
    };
    const mockHandleResend = jest.fn();
    render(
      <Message
        message={mockThisMessage}
        onDelete={jest.fn()}
        onResend={mockHandleResend}
      />,
    );

    const resendButton = screen.getByRole('button', { name: 'resend' });
    await act(async () => {
      userEvent.click(resendButton);
    });

    expect(mockHandleResend).toHaveBeenCalledWith(mockMessage.id);
  });
});
