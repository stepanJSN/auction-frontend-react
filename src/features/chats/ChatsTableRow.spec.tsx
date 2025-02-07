import '@testing-library/jest-dom';
import { act, cleanup } from '@testing-library/react';
import { render, screen } from '../../test-utils';
import ChatsTableRow from './ChatsTableRow';
import { useMediaQuery } from '@mui/material';
import { useNavigate } from 'react-router';
import { ROUTES } from '../../config/routesConfig';
import userEvent from '@testing-library/user-event';

jest.mock('@mui/material', () => ({
  ...jest.requireActual('@mui/material'),
  useMediaQuery: jest.fn(),
  useTheme: jest.fn(() => ({
    breakpoints: { up: jest.fn(() => true) },
  })),
}));
jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  useNavigate: jest.fn(),
}));

describe('ChatsTableRow', () => {
  const mockChat = {
    id: 'chatId',
    name: 'chatName',
    lastMessage: {
      id: 'messageId',
      created_at: '2025-01-01T00:00:00.000',
      message: 'very longgggggggggggg messssssssssssssage',
      sender: {
        name: 'username',
        surname: 'userSurname',
        is_this_user_message: false,
      },
    },
  };
  afterEach(cleanup);

  it('should render chat name with last message data', () => {
    (useMediaQuery as jest.Mock).mockReturnValue(true);
    render(
      <table>
        <tbody>
          <ChatsTableRow chat={mockChat} />
        </tbody>
      </table>,
    );

    expect(screen.getByText(mockChat.name)).toBeInTheDocument();
    const expectedMessageData = `${mockChat.lastMessage.sender.name}: ${mockChat.lastMessage.message} (2025-01-01 00:00)`;
    expect(screen.getByText(expectedMessageData)).toBeInTheDocument();
  });

  it('should render "You" instead of sender name if message was sent by current user', () => {
    const mockThisChat = {
      ...mockChat,
      lastMessage: {
        ...mockChat.lastMessage,
        sender: {
          ...mockChat.lastMessage.sender,
          is_this_user_message: true,
        },
      },
    };
    (useMediaQuery as jest.Mock).mockReturnValue(true);
    render(
      <table>
        <tbody>
          <ChatsTableRow chat={mockThisChat} />
        </tbody>
      </table>,
    );

    const expectedMessageData = `You: ${mockChat.lastMessage.message} (2025-01-01 00:00)`;
    expect(screen.getByText(expectedMessageData)).toBeInTheDocument();
  });

  it('should cut long message on small screens', () => {
    (useMediaQuery as jest.Mock).mockReturnValue(false);
    render(
      <table>
        <tbody>
          <ChatsTableRow chat={mockChat} />
        </tbody>
      </table>,
    );

    const expectedMessageData = `${mockChat.lastMessage.sender.name}: ${mockChat.lastMessage.message.slice(0, 20)}... (2025-01-01 00:00)`;
    expect(screen.getByText(expectedMessageData)).toBeInTheDocument();
  });

  it('should display "No messages or last message was deleted" if there is no last message', () => {
    const mockThisChat = {
      ...mockChat,
      lastMessage: null,
    };
    (useMediaQuery as jest.Mock).mockReturnValue(false);
    render(
      <table>
        <tbody>
          <ChatsTableRow chat={mockThisChat} />
        </tbody>
      </table>,
    );

    expect(
      screen.getByText('No messages or last message was deleted'),
    ).toBeInTheDocument();
  });

  it('should navigate to chat when user clicks on the component', async () => {
    const mockThisChat = {
      ...mockChat,
      lastMessage: null,
    };
    (useMediaQuery as jest.Mock).mockReturnValue(false);
    const mockNavigate = jest.fn();
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
    render(
      <table>
        <tbody>
          <ChatsTableRow chat={mockThisChat} />
        </tbody>
      </table>,
    );

    const tableRowElement = screen.getByRole('row');
    await act(async () => {
      userEvent.click(tableRowElement);
    });

    expect(mockNavigate).toHaveBeenCalledWith(ROUTES.CHAT(mockChat.id));
  });
});
