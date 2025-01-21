import { Typography } from '@mui/material';
import ExchangeRateForm from '../features/system/ExchangeRateForm';

export default function SystemSettingsPage() {
  return (
    <>
      <Typography variant="h4" gutterBottom>
        System settings
      </Typography>
      <ExchangeRateForm />
    </>
  );
}
