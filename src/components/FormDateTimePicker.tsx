/* eslint-disable @arthurgeron/react-usememo/require-usememo */
import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { Typography } from '@mui/material';

type FormDateTimePickerProps<T extends FieldValues> = {
  name: Path<T>;
  label: string;
  control: Control<T>;
  required?: boolean;
  errorText?: string;
};

export default function FormDateTimePicker<T extends FieldValues>({
  name,
  label,
  control,
  required,
  errorText,
}: FormDateTimePickerProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      rules={{
        required,
      }}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <>
          <DateTimePicker
            label={label}
            value={value ?? null}
            onChange={onChange}
            disablePast
          />
          {error && errorText && (
            <Typography color="error" variant="subtitle2">
              {errorText}
            </Typography>
          )}
        </>
      )}
    />
  );
}
