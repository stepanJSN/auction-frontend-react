import '@testing-library/jest-dom';
import { act, cleanup } from '@testing-library/react';
import { render, screen } from '../test-utils';
import ModalPage from './ModalPage';
import userEvent from '@testing-library/user-event';

const mockNavigate = jest.fn();
jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  useNavigate: () => mockNavigate,
}));

describe('ModalPage', () => {
  afterEach(cleanup);
  const childContent = 'Some text';
  const child = <p>{childContent}</p>;
  const parentPath = '../';

  it('should render dialog with children and close icon', () => {
    render(<ModalPage parentPath={parentPath}>{child}</ModalPage>);

    expect(screen.getByText(childContent)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'close' })).toBeInTheDocument();
  });

  it('should navigate to parent page on close button click', async () => {
    render(<ModalPage parentPath={parentPath}>{child}</ModalPage>);

    const closeBtn = screen.getByRole('button', { name: 'close' });
    await act(async () => {
      userEvent.click(closeBtn);
    });
    expect(mockNavigate).toHaveBeenCalledWith(parentPath);
  });

  it('should navigate to parent page on click outside of dialog', async () => {
    render(<ModalPage parentPath={parentPath}>{child}</ModalPage>);

    await act(async () => {
      userEvent.click(document.body);
    });
    expect(mockNavigate).toHaveBeenCalledWith(parentPath);
  });
});
