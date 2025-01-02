/* eslint-disable @arthurgeron/react-usememo/require-usememo */
import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import Autocomplete from './Autocomplete';
import { IPagination } from '../types/pagination.interface';

type FormAutocompleteProps<T extends FieldValues, R> = {
  name: Path<T>;
  label: string;
  control: Control<T>;
  startFromLetter?: number;
  searchFunc: (
    searchValue: string,
  ) => Promise<{ data: Array<R>; info: IPagination }>;
  getLabel: (item: R | null) => string;
  errorText: string;
  noOptionsText?: string;
  required?: boolean;
};

export default function FormAutocomplete<T extends FieldValues, R>({
  name,
  label,
  control,
  searchFunc,
  getLabel,
  startFromLetter = 0,
  noOptionsText,
  errorText,
  required = false,
}: FormAutocompleteProps<T, R>) {
  return (
    <Controller
      name={name}
      control={control}
      rules={{
        required,
      }}
      render={({
        field: { onChange, value = null },
        fieldState: { error },
      }) => (
        <Autocomplete
          label={label}
          value={value}
          onChange={onChange}
          searchFunc={searchFunc}
          getLabel={getLabel}
          isError={!!error}
          errorText={errorText}
          startFromLetter={startFromLetter}
          noOptionsText={noOptionsText}
        />
      )}
    />
  );
}
