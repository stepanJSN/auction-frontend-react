import { useDispatch, useSelector } from 'react-redux';
import {
  getCardsStatistics,
  selectCardsStatistics,
  setCardsStatisticsPage,
} from './statisticsSlice';
import { useCallback, useEffect } from 'react';
import {
  LinearProgress,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material';
import CardsStatisticsTableRow from './CardsStatisticsTableRow';
import Pagination from '../../components/Pagination';
import { QueryStatusEnum } from '../../enums/queryStatus.enum';
import PageError from '../../components/PageError';
import { LinearProgressPlaceholder } from '../../components/LinearProgressPlaceholder';
import TableContainer from '../../components/TableContainer';

export default function CardsStatistics() {
  const dispatch = useDispatch();
  const { data, currentPage, totalPages, status } = useSelector(
    selectCardsStatistics,
  );

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
    <>
      {status === QueryStatusEnum.LOADING && <LinearProgress />}
      {status === QueryStatusEnum.ERROR && <PageError />}
      {status === QueryStatusEnum.SUCCESS && <LinearProgressPlaceholder />}
      {data && (
        <>
          <TableContainer>
            <Table aria-label="cards statistics table">
              <TableHead>
                <TableRow>
                  <TableCell>CardName</TableCell>
                  <TableCell align="center">Number of instances</TableCell>
                  <TableCell align="center">Average price</TableCell>
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
      )}
    </>
  );
}
