import { Box, Button } from "@mui/material";
import { useForm } from "react-hook-form";
import FormInput from "../../components/FormInput";
import { ICreateUser } from "../../types/userService.interfaces";

type SignupFormProps = {
  isLoading: boolean;
  onSubmit: (data: ICreateUser) => void;
}

export default function SignupForm({ isLoading, onSubmit }: SignupFormProps) {
  const { control, handleSubmit } = useForm<ICreateUser>();

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ maxWidth: '500px' }}>
      <FormInput
        name="email"
        label="Email"
        control={control}
        errorText="Incorrect email"
        required
        pattern={/^[^\s@]+@[^\s@]+\.[^\s@]+$/}
      />
      <FormInput
        name="name"
        label="Name"
        control={control}
        errorText="The name must be between 2 and 15 characters long"
        required
        length={{ min: 2, max: 15 }}
      />
      <FormInput
        name="surname"
        label="Surname"
        control={control}
        errorText="The surname must be between 2 and 15 characters long"
        required
        length={{ min: 2, max: 15 }}
      />
      <FormInput
        name="password"
        label="Password"
        control={control}
        errorText="The password must be between 8 and 16 characters long"
        required
        length={{ min: 8, max: 16 }}
      />
      <Button
        variant="contained"
        fullWidth
        disabled={isLoading}
        type="submit"
        sx={{ mt: 1 }}
      >
        {isLoading ? "Signing up..." : "Sign up"}
      </Button>
    </Box>
  )
}
