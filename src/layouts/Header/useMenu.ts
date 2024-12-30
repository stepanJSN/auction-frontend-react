import { useCallback, useState } from 'react';

export default function useMenu() {
  const [anchorMenuEl, setAnchorMenuEl] = useState<null | HTMLElement>(null);
  const isMenuOpen = Boolean(anchorMenuEl);

  const handleMenuClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorMenuEl(event.currentTarget);
    },
    [],
  );
  const handleMenuClose = useCallback(() => {
    setAnchorMenuEl(null);
  }, []);

  return {
    anchorMenuEl,
    isMenuOpen,
    handleMenuClick,
    handleMenuClose,
  };
}
