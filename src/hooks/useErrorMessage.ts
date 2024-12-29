import { useCallback } from 'react';
export default function useErrorMessage(
  errorMessagesList: Record<number, string>,
) {
  const getErrorMessage = useCallback(
    (errorCode: number | null) => {
      if (!errorCode) return null;
      return errorMessagesList[errorCode] || 'Something went wrong';
    },
    [errorMessagesList],
  );

  return getErrorMessage;
}
