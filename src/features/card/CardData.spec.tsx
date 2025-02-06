import '@testing-library/jest-dom';
import { cleanup } from '@testing-library/react';
import { Gender } from '../../enums/gender.enum';
import { render, screen } from '../../test-utils';
import CardData from './CardData';

describe('Card Data component', () => {
  const imageUrl = 'https://example.com/test.jpg';
  const name = 'Test Card';
  const gender = Gender.MALE;
  const type = 'some type';
  const location = {
    name: 'test location',
  };
  const episodes = [
    {
      id: 1,
      name: 'Episode 1',
    },
    {
      id: 2,
      name: 'Episode 2',
    },
  ];
  afterEach(cleanup);

  it('should render the component with data', () => {
    const isCreatedByAdmin = true;
    const isUserHaveThisCard = true;
    const isActive = true;

    render(
      <CardData
        imageUrl={imageUrl}
        name={name}
        gender={gender}
        type={type}
        location={location}
        episodes={episodes}
        isCreatedByAdmin={isCreatedByAdmin}
        isActive={isActive}
        isUserHaveThisCard={isUserHaveThisCard}
      />,
    );

    expect(screen.getByText(name)).toBeInTheDocument();
    expect(screen.getByText(`Gender: ${gender}`)).toBeInTheDocument();
    expect(screen.getByText(`Type: ${type}`)).toBeInTheDocument();
    expect(screen.getByText(`Location: ${location.name}`)).toBeInTheDocument();
    expect(screen.getByText('Episodes with this card:')).toBeInTheDocument();
    expect(screen.getByText(episodes[0].name)).toBeInTheDocument();
    expect(screen.getByText(episodes[1].name)).toBeInTheDocument();
    expect(screen.getByText('Created by admin')).toBeInTheDocument();
    expect(screen.getByText('You have this card')).toBeInTheDocument();
    expect(screen.getByText('active')).toBeInTheDocument();
  });

  it('should display inactive label if card is not active', () => {
    const isCreatedByAdmin = true;
    const isUserHaveThisCard = false;
    const isActive = false;

    render(
      <CardData
        imageUrl={imageUrl}
        name={name}
        gender={gender}
        type={type}
        location={location}
        episodes={episodes}
        isCreatedByAdmin={isCreatedByAdmin}
        isActive={isActive}
        isUserHaveThisCard={isUserHaveThisCard}
      />,
    );

    expect(screen.getByText('Created by admin')).toBeInTheDocument();
    expect(screen.queryByText('You have this card')).not.toBeInTheDocument();
    expect(screen.getByText('inactive')).toBeInTheDocument();
  });
});
