import { useCallback, useState } from 'react';
import { paymentService } from '../../services/paymentService';
import useMutation from '../../hooks/useMutation';
import { useNavigate } from 'react-router';
import { ROUTES } from '../../config/routesConfig';

export default function usePayment() {
  const [clientSecret, setClientSecret] = useState<string>();
  const navigate = useNavigate();
  const { mutate, status: topUpStatus } = useMutation(
    (numberOfPoints: number) => {
      return paymentService.createPaymentIntent({ amount: numberOfPoints });
    },
    false,
  );

  const handleTopUp = useCallback(
    async (numberOfPoints: number) => {
      const response = await mutate(numberOfPoints);
      if (response) {
        setClientSecret(response.clientSecret);
        navigate(ROUTES.TOP_UP, { state: { numberOfPoints } });
      }
    },
    [mutate, navigate],
  );

  return { handleTopUp, topUpStatus, clientSecret };
}
