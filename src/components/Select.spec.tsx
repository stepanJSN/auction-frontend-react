import '@testing-library/jest-dom';
import { act, cleanup } from '@testing-library/react';
import { render, screen } from '../test-utils';
import BasicSelect from './Select';
import userEvent from '@testing-library/user-event';

describe('Select component', () => {
  afterEach(cleanup);

  const label = 'test select';
  const defaultValue = 'option1';
  const options = [
    { value: defaultValue, label: 'option1' },
    { value: 'option2', label: 'option2' },
  ];

  it('should render select with label and initial value', () => {
    render(
      <BasicSelect
        label={label}
        value={defaultValue}
        options={options}
        handleChange={jest.fn()}
      />,
    );

    const selectElement = screen.getAllByText(label);
    expect(selectElement).toHaveLength(2);
    expect(screen.getByText(defaultValue)).toBeInTheDocument();
  });

  it('should list on options on select click and handle option select', async () => {
    const handleChange = jest.fn();
    render(
      <BasicSelect
        label={label}
        value={defaultValue}
        options={options}
        handleChange={handleChange}
      />,
    );

    const inputElement = screen.getByRole('combobox');
    userEvent.click(inputElement);

    expect(screen.getAllByText(options[0].value)).toHaveLength(2);
    expect(screen.getByText(options[1].value)).toBeInTheDocument();
    await act(async () => {
      userEvent.click(screen.getByText(options[1].value));
    });
    expect(handleChange).toHaveBeenCalled();
  });
});
