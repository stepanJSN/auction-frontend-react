import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { Typography } from '@mui/material';

type FormDateTimePickerProps<T extends FieldValues> = {
  name: Path<T>;
  label: string;
  control: Control<T>;
  required?: boolean;
  disabled?: boolean;
  errorText?: string;
};

export default function FormDateTimePicker<T extends FieldValues>({
  name,
  label,
  control,
  required,
  disabled,
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
            disabled={disabled}
            disablePast
            ampm={false}
            slotProps={{
              textField: {
                color: error ? 'error' : 'primary',
                fullWidth: true,
              },
            }}
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
