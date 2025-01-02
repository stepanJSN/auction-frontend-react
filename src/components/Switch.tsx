import { useMemo } from 'react';
import { FormControlLabel, Switch as MuiSwitch } from '@mui/material';

type SwitchProps = {
  label: string;
  checked: boolean;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function Switch({ checked, handleChange, label }: SwitchProps) {
  const control = useMemo(
    () => <MuiSwitch checked={checked} onChange={handleChange} />,
    [checked, handleChange],
  );
  return <FormControlLabel control={control} label={label} />;
}
