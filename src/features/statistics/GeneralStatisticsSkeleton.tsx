import { Grid2, Skeleton, SxProps } from '@mui/material';

const containerStyles: SxProps = {
  justifyContent: 'center',
};

export default function GeneralStatisticsSkeleton() {
  return (
    <Grid2 container spacing={2} sx={containerStyles}>
      <Skeleton variant="rounded" width={200} height={150} />
      <Skeleton variant="rounded" width={200} height={150} />
      <Skeleton variant="rounded" width={200} height={150} />
    </Grid2>
  );
}
