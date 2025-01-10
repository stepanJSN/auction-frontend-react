import {
  Control,
  Controller,
  FieldValues,
  Path,
  RegisterOptions,
} from 'react-hook-form';
import TextField from '@mui/material/TextField';
import { IconButton, InputAdornment } from '@mui/material';
import { useCallback, useState } from 'react';
import { Visibility, VisibilityOff } from '@mui/icons-material';

type FormInputProps<T extends FieldValues> = {
  name: Path<T>;
  label: string;
  control: Control<T>;
  type?: 'text' | 'password' | 'number';
  margin?: 'dense' | 'normal' | 'none';
  errorText?: string;
  placeholder?: string;
  disabled?: boolean;
  rules?: Omit<
    RegisterOptions<T>,
    'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'
  >;
};

export default function FormInput<T extends FieldValues>({
  name,
  label,
  control,
  errorText,
  rules,
  type,
  margin = 'dense',
  placeholder,
  disabled,
}: FormInputProps<T>) {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = useCallback(() => {
    setShowPassword(!showPassword);
  }, [setShowPassword, showPassword]);

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <TextField
          helperText={error ? errorText : null}
          size="small"
          error={!!error}
          onChange={onChange}
          value={value ?? ''}
          fullWidth
          label={label}
          placeholder={placeholder}
          disabled={disabled}
          margin={margin}
          variant="outlined"
          type={type === 'password' && showPassword ? 'text' : type}
          slotProps={{
            input: {
              endAdornment: type === 'password' && (
                <InputAdornment position="end">
                  <IconButton
                    aria-label={
                      showPassword
                        ? 'hide the password'
                        : 'display the password'
                    }
                    onClick={handleClickShowPassword}>
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
        />
      )}
    />
  );
}
