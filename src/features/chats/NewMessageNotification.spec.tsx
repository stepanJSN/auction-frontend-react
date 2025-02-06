import '@testing-library/jest-dom';
import { act, render, screen } from '../../test-utils';
import NewMessageNotification from './NewMessageNotification';
import { ROUTES } from '../../config/routesConfig';
import userEvent from '@testing-library/user-event';

describe('NewMessageNotification', () => {
  const mockSender = 'user';
  const mockChatId = 'chatId';

  it('should render correctly', () => {
    render(
      <NewMessageNotification
        open
        handleClose={jest.fn()}
        sender={mockSender}
        chatId={mockChatId}
      />,
    );

    expect(
      screen.getByText(`New message from ${mockSender}`),
    ).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'See message' })).toHaveAttribute(
      'href',
      ROUTES.CHAT(mockChatId),
    );
  });

  it('should close on close alert button click', async () => {
    const mockHandleClose = jest.fn();
    render(
      <NewMessageNotification
        open
        handleClose={mockHandleClose}
        sender={mockSender}
        chatId={mockChatId}
      />,
    );

    const closeBtn = screen.getByRole('button', { name: 'Close' });
    await act(async () => {
      userEvent.click(closeBtn);
    });

    expect(mockHandleClose).toHaveBeenCalled();
  });

  it('should close after 3s automatically', async () => {
    jest.useFakeTimers();
    const mockHandleClose = jest.fn();
    render(
      <NewMessageNotification
        open
        handleClose={mockHandleClose}
        sender={mockSender}
        chatId={mockChatId}
      />,
    );

    jest.advanceTimersByTime(3000);

    expect(mockHandleClose).toHaveBeenCalled();
    jest.useRealTimers();
  });
});
