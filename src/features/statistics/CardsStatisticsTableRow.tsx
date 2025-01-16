import { SxProps, TableCell, TableRow } from '@mui/material';

const rowStyles: SxProps = {
  '&:last-child td, &:last-child th': { border: 0 },
};

type CardsStatisticsTableRowProps = {
  cardName: string;
  numberOfInstances: number;
  averagePrice: number;
};

export default function CardsStatisticsTableRow({
  cardName,
  numberOfInstances,
  averagePrice,
}: CardsStatisticsTableRowProps) {
  return (
    <TableRow sx={rowStyles}>
      <TableCell component="th" scope="row">
        {cardName}
      </TableCell>
      <TableCell>{numberOfInstances}</TableCell>
      <TableCell>{averagePrice}</TableCell>
    </TableRow>
  );
}
