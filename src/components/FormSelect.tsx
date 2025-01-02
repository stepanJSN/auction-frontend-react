import {
  Control,
  Controller,
  FieldValues,
  Path,
  PathValue,
} from 'react-hook-form';
import BasicSelect from './Select';

type FormSelectProps<T extends FieldValues> = {
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
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field: { onChange, value } }) => (
        <BasicSelect
          options={options}
          label={label}
          value={value}
          handleChange={onChange}
        />
      )}
    />
  );
}
