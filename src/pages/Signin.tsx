import { Alert, Typography } from '@mui/material';
import AuthFrom from '../features/auth/AuthForm';
import { useSelector } from 'react-redux';
import { selectAuth } from '../features/auth/authSlice';
import { useNavigate } from 'react-router';
import { QueryStatusEnum } from '../enums/queryStatus.enum';
import { useEffect } from 'react';
import { FormWrapper } from '../components/FormWrapper';
import FormLink from '../components/FormLink';
import { ROUTES } from '../config/routesConfig';
import useSignin from '../features/auth/useSignin';
import useErrorMessage from '../hooks/useErrorMessage';
import { signinErrorMessages } from '../features/auth/signinErrorMessages';

export default function Signin() {
  const { status, errorCode } = useSelector(selectAuth);
  const navigate = useNavigate();
  const handleSignin = useSignin();
  const getErrorMessage = useErrorMessage(signinErrorMessages);

  useEffect(() => {
    if (status === QueryStatusEnum.SUCCESS) {
      navigate('/');
    }
  }, [status, navigate]);

  return (
    <FormWrapper>
      <Typography variant="h5" component="h1" align="center" gutterBottom>
        Signin
      </Typography>
      {errorCode && (
        <Alert severity="error">{getErrorMessage(errorCode)}</Alert>
      )}
      <AuthFrom
        onSubmit={handleSignin}
        isLoading={status === QueryStatusEnum.LOADING}></AuthFrom>
      <FormLink to={ROUTES.SIGN_UP}>Sign up</FormLink>
    </FormWrapper>
  );
}
