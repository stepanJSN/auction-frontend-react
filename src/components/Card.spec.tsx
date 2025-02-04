import { render, screen } from '../test-utils';
import Card from './Card';
import { Gender } from '../enums/gender.enum';
import '@testing-library/jest-dom';

describe('Card Component', () => {
  it('should render the component with data', () => {
    const cardId = 'cardId';
    const name = 'Test Card';
    const imageUrl = 'https://example.com/test.jpg';
    const gender = Gender.MALE;
    const isCreatedByAdmin = true;
    const isActive = true;
    const isOwned = true;
    const type = 'character';
    const cardPagePath = jest.fn();
    render(
      <Card
        id={cardId}
        name={name}
        image_url={imageUrl}
        gender={gender}
        is_created_by_admin={isCreatedByAdmin}
        is_active={isActive}
        is_owned={isOwned}
        type={type}
        cardPagePath={cardPagePath}
      />,
    );

    expect(screen.getByText(name)).toBeInTheDocument();
    expect(screen.getByTitle(name)).toHaveAttribute(
      'style',
      `background-image: url(${imageUrl});`,
    );
    expect(screen.getByText(`Gender: ${gender}`)).toBeInTheDocument();
    expect(screen.getByText(`Type: ${type}`)).toBeInTheDocument();
    expect(screen.getByText('Card was created by admin')).toBeInTheDocument();
    expect(screen.getByText('You have this card')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Learn More' }),
    ).toBeInTheDocument();
  });
});
