import { Box, Typography, Alert, Link } from "@mui/material";
import { Link as RouterLink } from "react-router";
import { QueryStatusEnum } from "../enums/queryStatus.enum";
import SignupForm from "../features/users/SignupForm";
import useMutation from "../hooks/useMutation";
import { ICreateUser } from "../types/userService.interfaces";
import { ErrorCodesEnum } from "../enums/errorCodes.enum";

export default function Signup() {
  const { status, errorCode, mutate } = useMutation('/users');

  const getErrorMessage = (errorCode: number) => {
    switch (errorCode) {
      case ErrorCodesEnum.Conflict:
        return 'User with this email already exists'
      default:
        return 'Something went wrong'
    }
  }

  const handleSignUp = (data: ICreateUser) => {
    mutate(data);
  }

  return (
    <Box
      sx={{
        border: '1px solid #ccc',
        borderRadius: 3,
        padding: 2,
      }}
    >
      <Typography 
        variant="h5"
        component="h1"
        align="center"
        gutterBottom
      >
        Signup
      </Typography>
      {status === QueryStatusEnum.ERROR && <Alert severity="error">{getErrorMessage(errorCode!)}</Alert>}
      {status === QueryStatusEnum.SUCCESS && 
        <Alert severity="success">
          Registration successful. You can now <Link component={RouterLink} to="/signin">sign in</Link>
        </Alert>
      }
      <SignupForm isLoading={status === QueryStatusEnum.LOADING} onSubmit={handleSignUp} />
      <Link
        component={RouterLink} 
        to="/signin"
        sx={{
          display: "block",
          textAlign: "center",
          mt: 1
        }}
      >
        Sign in
      </Link>
    </Box>
  )
}
