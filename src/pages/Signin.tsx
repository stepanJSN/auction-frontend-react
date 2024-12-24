import { Alert, Box, Link, Typography } from "@mui/material";
import AuthFrom from "../features/auth/AuthForm";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../redux/store";
import { selectAuth, signin } from "../features/auth/authSlice";
import { ISingInRequest } from "../types/authService.interfaces";
import { Link as RouterLink, useNavigate } from "react-router";

export default function Signin() {
  const dispatch = useDispatch<AppDispatch>();
  const { status, errorCode } = useSelector(selectAuth);
  const navigate = useNavigate();


  const getErrorMessage = (errorCode: number) => {
    switch (errorCode) {
      case 401:
        return 'Incorrect email or password'
      default:
        return 'Something went wrong'
    }
  }

  const handleSignin = (data: ISingInRequest) => {
    dispatch(signin(data))
  }

  if (status === "success") {
    navigate('/');
  }

  return (
    <Box
      sx={{
        border: '1px solid #ccc',
        borderRadius: '10px',
        padding: '20px',
      }}
    >
      <Typography 
        variant="h5"
        component="h1"
        align="center"
        gutterBottom
      >
        Signin
      </Typography>
      {errorCode && <Alert severity="error">{getErrorMessage(errorCode)}</Alert>}
      <AuthFrom onSubmit={handleSignin} isLoading={status === 'loading'}></AuthFrom>
      <Link
        component={RouterLink} 
        to="/signup"
        sx={{
          display: "block",
          textAlign: "center",
          mt: 1
        }}
      >
        Sign up
      </Link>
    </Box>
  )
}