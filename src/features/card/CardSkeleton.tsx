import { Grid2, Skeleton, Stack, Alert, SxProps } from '@mui/material';

type CardSkeletonProps = {
  isError: boolean;
};

const textContainerStyles: SxProps = {
  p: 2,
};

const headerStyles: SxProps = {
  my: 2,
};

export default function CardSkeleton({ isError }: CardSkeletonProps) {
  return (
    <Grid2 container spacing={1}>
      <Grid2 size={5}>
        <Skeleton variant="rectangular" width={250} height={250} />
      </Grid2>
      <Grid2 size={7} sx={textContainerStyles}>
        {isError ? (
          <Alert severity="error" sx={headerStyles}>
            Something went wrong
          </Alert>
        ) : (
          <Skeleton
            variant="rounded"
            width={290}
            height={40}
            sx={headerStyles}
          />
        )}
        <Stack spacing={1}>
          <Skeleton variant="rounded" width={300} height={15} />
          <Skeleton variant="rounded" width={300} height={15} />
          <Skeleton variant="rounded" width={300} height={15} />
          <Skeleton variant="rounded" width={300} height={15} />
          <Skeleton variant="rounded" width={300} height={15} />
        </Stack>
      </Grid2>
    </Grid2>
  );
}
