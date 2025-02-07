import '@testing-library/jest-dom';
import { Gender } from '../../enums/gender.enum';
import { render, screen } from '../../test-utils';
import Set from './Set';
import { ROUTES } from '../../config/routesConfig';
import Card from '../../components/Card';

jest.mock('../../components/Card');

describe('Set', () => {
  const mockSet = {
    id: 'setId',
    name: 'set name',
    bonus: 10,
    is_user_has_set: false,
    created_at: '2025-01-01T00:00:00.000Z',
    cards: [
      {
        id: 'cardId',
        name: 'cardName',
        created_at: '2025-01-01T00:00:00.000Z',
        image_url: 'imageUrl',
        type: 'type',
        gender: Gender.MALE,
        is_active: true,
        is_created_by_admin: false,
        location_id: 1,
      },
      {
        id: 'cardId2',
        name: 'cardName',
        created_at: '2025-01-01T00:00:00.000Z',
        image_url: 'imageUrl',
        type: 'type',
        gender: Gender.MALE,
        is_active: true,
        is_created_by_admin: false,
        location_id: 1,
      },
    ],
  };

  it('should render the component with data', () => {
    render(<Set set={mockSet} />);

    expect(screen.getByText(mockSet.name)).toBeInTheDocument();
    expect(screen.getByText(`Bonus: ${mockSet.bonus}`)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Edit' })).toHaveAttribute(
      'href',
      ROUTES.EDIT_SET(mockSet.id),
    );
    expect(Card).toHaveBeenCalledTimes(2);
    expect(Card).toHaveBeenCalledWith(
      {
        ...mockSet.cards[0],
        cardPagePath: expect.any(Function),
      },
      expect.anything(),
    );
    expect(Card).toHaveBeenCalledWith(
      {
        ...mockSet.cards[1],
        cardPagePath: expect.any(Function),
      },
      expect.anything(),
    );
  });

  it('should display "You have collected this set" message if user has set', () => {
    const mockThisSet = {
      ...mockSet,
      is_user_has_set: true,
    };
    render(<Set set={mockThisSet} />);

    expect(screen.getByText('You have collected this set')).toBeInTheDocument();
  });
});
