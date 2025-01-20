import {
  TableContainer as MuiTableContainer,
  Paper,
  SxProps,
} from '@mui/material';
import React from 'react';

const tableContainerStyles: SxProps = {
  mb: 1,
};

type TableContainerProps = {
  children: React.ReactNode;
};

export default function TableContainer({ children }: TableContainerProps) {
  return (
    <MuiTableContainer component={Paper} sx={tableContainerStyles}>
      {children}
    </MuiTableContainer>
  );
}
