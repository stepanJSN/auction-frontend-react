import { useMediaQuery, useTheme } from '@mui/material';
import { useCallback, useState } from 'react';

export default function useFilterVisibility() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const theme = useTheme();
  const isMobileVersion = useMediaQuery(theme.breakpoints.down('md'));
  const handleFilterClose = useCallback(() => {
    setIsFilterOpen(false);
  }, []);

  const handleFilterOpen = useCallback(() => {
    setIsFilterOpen(true);
  }, []);

  return {
    isFilterOpen: isMobileVersion ? isFilterOpen : true,
    isMobileVersion,
    handleFilterOpen,
    handleFilterClose,
  };
}
