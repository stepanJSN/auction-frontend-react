import { Skeleton, Stack } from '@mui/material';

export default function GeneralStatisticsSkeleton() {
  return (
    <Stack direction="row" spacing={2}>
      <Skeleton variant="rounded" width={200} height={150} />
      <Skeleton variant="rounded" width={200} height={150} />
      <Skeleton variant="rounded" width={200} height={150} />
    </Stack>
  );
}
