import '@testing-library/jest-dom';
import { act, cleanup } from '@testing-library/react';
import { render, screen } from '../../../test-utils';
import ChatSettings from './ChatSettings';
import useDeleteChat from '../delete/useDeleteChat';
import { MutationStatusEnum } from '../../../enums/mutationStatus';
import userEvent from '@testing-library/user-event';

jest.mock('../delete/useDeleteChat');

describe('ChatSettings', () => {
  const chatId = 'chatId';
  const participants = [
    {
      id: 'user1',
      name: 'User 1',
      surname: 'Surname 1',
    },
    {
      id: 'user2',
      name: 'User 2',
      surname: 'Surname 2',
    },
  ];
  afterEach(cleanup);

  it('should render the component correctly', () => {
    (useDeleteChat as jest.Mock).mockReturnValue({
      handleDelete: jest.fn(),
      deleteStatus: MutationStatusEnum.IDLE,
    });

    render(
      <ChatSettings
        chatId={chatId}
        participants={participants}
        isOpen={true}
        isMobileVersion={false}
        onClose={jest.fn()}
      />,
    );

    expect(screen.getByText('Participants')).toBeInTheDocument();
    for (const participant of participants) {
      expect(screen.getByText(participant.name)).toBeInTheDocument();
    }
    expect(screen.getByRole('link', { name: 'Edit' })).toHaveAttribute(
      'href',
      '/edit',
    );
    expect(screen.getByRole('button', { name: 'Delete' })).toBeInTheDocument();
  });

  it('should call handleDelete on delete button click', async () => {
    const mockHandleDelete = jest.fn();
    (useDeleteChat as jest.Mock).mockReturnValue({
      handleDelete: mockHandleDelete,
      deleteStatus: MutationStatusEnum.IDLE,
    });

    render(
      <ChatSettings
        chatId={chatId}
        participants={participants}
        isOpen={true}
        isMobileVersion={false}
        onClose={jest.fn()}
      />,
    );

    const deleteBtn = screen.getByRole('button', { name: 'Delete' });
    await act(async () => {
      userEvent.click(deleteBtn);
    });

    expect(mockHandleDelete).toHaveBeenCalled();
  });

  it('should disable delete button when deleteStatus is PENDING', () => {
    (useDeleteChat as jest.Mock).mockReturnValue({
      handleDelete: jest.fn(),
      deleteStatus: MutationStatusEnum.PENDING,
    });

    render(
      <ChatSettings
        chatId={chatId}
        participants={participants}
        isOpen={true}
        isMobileVersion={false}
        onClose={jest.fn()}
      />,
    );

    expect(screen.getByRole('button', { name: 'Deleting...' })).toBeDisabled();
  });

  it('should display error message if deleteStatus is ERROR', () => {
    (useDeleteChat as jest.Mock).mockReturnValue({
      handleDelete: jest.fn(),
      deleteStatus: MutationStatusEnum.ERROR,
    });

    render(
      <ChatSettings
        chatId={chatId}
        participants={participants}
        isOpen={true}
        isMobileVersion={false}
        onClose={jest.fn()}
      />,
    );

    expect(
      screen.getByText('Failed to delete chat. Something went wrong'),
    ).toBeInTheDocument();
  });

  it('should display close button if isMobileVersion is true and should call onClose', async () => {
    const mockOnClose = jest.fn();
    (useDeleteChat as jest.Mock).mockReturnValue({
      handleDelete: jest.fn(),
      deleteStatus: MutationStatusEnum.IDLE,
    });

    render(
      <ChatSettings
        chatId={chatId}
        participants={participants}
        isOpen={true}
        isMobileVersion={true}
        onClose={mockOnClose}
      />,
    );

    const closeBtn = screen.getByRole('button', { name: 'Close settings' });
    expect(closeBtn).toBeInTheDocument();

    await act(async () => {
      userEvent.click(closeBtn);
    });

    expect(mockOnClose).toHaveBeenCalled();
  });
});
