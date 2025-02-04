import '@testing-library/jest-dom';
import { ROUTES } from '../config/routesConfig';
import { cleanup, render, screen } from '../test-utils';
import FaqHeader from './FaqHeader';
import userEvent from '@testing-library/user-event';

const mockNavigate = jest.fn();
jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  useNavigate: () => mockNavigate,
}));

describe('FaqHeader Component', () => {
  afterEach(cleanup);

  it('should render the component with card active tab', () => {
    const currentPage = ROUTES.CARDS;
    render(<FaqHeader currentPage={currentPage} />);

    const link = screen.getByRole('link', { name: 'Create card' });

    expect(screen.getByText('FAQ')).toBeInTheDocument();
    expect(screen.getByText('Cards')).toBeInTheDocument();
    expect(screen.getByText('Sets')).toBeInTheDocument();
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', ROUTES.CREATE_CARD);
  });

  it('should render the component with set active tab', () => {
    const currentPage = ROUTES.SETS;
    render(<FaqHeader currentPage={currentPage} />);

    const link = screen.getByRole('link', { name: 'Create set' });

    expect(screen.getByText('FAQ')).toBeInTheDocument();
    expect(screen.getByText('Cards')).toBeInTheDocument();
    expect(screen.getByText('Sets')).toBeInTheDocument();
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', ROUTES.CREATE_SET);
  });

  it('should change active tab', () => {
    const currentPage = ROUTES.CARDS;
    render(<FaqHeader currentPage={currentPage} />);
    const setButtonTab = screen.getByText('Sets');

    userEvent.click(setButtonTab);
    expect(mockNavigate).toHaveBeenCalledWith(ROUTES.SETS);
  });
});
