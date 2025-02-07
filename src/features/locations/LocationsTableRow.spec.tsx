import '@testing-library/jest-dom';
import { act, render, screen } from '../../test-utils';
import LocationsTableRow from './LocationsTableRow';
import { MutationStatusEnum } from '../../enums/mutationStatus';
import { ROUTES } from '../../config/routesConfig';
import Notification from '../../components/Notification';
import userEvent from '@testing-library/user-event';

jest.mock('../../components/Notification');
jest.mock('@mui/material', () => ({
  ...jest.requireActual('@mui/material'),
  useMediaQuery: jest.fn(() => true),
  useTheme: jest.fn(() => ({
    breakpoints: { up: jest.fn() },
  })),
}));

describe('LocationsTableRow', () => {
  const mockLocation = {
    id: 1,
    name: 'Location 1',
    type: 'EP1',
  };

  it('should render correctly', () => {
    render(
      <table>
        <tbody>
          <LocationsTableRow
            location={mockLocation}
            onDelete={jest.fn()}
            deleteStatus={MutationStatusEnum.IDLE}
          />
        </tbody>
      </table>,
    );

    expect(screen.getByText(mockLocation.name)).toBeInTheDocument();
    expect(screen.getByText(mockLocation.type)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Edit' })).toHaveAttribute(
      'href',
      ROUTES.EDIT_LOCATION(mockLocation.id),
    );
    expect(screen.getByRole('button', { name: 'Delete' })).toBeInTheDocument();
  });

  it('should disable delete button if deleteStatus is PENDING', () => {
    render(
      <table>
        <tbody>
          <LocationsTableRow
            location={mockLocation}
            onDelete={jest.fn()}
            deleteStatus={MutationStatusEnum.PENDING}
          />
        </tbody>
      </table>,
    );

    expect(screen.getByRole('button', { name: 'Delete' })).toBeDisabled();
  });

  it('should display notification if deleteStatus is ERROR', () => {
    render(
      <table>
        <tbody>
          <LocationsTableRow
            location={mockLocation}
            onDelete={jest.fn()}
            deleteStatus={MutationStatusEnum.ERROR}
          />
        </tbody>
      </table>,
    );

    expect(Notification).toHaveBeenCalledWith(
      {
        open: true,
        message: `Failed to delete ${mockLocation.name}, something went wrong`,
        severity: 'error',
        anchorOrigin: { vertical: 'bottom', horizontal: 'center' },
      },
      expect.anything(),
    );
  });

  it('should call onDelete if delete button is clicked', async () => {
    const mockOnDelete = jest.fn();
    render(
      <table>
        <tbody>
          <LocationsTableRow
            location={mockLocation}
            onDelete={mockOnDelete}
            deleteStatus={MutationStatusEnum.IDLE}
          />
        </tbody>
      </table>,
    );

    const deleteButton = screen.getByRole('button', { name: 'Delete' });
    await act(async () => {
      userEvent.click(deleteButton);
    });

    expect(mockOnDelete).toHaveBeenCalled();
  });
});
