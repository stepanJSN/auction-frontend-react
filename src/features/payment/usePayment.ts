import { useEffect, useState } from 'react';
import useMutation from '../../hooks/useMutation';
import { paymentService } from '../../services/paymentService';

export default function usePayment() {
  const [clientSecret, setClientSecret] = useState<string>();
  const { mutate } = useMutation(() => {
    return paymentService.createPaymentIntent();
  }, false);

  useEffect(() => {
    mutate().then((res) => {
      if (res) {
        setClientSecret(res.clientSecret);
      }
    });
  });

  return clientSecret;
}
