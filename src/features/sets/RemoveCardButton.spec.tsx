import '@testing-library/jest-dom';
import { act, fireEvent, render, screen } from '../../test-utils';
import RemoveCardButton from './RemoveCardButton';

describe('RemoveCardButton', () => {
  it('should call remove on button click', () => {
    const mockIndex = 1;
    const mockRemove = jest.fn();
    render(<RemoveCardButton index={mockIndex} remove={mockRemove} />);

    const button = screen.getByRole('button', { name: 'Remove from set' });
    act(() => {
      fireEvent.click(button);
    });

    expect(mockRemove).toHaveBeenCalledWith(mockIndex);
  });
});
