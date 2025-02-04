import '@testing-library/jest-dom';
import { act, cleanup } from '@testing-library/react';
import { render, screen } from '../../test-utils';
import AuthForm from './AuthForm';
import userEvent from '@testing-library/user-event';

describe('Auth Form component', () => {
  afterEach(cleanup);
  it('should display error if fields are empty', async () => {
    const mockOnSubmit = jest.fn();
    render(<AuthForm isLoading={false} onSubmit={mockOnSubmit} />);

    const submitBtn = screen.getByRole('button', { name: 'Sign In' });
    await act(async () => {
      userEvent.click(submitBtn);
    });

    expect(screen.getByText('Incorrect email')).toBeInTheDocument();
    expect(screen.getByText('Incorrect password')).toBeInTheDocument();
    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  it('should display error if email is invalid', async () => {
    const mockOnSubmit = jest.fn();
    render(<AuthForm isLoading={false} onSubmit={mockOnSubmit} />);

    const submitBtn = screen.getByRole('button', { name: 'Sign In' });
    const emailInput = screen.getByLabelText('Email');
    await act(async () => {
      userEvent.type(emailInput, 'invalid-email');
      userEvent.click(submitBtn);
    });

    expect(screen.getByText('Incorrect email')).toBeInTheDocument();
    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  it('should display error if password is invalid', async () => {
    const mockOnSubmit = jest.fn();
    render(<AuthForm isLoading={false} onSubmit={mockOnSubmit} />);

    const submitBtn = screen.getByRole('button', { name: 'Sign In' });
    const passwordInput = screen.getByLabelText('Password');
    await act(async () => {
      userEvent.type(passwordInput, '1234');
      userEvent.click(submitBtn);
    });

    expect(screen.getByText('Incorrect password')).toBeInTheDocument();
    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  it('should call onSubmit with data if email and password are valid', async () => {
    const mockOnSubmit = jest.fn();
    const mockEmail = 'test@gmail.com';
    const mockPassword = 'test1234';
    render(<AuthForm isLoading={false} onSubmit={mockOnSubmit} />);

    const submitBtn = screen.getByRole('button', { name: 'Sign In' });
    const emailInput = screen.getByLabelText('Email');
    const passwordInput = screen.getByLabelText('Password');
    await act(async () => {
      userEvent.type(emailInput, mockEmail);
      userEvent.type(passwordInput, mockPassword);
      userEvent.click(submitBtn);
    });

    expect(mockOnSubmit).toHaveBeenCalledWith(
      {
        email: mockEmail,
        password: mockPassword,
      },
      expect.anything(),
    );
  });
});
