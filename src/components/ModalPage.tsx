import { Dialog, IconButton, SxProps } from '@mui/material';
import { useCallback } from 'react';
import { useNavigate } from 'react-router';
import CloseIcon from '@mui/icons-material/Close';

type ModalPageProps = {
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  parentPath?: string;
  children: React.ReactNode;
};

const closeIconStyles: SxProps = {
  position: 'absolute',
  top: 5,
  right: 5,
  backgroundColor: 'common.white',
};

export default function ModalPage({
  children,
  maxWidth = 'lg',
  parentPath = '../',
}: ModalPageProps) {
  const navigate = useNavigate();

  const handleClose = useCallback(() => {
    navigate(parentPath);
  }, [navigate, parentPath]);

  return (
    <Dialog open maxWidth={maxWidth} onClose={handleClose}>
      <IconButton onClick={handleClose} aria-label="close" sx={closeIconStyles}>
        <CloseIcon />
      </IconButton>
      {children}
    </Dialog>
  );
}
