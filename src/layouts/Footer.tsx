import { SxProps, Typography } from '@mui/material';
import MainContainer from './MainContainer';

const typographyStyles: SxProps = {
  color: 'common.white',
  py: 1,
};

export default function Footer() {
  return (
    <MainContainer>
      <Typography textAlign="center" sx={typographyStyles}>
        Rick and Morty cards auction | 2024
      </Typography>
    </MainContainer>
  );
}
