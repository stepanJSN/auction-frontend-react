import { useMemo, useCallback } from 'react';
import {
  Control,
  Controller,
  ControllerFieldState,
  ControllerRenderProps,
  FieldValues,
  Path,
} from 'react-hook-form';
import Autocomplete from './Autocomplete';
import { IPagination } from '../types/pagination.interface';

export type FormAutocompleteProps<T extends FieldValues, R> = {
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
  const rules = useMemo(
    () => ({
      required,
    }),
    [required],
  );
  const render = useCallback(
    ({
      field: { onChange, value },
      fieldState: { error },
    }: {
      field: ControllerRenderProps<T, Path<T>>;
      fieldState: ControllerFieldState;
    }) => (
      <Autocomplete
        label={label}
        value={value ?? null}
        onChange={onChange}
        searchFunc={searchFunc}
        getLabel={getLabel}
        isError={!!error}
        errorText={errorText}
        startFromLetter={startFromLetter}
        noOptionsText={noOptionsText}
      />
    ),
    [errorText, getLabel, label, noOptionsText, searchFunc, startFromLetter],
  );
  return (
    <Controller name={name} control={control} rules={rules} render={render} />
  );
}
