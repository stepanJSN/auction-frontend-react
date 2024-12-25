import { Typography, Alert, Link } from "@mui/material";
import { Link as RouterLink } from "react-router";
import { QueryStatusEnum } from "../enums/queryStatus.enum";
import SignupForm from "../features/users/SignupForm";
import useMutation from "../hooks/useMutation";
import { ICreateUser } from "../types/userService.interfaces";
import { ErrorCodesEnum } from "../enums/errorCodes.enum";
import { useCallback, useMemo } from "react";
import { FormWrapper } from "../components/FormWrapper";
import FormLink from "../components/FormLink";

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
  const errorMessage = useMemo(() => getErrorMessage(errorCode!), [errorCode]);

  const handleSignUp = useCallback((data: ICreateUser) => {
    mutate(data);
  }, [mutate]);

  return (
    <FormWrapper>
      <Typography 
        variant="h5"
        component="h1"
        align="center"
        gutterBottom
      >
        Signup
      </Typography>
      {status === QueryStatusEnum.ERROR && <Alert severity="error">{errorMessage}</Alert>}
      {status === QueryStatusEnum.SUCCESS && 
        <Alert severity="success">
          Registration successful. You can now <Link component={RouterLink} to="/signin">sign in</Link>
        </Alert>
      }
      <SignupForm isLoading={status === QueryStatusEnum.LOADING} onSubmit={handleSignUp} />
      <FormLink
        component={RouterLink} 
        to="/signin"
      >
        Sign in
      </FormLink>
    </FormWrapper>
  )
}
