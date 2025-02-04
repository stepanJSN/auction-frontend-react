import '@testing-library/jest-dom';
import { cleanup } from '@testing-library/react';
import { render, screen } from '../test-utils';
import Notification from './Notification';

describe('Notification component', () => {
  afterEach(cleanup);
  const message = 'Some test message';

  it('should show alert with message if open', () => {
    render(<Notification open message={message} />);

    expect(screen.getByText(message)).toBeInTheDocument();
  });

  it('should not show alert with message if open is false', () => {
    render(<Notification open={false} message={message} />);

    expect(screen.queryByText(message)).not.toBeInTheDocument();
  });
});
