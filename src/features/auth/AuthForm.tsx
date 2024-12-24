import { useForm } from "react-hook-form";
import { ISingInRequest } from "../../types/authService.interfaces";
import { Box } from "@mui/material";
import { LoadingButton } from '@mui/lab';
import FormInput from "../../components/FormInput";

type AuthFormProps = {
  isLoading: boolean;
  onSubmit: (data: ISingInRequest) => void;
}

export default function AuthForm({ isLoading, onSubmit }: AuthFormProps) {
  const { control, handleSubmit } = useForm<ISingInRequest>();


  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
      <FormInput
        name="email"
        label="Email"
        control={control}
        errorText="Incorrect email"
        pattern={/^[^\s@]+@[^\s@]+\.[^\s@]+$/}
      />
      <FormInput
        name="password"
        label="Password"
        control={control}
        errorText="Incorrect password"
        length={{ min: 8, max: 16 }}
        type="password"
      />
      <LoadingButton
        loading={isLoading}
        variant="contained"
        fullWidth
        type="submit"
        loadingPosition="start"
      >
        Sign in
      </LoadingButton>
    </Box>
  )
}
