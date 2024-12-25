import { Alert, Typography } from "@mui/material";
import AuthFrom from "../features/auth/AuthForm";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../redux/store";
import { selectAuth, signin } from "../features/auth/authSlice";
import { ISingInRequest } from "../types/authService.interfaces";
import { Link as RouterLink, useNavigate } from "react-router";
import { QueryStatusEnum } from "../enums/queryStatus.enum";
import { ErrorCodesEnum } from "../enums/errorCodes.enum";
import { useCallback, useEffect, useMemo } from "react";
import { FormWrapper } from "../components/FormWrapper";
import FormLink from "../components/FormLink";

export default function Signin() {
  const dispatch = useDispatch<AppDispatch>();
  const { status, errorCode } = useSelector(selectAuth);
  const navigate = useNavigate();

  const getErrorMessage = (errorCode: number) => {
    switch (errorCode) {
      case ErrorCodesEnum.Unauthorized:
        return 'Incorrect email or password'
      default:
        return 'Something went wrong'
    }
  }
  const errorMessage = useMemo(() => getErrorMessage(errorCode!), [errorCode]);

  const handleSignin = useCallback((data: ISingInRequest) => {
    dispatch(signin(data))
  }, [dispatch]);

  useEffect(() => {
    if (status === QueryStatusEnum.SUCCESS) {
      navigate('/');
    }
  }, [status, navigate]);

  return (
    <FormWrapper>
      <Typography 
        variant="h5"
        component="h1"
        align="center"
        gutterBottom
      >
        Signin
      </Typography>
      {errorCode && <Alert severity="error">{errorMessage}</Alert>}
      <AuthFrom onSubmit={handleSignin} isLoading={status === QueryStatusEnum.LOADING}></AuthFrom>
      <FormLink
        component={RouterLink} 
        to="/signup"
      >
        Sign up
      </FormLink>
    </FormWrapper>
  )
}
