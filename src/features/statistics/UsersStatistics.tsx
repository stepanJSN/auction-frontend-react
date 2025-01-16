import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  SxProps,
  SelectChangeEvent,
  Box,
} from '@mui/material';
import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getUsersStatistics,
  selectUsersStatistics,
  setNumberOfUsersInStatistics,
} from './statisticsSlice';
import UserStatisticsTableRow from './UserStatisticsTableRow';
import Select from '../../components/Select';

const tableContainerStyles: SxProps = {
  mb: 1,
};
const selectWrapperStyles: SxProps = {
  mb: 1,
  maxWidth: '200px',
};

const numberOfUsersSelectOptions = [
  { value: '10', label: '10' },
  { value: '20', label: '20' },
  { value: '50', label: '50' },
];

export default function UsersStatistics() {
  const dispatch = useDispatch();
  const { numberOfUsers, data } = useSelector(selectUsersStatistics);

  useEffect(() => {
    dispatch(getUsersStatistics(numberOfUsers));
  }, [dispatch, numberOfUsers]);

  const handleSelect = useCallback(
    (event: SelectChangeEvent) => {
      dispatch(setNumberOfUsersInStatistics(+event.target.value));
    },
    [dispatch],
  );

  return (
    <>
      {data && (
        <>
          <Box sx={selectWrapperStyles}>
            <Select
              label="Number of users"
              value={numberOfUsers.toString()}
              options={numberOfUsersSelectOptions}
              handleChange={handleSelect}
            />
          </Box>
          <TableContainer component={Paper} sx={tableContainerStyles}>
            <Table aria-label="user statistics table">
              <TableHead>
                <TableRow>
                  <TableCell>User</TableCell>
                  <TableCell>Number of cards</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((user) => (
                  <UserStatisticsTableRow
                    key={user.id}
                    name={`${user.name} ${user.surname}`}
                    numberOfInstances={user.numberOfCards}
                  />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}
    </>
  );
}
