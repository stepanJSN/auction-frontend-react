import { useCallback } from 'react';
import {
  Control,
  Controller,
  ControllerRenderProps,
  FieldValues,
  Path,
  PathValue,
} from 'react-hook-form';
import BasicSelect from './Select';

export type FormSelectProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  label: string;
  required?: boolean;
  defaultValue: PathValue<T, Path<T>>;
  options: Array<{ value: string; label: string }>;
};

export default function FormSelect<T extends FieldValues>({
  name,
  control,
  label,
  defaultValue,
  options,
}: FormSelectProps<T>) {
  const render = useCallback(
    ({
      field: { onChange, value },
    }: {
      field: ControllerRenderProps<T, Path<T>>;
    }) => (
      <BasicSelect
        options={options}
        label={label}
        value={value}
        handleChange={onChange}
      />
    ),
    [label, options],
  );
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={render}
    />
  );
}
