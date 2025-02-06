import '@testing-library/jest-dom';
import { render, screen } from '../../test-utils';
import EpisodesHeader from './EpisodesHeader';
import DebouncedInput from '../../components/DebouncedInput';
import { ROUTES } from '../../config/routesConfig';

jest.mock('../../components/DebouncedInput');

describe('EpisodesHeader', () => {
  it('should render the component correctly', () => {
    const mockHandleFilterEpisodesByName = jest.fn();
    render(
      <EpisodesHeader
        handleFilterEpisodesByName={mockHandleFilterEpisodesByName}
      />,
    );

    expect(DebouncedInput).toHaveBeenCalledWith(
      {
        label: 'Episode name',
        handleDebouncedChange: mockHandleFilterEpisodesByName,
      },
      expect.anything(),
    );

    expect(
      screen.getByRole('link', { name: 'Create episode' }),
    ).toHaveAttribute('href', ROUTES.CREATE_EPISODE);
  });
});
