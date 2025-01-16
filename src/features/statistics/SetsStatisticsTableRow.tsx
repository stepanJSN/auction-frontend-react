import { SxProps, TableCell, TableRow } from '@mui/material';

const rowStyles: SxProps = {
  '&:last-child td, &:last-child th': { border: 0 },
};

type SetsStatisticsTableRowProps = {
  name: string;
  numberOfUsers: number;
};

export default function SetsStatisticsTableRow({
  name,
  numberOfUsers,
}: SetsStatisticsTableRowProps) {
  return (
    <TableRow sx={rowStyles}>
      <TableCell component="th" scope="row">
        {name}
      </TableCell>
      <TableCell>{numberOfUsers}</TableCell>
    </TableRow>
  );
}
