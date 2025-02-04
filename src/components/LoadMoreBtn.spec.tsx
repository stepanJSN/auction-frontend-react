import '@testing-library/jest-dom';
import { cleanup } from '@testing-library/react';
import { render, screen } from '../test-utils';
import LoadMoreBtn from './LoadMoreBtn';
import userEvent from '@testing-library/user-event';

describe('LoadMoreBtn', () => {
  afterEach(cleanup);

  it('should render button with "Load more" text if isLoading is false and hasMore is true', () => {
    render(
      <LoadMoreBtn hasMore isLoading={false} handleLoadMore={jest.fn()} />,
    );

    expect(
      screen.getByRole('button', { name: 'Load more' }),
    ).not.toBeDisabled();
  });

  it('should render button with "Loading..." text if isLoading is true and hasMore is true', () => {
    render(<LoadMoreBtn hasMore isLoading handleLoadMore={jest.fn()} />);

    expect(
      screen.getByRole('button', { name: 'Loading...' }),
    ).not.toBeDisabled();
  });

  it('should be disabled if hasMore is false', () => {
    render(
      <LoadMoreBtn
        hasMore={false}
        isLoading={false}
        handleLoadMore={jest.fn()}
      />,
    );

    expect(screen.getByRole('button', { name: 'Load more' })).toBeDisabled();
  });

  it('should be call handleLoadMore func on button click', () => {
    const handleLoadMore = jest.fn();
    render(
      <LoadMoreBtn hasMore isLoading={false} handleLoadMore={handleLoadMore} />,
    );

    userEvent.click(screen.getByRole('button', { name: 'Load more' }));
    expect(handleLoadMore).toHaveBeenCalled();
  });
});
