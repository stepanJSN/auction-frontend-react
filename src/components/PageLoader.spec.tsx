import '@testing-library/jest-dom';
import { render, screen } from '../test-utils';
import PageLoader from './PageLoader';

describe('Page loader', () => {
  it('should render progressbar', () => {
    render(<PageLoader />);

    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });
});
