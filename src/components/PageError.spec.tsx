import '@testing-library/jest-dom';
import { render, screen } from '../test-utils';
import PageError from './PageError';

describe('PageError component', () => {
  it('should render the component correctly', () => {
    render(<PageError />);

    expect(screen.getByText('Error')).toBeInTheDocument();
    expect(screen.getByText('Something went wrong ):')).toBeInTheDocument();
  });
});
