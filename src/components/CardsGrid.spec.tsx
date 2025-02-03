import '@testing-library/jest-dom';
import { Gender } from '../enums/gender.enum';
import { render, screen } from '../test-utils';
import CardsGrid from './CardsGrid';

describe('CardsGrid Component', () => {
  it('should render the component with data', () => {
    const cards = [
      {
        id: 'cardId',
        name: 'Test Card',
        image_url: 'https://example.com/test.jpg',
        gender: Gender.MALE,
        is_created_by_admin: true,
        is_active: true,
        is_owned: true,
        type: 'character',
      },
      {
        id: 'cardId2',
        name: 'Test Card 2',
        image_url: 'https://example.com/test.jpg',
        gender: Gender.FEMALE,
        is_created_by_admin: true,
        is_active: true,
        is_owned: true,
        type: 'character',
      },
    ];
    const cardPagePath = jest.fn();
    const cardActions = jest.fn().mockReturnValue(<button>Action</button>);

    render(
      <CardsGrid
        cards={cards}
        cardPagePath={cardPagePath}
        cardActions={cardActions}
      />,
    );

    expect(screen.getByText('Test Card')).toBeInTheDocument();
    expect(screen.getByText('Test Card 2')).toBeInTheDocument();
    expect(screen.getAllByText('Action')).toHaveLength(2);
  });
});
