import { AxiosError } from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { ErrorCodesEnum } from '../enums/errorCodes.enum';
import { QueryStatusEnum } from '../enums/queryStatus.enum';

export default function useQuery<T, R = unknown>(
  requestFn: (data: T) => Promise<R>,
  params: T,
  autoFetch: boolean = true,
) {
  const [status, setStatus] = useState<QueryStatusEnum>(QueryStatusEnum.IDLE);
  const [errorCode, setErrorCode] = useState<ErrorCodesEnum | null>(null);
  const [data, setData] = useState<R | null>(null);

  const execute = useCallback(
    async (requestData: T) => {
      setStatus(QueryStatusEnum.LOADING);
      setErrorCode(null);
      setData(null);

      try {
        const response = await requestFn(requestData);
        setData(response);
        setStatus(QueryStatusEnum.SUCCESS);
      } catch (error) {
        const axiosError = error as AxiosError;
        setErrorCode(axiosError.response?.status || ErrorCodesEnum.ServerError);
        setStatus(QueryStatusEnum.ERROR);
      }
    },
    [requestFn],
  );

  useEffect(() => {
    if (autoFetch) execute(params);
  }, [params, execute, autoFetch]);

  return { status, errorCode, data, execute };
}
