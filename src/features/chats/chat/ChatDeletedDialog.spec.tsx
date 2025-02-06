import '@testing-library/jest-dom';
import { act, cleanup } from '@testing-library/react';
import { render, screen } from '../../../test-utils';
import ChatDeletedDialog from './ChatDeletedDialog';
import userEvent from '@testing-library/user-event';
import { ROUTES } from '../../../config/routesConfig';
import { useNavigate } from 'react-router';

jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  useNavigate: jest.fn(),
}));

describe('ChatDeletedDialog', () => {
  afterEach(cleanup);

  it('should render correctly if open prop is true', () => {
    render(<ChatDeletedDialog open />);

    expect(screen.getByText('Chat was deleted')).toBeInTheDocument();
    expect(
      screen.getByText('The chat was deleted by some participant'),
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Ok' })).toBeInTheDocument();
  });

  it('should not render if open prop is false', () => {
    render(<ChatDeletedDialog open={false} />);

    expect(screen.queryByText('Chat was deleted')).not.toBeInTheDocument();
    expect(
      screen.queryByText('The chat was deleted by some participant'),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: 'Ok' }),
    ).not.toBeInTheDocument();
  });

  it('should not render if open prop is false', () => {
    render(<ChatDeletedDialog open={false} />);

    expect(screen.queryByText('Chat was deleted')).not.toBeInTheDocument();
    expect(
      screen.queryByText('The chat was deleted by some participant'),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: 'Ok' }),
    ).not.toBeInTheDocument();
  });

  it('should navigate to /chats on ok button click', async () => {
    const mockDispatch = jest.fn();
    (useNavigate as jest.Mock).mockReturnValue(mockDispatch);
    render(<ChatDeletedDialog open />);

    const okBtn = screen.getByRole('button', { name: 'Ok' });
    await act(async () => {
      userEvent.click(okBtn);
    });

    expect(mockDispatch).toHaveBeenCalledWith(ROUTES.CHATS);
  });
});
