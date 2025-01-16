import { Stack, Tab, Tabs, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import {
  getGeneralStatistics,
  selectGeneralStatistics,
  setSelectedTab,
  StatisticsTabs,
} from '../features/statistics/statisticsSlice';
import CardStatistics from '../features/statistics/CardStatistics';
import { useCallback, useEffect } from 'react';
import UsersStatistics from '../features/statistics/UsersStatistics';
import CardsStatistics from '../features/statistics/CardsStatistics';
import SetsStatistics from '../features/statistics/SetsStatistics';

export default function StatisticsPage() {
  const dispatch = useDispatch();
  const { general, selectedTab } = useSelector(selectGeneralStatistics);

  useEffect(() => {
    dispatch(getGeneralStatistics());
  }, [dispatch]);

  const handleTabChange = useCallback(
    (_event: React.SyntheticEvent, newValue: StatisticsTabs) => {
      dispatch(setSelectedTab(newValue));
    },
    [dispatch],
  );

  return (
    <>
      <Typography variant="h4" gutterBottom>
        Statistics
      </Typography>
      {general.data && (
        <Stack direction="row" spacing={2}>
          <CardStatistics
            id={general.data.mostRepeatedCard.id}
            name={general.data.mostRepeatedCard.name}
            label="Most repeated card"
            number={general.data.mostRepeatedCard.numberOfInstances}
          />
          <CardStatistics
            id={general.data.leastRepeatedCard.id}
            name={general.data.leastRepeatedCard.name}
            label="Least repeated card"
            number={general.data.leastRepeatedCard.numberOfInstances}
          />
          <CardStatistics
            label="Cards created by admin"
            number={general.data.numberOfCardsCreatedByAdmin}
          />
        </Stack>
      )}
      <Tabs
        value={selectedTab}
        onChange={handleTabChange}
        aria-label="statistics tabs">
        <Tab label="Cards" value={StatisticsTabs.CARDS} />
        <Tab label="Sets" value={StatisticsTabs.SETS} />
        <Tab label="Top users" value={StatisticsTabs.USERS} />
      </Tabs>
      {selectedTab === StatisticsTabs.USERS && <UsersStatistics />}
      {selectedTab === StatisticsTabs.CARDS && <CardsStatistics />}
      {selectedTab === StatisticsTabs.SETS && <SetsStatistics />}
    </>
  );
}
