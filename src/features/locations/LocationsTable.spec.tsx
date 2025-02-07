import '@testing-library/jest-dom';
import { MutationStatusEnum } from '../../enums/mutationStatus';
import { render, screen } from '../../test-utils';
import LocationsTable from './LocationsTable';
import LocationsTableRow from './LocationsTableRow';

jest.mock('./LocationsTableRow');
jest.mock('@mui/material', () => ({
  ...jest.requireActual('@mui/material'),
  useMediaQuery: jest.fn(),
  useTheme: jest.fn(() => ({
    breakpoints: { up: jest.fn(() => true) },
  })),
}));

describe('LocationsTable', () => {
  it('should render location table with provided locations', () => {
    const mockLocations = [
      {
        data: {
          id: 1,
          name: 'Location 1',
          type: 'EP1',
        },
        deleteStatus: MutationStatusEnum.IDLE,
      },
      {
        data: {
          id: 2,
          name: 'Location 2',
          type: 'EP2',
        },
        deleteStatus: MutationStatusEnum.IDLE,
      },
    ];
    const mockOnDelete = jest.fn();
    render(
      <LocationsTable locations={mockLocations} onDelete={mockOnDelete} />,
    );

    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Type')).toBeInTheDocument();
    expect(LocationsTableRow).toHaveBeenCalledTimes(2);
    expect(LocationsTableRow).toHaveBeenCalledWith(
      {
        location: mockLocations[0].data,
        deleteStatus: mockLocations[0].deleteStatus,
        onDelete: mockOnDelete,
      },
      expect.anything(),
    );
    expect(LocationsTableRow).toHaveBeenCalledWith(
      {
        location: mockLocations[1].data,
        deleteStatus: mockLocations[1].deleteStatus,
        onDelete: mockOnDelete,
      },
      expect.anything(),
    );
  });
});
