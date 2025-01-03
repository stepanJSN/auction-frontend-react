import {
  TextField,
  Autocomplete as MuiAutocomplete,
  AutocompleteRenderInputParams,
} from '@mui/material';
import { useDebounceValue } from 'usehooks-ts';
import useQuery from '../hooks/useQuery';
import { QueryStatusEnum } from '../enums/queryStatus.enum';
import { IPagination } from '../types/pagination.interface';
import { useCallback } from 'react';

type AutocompleteProps<T> = {
  label: string;
  value: T;
  startFromLetter?: number;
  searchFunc: (
    searchValue: string,
  ) => Promise<{ data: Array<T>; info: IPagination }>;
  getLabel: (item: T | null) => string;
  onChange: (item: T | null) => void;
  isError: boolean;
  errorText: string;
  noOptionsText?: string;
};

export default function Autocomplete<T>({
  label,
  searchFunc,
  value,
  startFromLetter = 0,
  getLabel,
  onChange,
  isError,
  errorText,
  noOptionsText,
}: AutocompleteProps<T>) {
  const [searchValue, setSearchValue] = useDebounceValue('', 500);

  const { data, status } = useQuery({
    requestFn: searchFunc,
    params: searchValue,
    autoFetch: searchValue.length >= startFromLetter,
  });

  const handleChange = useCallback(
    (_event: React.SyntheticEvent, newValue: T | null) => {
      onChange(newValue);
    },
    [onChange],
  );

  const handleInputChange = useCallback(
    (_event: React.SyntheticEvent, value: string) => {
      setSearchValue(value);
    },
    [setSearchValue],
  );

  const renderInput = useCallback(
    (params: AutocompleteRenderInputParams) => (
      <TextField
        {...params}
        label={label}
        error={isError}
        helperText={isError ? errorText : null}
      />
    ),
    [errorText, isError, label],
  );

  return (
    <MuiAutocomplete
      disablePortal
      options={data ? data.data : []}
      size="small"
      getOptionLabel={getLabel}
      value={value}
      loading={status === QueryStatusEnum.LOADING}
      noOptionsText={noOptionsText ?? null}
      onChange={handleChange}
      onInputChange={handleInputChange}
      renderInput={renderInput}
    />
  );
}
