import { render, screen, waitFor } from '@testing-library/react';
import Autocomplete from './Autocomplete';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import useQuery from '../hooks/useQuery';
import { QueryStatusEnum } from '../enums/queryStatus.enum';
import { FieldValues, useForm } from 'react-hook-form';
import FormAutocomplete, { FormAutocompleteProps } from './FormAutocomplete';
import { useEffect } from 'react';

jest.mock('../hooks/useQuery', () => jest.fn());

const FormAutocompleteWithForm = <T extends FieldValues, R>(
  props: Omit<FormAutocompleteProps<T, R>, 'control'> & { isError?: boolean },
) => {
  const { control, setError } = useForm<T>();

  useEffect(() => {
    if (props.isError) {
      setError(props.name, { type: 'required' });
    }
  });

  return <FormAutocomplete {...props} control={control} />;
};

describe('FormAutocomplete Component', () => {
  it('should render the component', async () => {
    const label = 'Test Autocomplete';
    (useQuery as jest.Mock).mockReturnValue({
      data: {
        data: [],
        info: {},
      },
      status: QueryStatusEnum.SUCCESS,
    });
    render(
      <FormAutocompleteWithForm
        name="autocomplete"
        label={label}
        searchFunc={jest.fn()}
        getLabel={jest.fn()}
        errorText="Error"
      />,
    );

    await waitFor(() =>
      expect(screen.getByLabelText(label)).toBeInTheDocument(),
    );
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
      <FormAutocompleteWithForm
        name="autocomplete"
        label={label}
        searchFunc={searchFunc}
        getLabel={(item) => item?.label || ''}
        errorText="Error"
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
