import useMutation from '../../hooks/useMutation';
import { paymentService } from '../../services/paymentService';
import { useCallback } from 'react';

export default function useCreateStripeAccount() {
  const { mutate, status: createAccountStatus } = useMutation((_data: null) => {
    return paymentService.createAccount();
  }, false);

  const createAccount = useCallback(async () => {
    const response = await mutate(null);
    if (response) {
      window.location.href = response;
    }
  }, [mutate]);

  return { createAccountStatus, createAccount };
}
