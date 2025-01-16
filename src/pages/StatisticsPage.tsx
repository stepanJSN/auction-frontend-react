import { Tab, Tabs, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import {
  getGeneralStatistics,
  selectGeneralStatistics,
  setSelectedTab,
  StatisticsTabs,
} from '../features/statistics/statisticsSlice';
import { useCallback, useEffect } from 'react';
import UsersStatistics from '../features/statistics/UsersStatistics';
import CardsStatistics from '../features/statistics/CardsStatistics';
import SetsStatistics from '../features/statistics/SetsStatistics';
import GeneralStatistics from '../features/statistics/GeneralStatistics';
import GeneralStatisticsSkeleton from '../features/statistics/GeneralStatisticsSkeleton';
import { QueryStatusEnum } from '../enums/queryStatus.enum';
import PageError from '../components/PageError';

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
      {general.status === QueryStatusEnum.SUCCESS && (
        <GeneralStatistics data={general.data!} />
      )}
      {general.status === QueryStatusEnum.LOADING && (
        <GeneralStatisticsSkeleton />
      )}
      {general.status === QueryStatusEnum.ERROR && <PageError />}
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
