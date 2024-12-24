import { useForm } from "react-hook-form";
import { ISingInRequest } from "../../types/authService.interfaces";
import { Box, Button } from "@mui/material";
import FormInput from "../../components/FormInput";

type AuthFormProps = {
  isLoading: boolean;
  onSubmit: (data: ISingInRequest) => void;
}

export default function AuthForm({ isLoading, onSubmit }: AuthFormProps) {
  const { control, handleSubmit } = useForm<ISingInRequest>();


  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ maxWidth: '500px' }}>
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
      <Button
        variant="contained"
        fullWidth
        disabled={isLoading}
        type="submit"
        sx={{ mt: 1 }}
      >
        {isLoading ? "Signing in..." : "Sign In"}
      </Button>
    </Box>
  )
}
