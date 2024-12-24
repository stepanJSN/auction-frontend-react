import { Box, Typography } from "@mui/material";
import { Outlet } from "react-router";

export default function AuthLayout() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        padding: 2
      }}
    >
      <Typography 
        sx={{ 
          fontSize: {
            xs: 24,
            md: 32,
          },
          mb: {
            sx: 1,
            md: 2,
          },
          textAlign: 'center'
        }}
      >
        Rick and Morty cards auction
      </Typography>
      <Outlet />
    </Box>
  )
}
