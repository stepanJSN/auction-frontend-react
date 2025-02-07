import '@testing-library/jest-dom';
import { MutationStatusEnum } from '../../enums/mutationStatus';
import { render, screen } from '../../test-utils';
import EpisodesTable from './EpisodesTable';
import EpisodesTableRow from './EpisodesTableRow';

jest.mock('./EpisodesTableRow');
jest.mock('@mui/material', () => ({
  ...jest.requireActual('@mui/material'),
  useMediaQuery: jest.fn(),
  useTheme: jest.fn(() => ({
    breakpoints: { up: jest.fn(() => true) },
  })),
}));

describe('EpisodesTable', () => {
  it('should render episode table with provided episodes', () => {
    const mockEpisodes = [
      {
        data: {
          id: 1,
          name: 'Episode 1',
          code: 'EP1',
        },
        deleteStatus: MutationStatusEnum.IDLE,
      },
      {
        data: {
          id: 2,
          name: 'Episode 2',
          code: 'EP2',
        },
        deleteStatus: MutationStatusEnum.IDLE,
      },
    ];
    const mockOnDelete = jest.fn();
    render(<EpisodesTable episodes={mockEpisodes} onDelete={mockOnDelete} />);

    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Code')).toBeInTheDocument();
    expect(EpisodesTableRow).toHaveBeenCalledTimes(2);
    expect(EpisodesTableRow).toHaveBeenCalledWith(
      {
        episode: mockEpisodes[0].data,
        deleteStatus: mockEpisodes[0].deleteStatus,
        onDelete: mockOnDelete,
      },
      expect.anything(),
    );
    expect(EpisodesTableRow).toHaveBeenCalledWith(
      {
        episode: mockEpisodes[1].data,
        deleteStatus: mockEpisodes[1].deleteStatus,
        onDelete: mockOnDelete,
      },
      expect.anything(),
    );
  });
});
