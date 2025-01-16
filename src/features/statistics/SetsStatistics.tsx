import { useDispatch, useSelector } from 'react-redux';
import {
  getSetsStatistics,
  selectSetsStatistics,
  setSetsStatisticsPage,
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
import Pagination from '../../components/Pagination';
import SetsStatisticsTableRow from './SetsStatisticsTableRow';

const tableContainerStyles: SxProps = {
  mb: 1,
};

export default function SetsStatistics() {
  const dispatch = useDispatch();
  const { data, currentPage, totalPages } = useSelector(selectSetsStatistics);

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
    data && (
      <>
        <TableContainer component={Paper} sx={tableContainerStyles}>
          <Table aria-label="sets statistics table">
            <TableHead>
              <TableRow>
                <TableCell>SetName</TableCell>
                <TableCell>Number of users with this set</TableCell>
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
    )
  );
}
