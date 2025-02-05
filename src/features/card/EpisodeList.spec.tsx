import '@testing-library/jest-dom';
import { getByText, render, screen } from '../../test-utils';
import EpisodesList from './EpisodesList';

describe('Episode List component', () => {
  it('should render list item with provided name', () => {
    const name = 'Episode 1';
    render(<EpisodesList name={name} />);

    const listItem = screen.getByRole('listitem');
    expect(getByText(listItem, name)).toBeInTheDocument();
  });
});
