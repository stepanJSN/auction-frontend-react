import { Stack, Pagination as MuiPagination, SxProps } from '@mui/material';

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  handleChange: (event: React.ChangeEvent<unknown>, value: number) => void;
};

const paginationContainerStyles: SxProps = {
  mt: 2,
};

export default function Pagination({
  currentPage,
  totalPages,
  handleChange,
}: PaginationProps) {
  return (
    <Stack alignItems="center" sx={paginationContainerStyles}>
      <MuiPagination
        count={totalPages}
        page={currentPage}
        onChange={handleChange}
      />
    </Stack>
  );
}
