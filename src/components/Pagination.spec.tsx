import '@testing-library/jest-dom';
import { render, screen } from '../test-utils';
import Pagination from './Pagination';
import userEvent from '@testing-library/user-event';

describe('Pagination component', () => {
  it('should render all page if their number less than 8', () => {
    const totalPages = 7;
    render(
      <Pagination
        currentPage={1}
        totalPages={totalPages}
        handleChange={jest.fn()}
      />,
    );

    expect(
      screen.getByRole('button', { name: 'Go to previous page' }),
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'page 1' })).toBeInTheDocument();
    for (let i = 2; i < totalPages; i++) {
      expect(
        screen.getByRole('button', { name: `Go to page ${i}` }),
      ).toBeInTheDocument();
    }
    expect(
      screen.getByRole('button', { name: 'Go to next page' }),
    ).toBeInTheDocument();
  });

  it('should render only part og pages if their number equal or more than 8', () => {
    const totalPages = 10;
    render(
      <Pagination
        currentPage={1}
        totalPages={totalPages}
        handleChange={jest.fn()}
      />,
    );

    expect(
      screen.getByRole('button', { name: 'Go to previous page' }),
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'page 1' })).toBeInTheDocument();
    for (let i = 2; i <= 5; i++) {
      expect(
        screen.getByRole('button', { name: `Go to page ${i}` }),
      ).toBeInTheDocument();
    }
    for (let i = 6; i < totalPages; i++) {
      expect(
        screen.queryByRole('button', { name: `Go to page ${i}` }),
      ).not.toBeInTheDocument();
    }
    expect(
      screen.getByRole('button', { name: 'Go to page 10' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Go to next page' }),
    ).toBeInTheDocument();
  });

  it('should handle page change', () => {
    const totalPages = 2;
    const handlePage = jest.fn();
    render(
      <Pagination
        currentPage={1}
        totalPages={totalPages}
        handleChange={handlePage}
      />,
    );

    userEvent.click(screen.getByRole('button', { name: 'Go to page 2' }));
    expect(handlePage).toHaveBeenCalledWith(expect.anything(), 2);
  });
});
