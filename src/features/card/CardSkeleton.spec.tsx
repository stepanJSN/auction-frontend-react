import '@testing-library/jest-dom';
import { render, screen } from '../../test-utils';
import CardSkeleton from './CardSkeleton';

describe('Card Skeleton component', () => {
  it('should not show error message if isError is false', () => {
    render(<CardSkeleton isError={false} />);

    expect(screen.queryByText('Something went wrong')).not.toBeInTheDocument();
  });

  it('should show error message if isError is true', () => {
    render(<CardSkeleton isError={true} />);

    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
  });
});
