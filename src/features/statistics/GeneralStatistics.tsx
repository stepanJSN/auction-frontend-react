import { Stack } from '@mui/material';
import StatisticsCard from './StatisticsCard';
import { IGeneralStatistics } from '../../types/statistics.interfaces';

type GeneralStatisticsProps = {
  data: IGeneralStatistics;
};

export default function GeneralStatistics({ data }: GeneralStatisticsProps) {
  return (
    <Stack direction="row" spacing={2}>
      <StatisticsCard
        id={data.mostRepeatedCard.id}
        name={data.mostRepeatedCard.name}
        label="Most repeated card"
        number={data.mostRepeatedCard.numberOfInstances}
      />
      <StatisticsCard
        id={data.leastRepeatedCard.id}
        name={data.leastRepeatedCard.name}
        label="Least repeated card"
        number={data.leastRepeatedCard.numberOfInstances}
      />
      <StatisticsCard
        label="Cards created by admin"
        number={data.numberOfCardsCreatedByAdmin}
      />
    </Stack>
  );
}
