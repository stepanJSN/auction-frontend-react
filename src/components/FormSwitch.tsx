import { useCallback } from 'react';
import {
  Control,
  Controller,
  ControllerRenderProps,
  FieldValues,
  Path,
  PathValue,
} from 'react-hook-form';
import Switch from './Switch';

export type FormSwitchProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  label: string;
  required?: boolean;
  defaultValue: PathValue<T, Path<T>>;
};

export default function FormSwitch<T extends FieldValues>({
  name,
  control,
  label,
  defaultValue,
}: FormSwitchProps<T>) {
  const render = useCallback(
    ({
      field: { onChange, value },
    }: {
      field: ControllerRenderProps<T, Path<T>>;
    }) => <Switch checked={value} handleChange={onChange} label={label} />,
    [label],
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
