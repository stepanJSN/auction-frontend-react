import { Typography, Alert } from '@mui/material';
import SignupForm from '../features/users/SignupForm';
import useMutation from '../hooks/useMutation';
import { ICreateUser } from '../types/userService.interfaces';
import { ErrorCodesEnum } from '../enums/errorCodes.enum';
import { useCallback, useMemo } from 'react';
import { FormWrapper } from '../components/FormWrapper';
import FormLink from '../components/FormLink';
import { userService } from '../services/userService';
import { MutationStatusEnum } from '../enums/mutationStatus';
import Link from '../components/Link';
import { ROUTES } from '../config/routesConfig';
import useErrorMessage from '../hooks/useErrorMessage';
import { signupErrorMessages } from '../features/users/signupErrorMessages';

export default function Signup() {
  const { status, errorCode, mutate } = useMutation((data: ICreateUser) => {
    return userService.create(data);
  });
  const getErrorMessage = useErrorMessage(signupErrorMessages);

  const handleSignUp = useCallback(
    (data: ICreateUser) => {
      mutate(data);
    },
    [mutate],
  );

  return (
    <FormWrapper>
      <Typography variant="h5" component="h1" align="center" gutterBottom>
        Signup
      </Typography>
      {status === MutationStatusEnum.ERROR && (
        <Alert severity="error">{getErrorMessage(errorCode)}</Alert>
      )}
      {status === MutationStatusEnum.SUCCESS && (
        <Alert severity="success">
          Registration successful. You can now{' '}
          <Link to={ROUTES.SIGN_IN}>sign in</Link>
        </Alert>
      )}
      <SignupForm status={status} onSubmit={handleSignUp} />
      <FormLink to={ROUTES.SIGN_IN}>Sign in</FormLink>
    </FormWrapper>
  );
}
