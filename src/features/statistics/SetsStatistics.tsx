import { useDispatch, useSelector } from 'react-redux';
import {
  getSetsStatistics,
  selectSetsStatistics,
  setSetsStatisticsPage,
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
import Pagination from '../../components/Pagination';
import SetsStatisticsTableRow from './SetsStatisticsTableRow';
import PageError from '../../components/PageError';
import { QueryStatusEnum } from '../../enums/queryStatus.enum';
import { LinearProgressPlaceholder } from '../../components/LinearProgressPlaceholder';
import TableContainer from '../../components/TableContainer';

export default function SetsStatistics() {
  const dispatch = useDispatch();
  const { data, currentPage, totalPages, status } =
    useSelector(selectSetsStatistics);

  useEffect(() => {
    dispatch(getSetsStatistics(currentPage));
  }, [dispatch, currentPage]);

  const handlePageChange = useCallback(
    (_event: React.ChangeEvent<unknown>, value: number) => {
      dispatch(setSetsStatisticsPage(value));
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
            <Table aria-label="sets statistics table">
              <TableHead>
                <TableRow>
                  <TableCell>SetName</TableCell>
                  <TableCell align="center">
                    Number of users with this set
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((set) => (
                  <SetsStatisticsTableRow
                    key={set.id}
                    name={set.setName}
                    numberOfUsers={set.numberOfUsers}
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
