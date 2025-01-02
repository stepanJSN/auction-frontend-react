import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

type BasicSelectProps = {
  label: string;
  value: string;
  handleChange: (event: SelectChangeEvent) => void;
  options: {
    value: string;
    label: string;
  }[];
};

export default function BasicSelect({
  label,
  value,
  handleChange,
  options,
}: BasicSelectProps) {
  return (
    <FormControl fullWidth size="small">
      <InputLabel id={`${label}-label`}>{label}</InputLabel>
      <Select
        labelId={`${label}-label`}
        id={label}
        value={value}
        label={label}
        onChange={handleChange}>
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
