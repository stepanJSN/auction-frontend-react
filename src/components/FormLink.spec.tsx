import '@testing-library/jest-dom';
import { render, screen } from '../test-utils';
import FormLink from './FormLink';
import { ROUTES } from '../config/routesConfig';

describe('FormLink component', () => {
  it('should render link', () => {
    const linkName = 'test link';
    const route = ROUTES.SIGN_UP;

    render(<FormLink to={route}>{linkName}</FormLink>);

    const linkElement = screen.getByText(linkName);
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute('href', route);
  });
});
