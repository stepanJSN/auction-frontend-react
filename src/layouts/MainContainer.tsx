import { Box, Container } from '@mui/material';

type MainContainerProps = {
  children: React.ReactNode;
};

const boxStyles = {
  backgroundColor: 'primary.main',
};

export default function MainContainer({ children }: MainContainerProps) {
  return (
    <Box sx={boxStyles}>
      <Container>{children}</Container>
    </Box>
  );
}
