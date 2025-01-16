import { SxProps, TableCell, TableRow } from '@mui/material';

const rowStyles: SxProps = {
  '&:last-child td, &:last-child th': { border: 0 },
};

type UserStatisticsTableRowProps = {
  name: string;
  numberOfInstances: number;
};

export default function UserStatisticsTableRow({
  name,
  numberOfInstances,
}: UserStatisticsTableRowProps) {
  return (
    <TableRow sx={rowStyles}>
      <TableCell component="th" scope="row">
        {name}
      </TableCell>
      <TableCell>{numberOfInstances}</TableCell>
    </TableRow>
  );
}
