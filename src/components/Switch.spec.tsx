import '@testing-library/jest-dom';
import Switch from './Switch';
import { act, render, screen } from '../test-utils';
import userEvent from '@testing-library/user-event';

describe('Switch component', () => {
  const label = 'switch';

  it('should render switch with label and initial value', () => {
    render(<Switch label={label} checked={false} handleChange={jest.fn()} />);

    expect(screen.getByLabelText(label)).toBeInTheDocument();
    expect(screen.getByRole('checkbox')).not.toBeChecked();
  });

  it('should handle checkbox click', async () => {
    const handleChange = jest.fn();
    render(
      <Switch label={label} checked={false} handleChange={handleChange} />,
    );

    const labelElement = screen.getByLabelText(label);
    await act(async () => {
      userEvent.click(labelElement);
    });

    expect(handleChange).toHaveBeenCalledWith(expect.anything(), true);
  });
});
