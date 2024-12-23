import { Control, Controller } from "react-hook-form";
import TextField from "@mui/material/TextField";
import { IconButton, InputAdornment } from "@mui/material";
import { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";

type FormInputProps = {
  name: string;
  label: string;
  control: Control;
  type?: 'text' | 'password';
  required?: boolean;
  pattern?: RegExp;
  length?: {
    min: number;
    max: number;
  };
}

export default function FormInput({ name, label, control, required, pattern, length, type }: FormInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

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
      render={({
        field: { onChange, value },
        fieldState: { error },
      }) => (
        <TextField
          helperText={error ? error.message : null}
          size="small"
          error={!!error}
          onChange={onChange}
          value={value}
          fullWidth
          label={label}
          variant="outlined"
          type={type}
          slotProps={{
            input: {
              startAdornment: type === 'password' && (
                <InputAdornment position="end">
                  <IconButton
                    aria-label={
                      showPassword ? 'hide the password' : 'display the password'
                    }
                    onClick={handleClickShowPassword}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
        />
      )}
    />
  )
}