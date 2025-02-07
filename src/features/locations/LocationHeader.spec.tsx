import '@testing-library/jest-dom';
import { render, screen } from '../../test-utils';
import LocationsHeader from './LocationsHeader';
import DebouncedInput from '../../components/DebouncedInput';
import { ROUTES } from '../../config/routesConfig';

jest.mock('../../components/DebouncedInput');

describe('LocationsHeader', () => {
  it('should render the component correctly', () => {
    const mockHandleFilterLocationsByName = jest.fn();
    render(
      <LocationsHeader
        handleFilterLocationsByName={mockHandleFilterLocationsByName}
      />,
    );

    expect(DebouncedInput).toHaveBeenCalledWith(
      {
        label: 'Location name',
        handleDebouncedChange: mockHandleFilterLocationsByName,
      },
      expect.anything(),
    );

    expect(
      screen.getByRole('link', { name: 'Create location' }),
    ).toHaveAttribute('href', ROUTES.CREATE_LOCATION);
  });
});
