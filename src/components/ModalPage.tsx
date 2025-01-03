import { Dialog, IconButton, SxProps } from '@mui/material';
import { useCallback } from 'react';
import { useNavigate } from 'react-router';
import CloseIcon from '@mui/icons-material/Close';

type ModalPageProps = {
  children: React.ReactNode;
};

const closeIconStyles: SxProps = {
  position: 'absolute',
  top: 5,
  right: 5,
  backgroundColor: 'common.white',
};

export default function ModalPage({ children }: ModalPageProps) {
  const navigate = useNavigate();

  const handleClose = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  return (
    <Dialog open maxWidth="lg" onClose={handleClose}>
      <IconButton onClick={handleClose} aria-label="close" sx={closeIconStyles}>
        <CloseIcon />
      </IconButton>
      {children}
    </Dialog>
  );
}
