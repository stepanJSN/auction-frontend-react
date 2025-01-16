import { useDispatch, useSelector } from 'react-redux';
import {
  getCardsStatistics,
  selectCardsStatistics,
  setCardsStatisticsPage,
} from './statisticsSlice';
import { useCallback, useEffect } from 'react';
import {
  Paper,
  SxProps,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import CardsStatisticsTableRow from './CardsStatisticsTableRow';
import Pagination from '../../components/Pagination';

const tableContainerStyles: SxProps = {
  mb: 1,
};

export default function CardsStatistics() {
  const dispatch = useDispatch();
  const { data, currentPage, totalPages } = useSelector(selectCardsStatistics);

  useEffect(() => {
    dispatch(getCardsStatistics(currentPage));
  }, [dispatch, currentPage]);

  const handlePageChange = useCallback(
    (_event: React.ChangeEvent<unknown>, value: number) => {
      dispatch(setCardsStatisticsPage(value));
    },
    [dispatch],
  );

  return (
    data && (
      <>
        <TableContainer component={Paper} sx={tableContainerStyles}>
          <Table aria-label="users statistics table">
            <TableHead>
              <TableRow>
                <TableCell>CardName</TableCell>
                <TableCell>Number of instances</TableCell>
                <TableCell>Average price</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((card) => (
                <CardsStatisticsTableRow
                  key={card.id}
                  cardName={card.cardName}
                  numberOfInstances={card.numberOfInstances}
                  averagePrice={card.averagePrice}
                />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          handleChange={handlePageChange}
        />
      </>
    )
  );
}
