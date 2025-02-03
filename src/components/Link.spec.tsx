import '@testing-library/jest-dom';
import { render, screen } from '../test-utils';
import { ROUTES } from '../config/routesConfig';
import Link from './Link';

describe('FormLink component', () => {
  it('should render link', () => {
    const linkName = 'test link';
    const route = ROUTES.SIGN_UP;

    render(<Link to={route}>{linkName}</Link>);

    const linkElement = screen.getByText(linkName);
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute('href', route);
  });
});
