import { Button } from '@mui/material';
import { useCallback } from 'react';

type RemoveCardButtonProps = {
  index: number;
  remove: (index: number) => void;
};

export default function RemoveCardButton({
  index,
  remove,
}: RemoveCardButtonProps) {
  const onClick = useCallback(() => remove(index), [index, remove]);
  return (
    <Button size="small" color="error" onClick={onClick}>
      Remove from set
    </Button>
  );
}
