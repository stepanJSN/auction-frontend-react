import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import { IconButton, InputAdornment } from '@mui/material';
import { useCallback, useState } from 'react';
import { Visibility, VisibilityOff } from '@mui/icons-material';

type FormInputProps<T extends FieldValues> = {
  name: Path<T>;
  label: string;
  control: Control<T>;
  type?: 'text' | 'password';
  errorText?: string;
  required?: boolean;
  pattern?: RegExp;
  placeholder?: string;
  length?: {
    min: number;
    max: number;
  };
};

export default function FormInput<T extends FieldValues>({
  name,
  label,
  control,
  required,
  errorText,
  pattern,
  length,
  type,
  placeholder,
}: FormInputProps<T>) {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = useCallback(() => {
    setShowPassword(!showPassword);
  }, [setShowPassword, showPassword]);

  return (
    <Controller
      name={name}
      control={control}
      rules={{
        required,
        pattern,
        minLength: length?.min,
        maxLength: length?.max,
      }}
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
          margin="dense"
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
