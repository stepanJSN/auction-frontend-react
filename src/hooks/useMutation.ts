import { useCallback, useState } from "react";
import { QueryStatusEnum } from "../enums/queryStatus.enum";
import { api } from "../apiConfig";
import { AxiosError } from "axios";
import { ErrorCodesEnum } from "../enums/errorCodes.enum";

export default function useMutation<T>(url: string) {
  const [status, setStatus] = useState<QueryStatusEnum>(QueryStatusEnum.IDLE);
  const [errorCode, setErrorCode] = useState<number | null>(null);
  const mutate = useCallback(async (data: T) => {
    try {
      setStatus(QueryStatusEnum.LOADING);
      const response = await api.post(url, data);
      setStatus(QueryStatusEnum.SUCCESS);
      return response.data
    } catch (error) {
      setStatus(QueryStatusEnum.ERROR);
      setErrorCode((error as AxiosError).status || ErrorCodesEnum.ServerError);
    }
  }, [url]);

  return { status, mutate, errorCode };
}
