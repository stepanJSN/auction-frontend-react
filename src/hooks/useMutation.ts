import { useState } from "react";
import { QueryStatusEnum } from "../enums/queryStatus.enum";
import { api } from "../apiConfig";
import { AxiosError } from "axios";
import { ErrorCodesEnum } from "../enums/errorCodes.enum";

export default function useMutation<T>(url: string) {
  const [state, setState] = useState<QueryStatusEnum>(QueryStatusEnum.IDLE);
  const [errorCode, setErrorCode] = useState<number | null>(null);
  async function mutate(data: T) {
    try {
      setState(QueryStatusEnum.LOADING);
      const response = await api.post(url, data);
      setState(QueryStatusEnum.SUCCESS);
      return response.data
    } catch (error) {
      setState(QueryStatusEnum.ERROR);
      setErrorCode((error as AxiosError).status || ErrorCodesEnum.ServerError);
    }
  }

  return { state, mutate, errorCode };
}
