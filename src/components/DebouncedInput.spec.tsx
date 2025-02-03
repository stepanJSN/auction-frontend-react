import userEvent from '@testing-library/user-event';
import { render, screen, waitFor } from '../test-utils';
import DebouncedInput from './DebouncedInput';
import '@testing-library/jest-dom';

describe('DebouncedInput Component', () => {
  it('should render input with label', () => {
    const label = 'Test Input';
    render(<DebouncedInput label={label} handleDebouncedChange={jest.fn()} />);

    expect(screen.getByLabelText(label)).toBeInTheDocument();
  });

  it('should call handleDebouncedChange when input value changes', async () => {
    const label = 'Test Input';
    const handleDebouncedChange = jest.fn();
    render(
      <DebouncedInput
        label={label}
        handleDebouncedChange={handleDebouncedChange}
      />,
    );

    const input = screen.getByLabelText(label);
    userEvent.type(input, 'test');
    await waitFor(() =>
      expect(handleDebouncedChange).toHaveBeenCalledWith('test'),
    );
  });
});
