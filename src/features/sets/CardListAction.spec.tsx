import '@testing-library/jest-dom';
import { Gender } from '../../enums/gender.enum';
import { fireEvent, render, screen } from '../../test-utils';
import CardListAction from './CardListAction';
import { act } from 'react';

describe('CardListAction', () => {
  const mockCard = {
    id: 'cardId',
    name: 'cardName',
    created_at: '2025-01-01T00:00:00.000Z',
    image_url: 'imageUrl',
    type: 'type',
    gender: Gender.MALE,
    is_active: true,
    is_created_by_admin: false,
    location_id: 1,
  };

  it('should render component', () => {
    render(
      <CardListAction
        card={mockCard}
        handleAddCard={jest.fn()}
        cardsInSet={[]}
      />,
    );

    expect(screen.getByText('Add to set')).toBeInTheDocument();
  });

  it('should disable button if card is not active', () => {
    render(
      <CardListAction
        card={{ ...mockCard, is_active: false }}
        handleAddCard={jest.fn()}
        cardsInSet={[]}
      />,
    );

    expect(screen.getByText('Add to set')).toBeDisabled();
  });

  it('should disable button if card is already in set', () => {
    render(
      <CardListAction
        card={mockCard}
        handleAddCard={jest.fn()}
        cardsInSet={[mockCard]}
      />,
    );

    expect(screen.getByText('Add to set')).toBeDisabled();
  });

  it('should call handleAddCard on button click', () => {
    const mockHandleAddCard = jest.fn();
    render(
      <CardListAction
        card={mockCard}
        handleAddCard={mockHandleAddCard}
        cardsInSet={[]}
      />,
    );

    const button = screen.getByRole('button', { name: 'Add to set' });
    act(() => {
      fireEvent.click(button);
    });

    expect(mockHandleAddCard).toHaveBeenCalledWith(mockCard);
  });
});
