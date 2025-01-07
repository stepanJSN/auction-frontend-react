import { useCallback, useState } from 'react';
import { AxiosError } from 'axios';
import { ErrorCodesEnum } from '../enums/errorCodes.enum';
import { MutationStatusEnum } from '../enums/mutationStatus';
import { delay } from '../helpers/delay';

export default function useMutation<T, R = unknown>(
  requestFn: (data: T) => Promise<R> | void,
  resetStatus: boolean = true,
) {
  const [status, setStatus] = useState<MutationStatusEnum>(
    MutationStatusEnum.IDLE,
  );
  const [errorCode, setErrorCode] = useState<number | null>(null);
  const mutate = useCallback(
    async (data: T) => {
      try {
        setStatus(MutationStatusEnum.PENDING);
        const response = await requestFn(data);
        setStatus(MutationStatusEnum.SUCCESS);
        return response;
      } catch (error) {
        setStatus(MutationStatusEnum.ERROR);
        setErrorCode(
          (error as AxiosError).status || ErrorCodesEnum.ServerError,
        );
      } finally {
        if (resetStatus) {
          await delay(2000);
          setStatus(MutationStatusEnum.IDLE);
        }
      }
    },
    [requestFn, resetStatus],
  );

  return { status, mutate, errorCode };
}
