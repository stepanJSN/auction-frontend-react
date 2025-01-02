import {
  Control,
  Controller,
  FieldValues,
  Path,
  PathValue,
} from 'react-hook-form';
import Switch from './Switch';

type FormSwitchProps<T extends FieldValues> = {
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
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field: { onChange, value } }) => (
        <Switch checked={value} handleChange={onChange} label={label} />
      )}
    />
  );
}
