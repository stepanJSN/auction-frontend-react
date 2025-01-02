import { Grid2, GridSize, SelectChangeEvent, SxProps } from '@mui/material';
import BasicSelect from '../../components/Select';
import Switch from '../../components/Switch';
import { UsersSortTypeEnum } from '../../types/user.interfaces';
import { SortOrderEnum } from '../../enums/sortOrder.enum';

type UsersFiltersProps = {
  sortType: UsersSortTypeEnum;
  sortOrder: SortOrderEnum;
  showOnlyAdmins: boolean;
  handleSortTypeChange: (event: SelectChangeEvent) => void;
  handleSortOrderChange: (event: SelectChangeEvent) => void;
  handleShowOnlyAdminsChange: (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => void;
};

const filterContainerStyles: SxProps = {
  mb: 2,
};

const sortColumnsBreakpoints: Record<string, GridSize> = {
  xs: 'auto',
  md: 3,
};

const sortByOptions = [
  { value: UsersSortTypeEnum.CREATION_DATE, label: 'Creation date' },
  { value: UsersSortTypeEnum.RATING, label: 'Rating' },
];

const sortOrderOptions = [
  { value: SortOrderEnum.ASC, label: 'Ascending' },
  { value: SortOrderEnum.DESC, label: 'Descending' },
];

export default function UsersFilters({
  sortType,
  sortOrder,
  showOnlyAdmins,
  handleSortTypeChange,
  handleSortOrderChange,
  handleShowOnlyAdminsChange,
}: UsersFiltersProps) {
  return (
    <Grid2 spacing={1} sx={filterContainerStyles} container>
      <Grid2 size={sortColumnsBreakpoints}>
        <BasicSelect
          label="Sort by"
          value={sortType}
          options={sortByOptions}
          handleChange={handleSortTypeChange}
        />
      </Grid2>
      <Grid2 size={sortColumnsBreakpoints}>
        <BasicSelect
          label="Sort order"
          value={sortOrder}
          options={sortOrderOptions}
          handleChange={handleSortOrderChange}
        />
      </Grid2>
      <Grid2>
        <Switch
          label="Show only admins"
          checked={showOnlyAdmins}
          handleChange={handleShowOnlyAdminsChange}
        />
      </Grid2>
    </Grid2>
  );
}
