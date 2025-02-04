import { render, screen, waitFor } from '@testing-library/react';
import Autocomplete from './Autocomplete';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import useQuery from '../hooks/useQuery';
import { QueryStatusEnum } from '../enums/queryStatus.enum';

jest.mock('../hooks/useQuery', () => jest.fn());

describe('Autocomplete Component', () => {
  it('should render the component', () => {
    const label = 'Test Autocomplete';
    (useQuery as jest.Mock).mockReturnValue({
      data: {
        data: [],
        info: {},
      },
      status: QueryStatusEnum.SUCCESS,
    });
    render(
      <Autocomplete
        label={label}
        value={null}
        searchFunc={jest.fn()}
        getLabel={jest.fn()}
        onChange={jest.fn()}
      />,
    );

    expect(screen.getByLabelText(label)).toBeInTheDocument();
  });

  it('should change input value and display search results', async () => {
    const label = 'Test Autocomplete';
    const mockSearchValue = 'option';
    const mockOptions = [
      { label: 'Option 1', value: 'option1' },
      { label: 'Option 2', value: 'option2' },
    ];
    const searchFunc = jest.fn();
    (useQuery as jest.Mock).mockReturnValue({
      data: {
        data: mockOptions,
        info: {},
      },
      status: QueryStatusEnum.SUCCESS,
    });

    render(
      <Autocomplete
        label={label}
        value={null}
        searchFunc={searchFunc}
        getLabel={(item) => item?.label || ''}
        onChange={jest.fn()}
      />,
    );

    const input = screen.getByLabelText(label);
    userEvent.type(input, mockSearchValue);

    await waitFor(() => {
      expect(useQuery).toHaveBeenCalledWith({
        requestFn: searchFunc,
        params: mockSearchValue,
        autoFetch: true,
      });
      expect(screen.getByDisplayValue(mockSearchValue)).toBeInTheDocument();
      expect(screen.getByText(mockOptions[0].label)).toBeInTheDocument();
      expect(screen.getByText(mockOptions[1].label)).toBeInTheDocument();
    });
  });

  it('should call onChange when an option is selected', async () => {
    const label = 'Test Autocomplete';
    const mockSearchValue = 'option';
    const mockOptions = [
      { label: 'Option 1', value: 'option1' },
      { label: 'Option 2', value: 'option2' },
    ];
    const onChange = jest.fn();
    (useQuery as jest.Mock).mockReturnValue({
      data: {
        data: mockOptions,
        info: {},
      },
      status: QueryStatusEnum.SUCCESS,
    });

    render(
      <Autocomplete
        label={label}
        value={null}
        searchFunc={jest.fn()}
        getLabel={(item) => item?.label || ''}
        onChange={onChange}
      />,
    );

    const input = screen.getByLabelText(label);
    userEvent.type(input, mockSearchValue);

    await waitFor(() =>
      expect(screen.getByText(mockOptions[0].label)).toBeInTheDocument(),
    );

    userEvent.click(screen.getByText(mockOptions[0].label));

    expect(onChange).toHaveBeenCalledWith(mockOptions[0]);
    expect(screen.getByDisplayValue(mockOptions[0].label)).toBeInTheDocument();
  });
});
