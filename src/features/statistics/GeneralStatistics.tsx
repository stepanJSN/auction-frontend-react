import { Grid2, SxProps } from '@mui/material';
import StatisticsCard from './StatisticsCard';
import { IGeneralStatistics } from '../../types/statistics.interfaces';

const containerStyles: SxProps = {
  justifyContent: 'center',
};

type GeneralStatisticsProps = {
  data: IGeneralStatistics;
};

export default function GeneralStatistics({ data }: GeneralStatisticsProps) {
  return (
    <Grid2 container spacing={2} sx={containerStyles}>
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
    </Grid2>
  );
}
