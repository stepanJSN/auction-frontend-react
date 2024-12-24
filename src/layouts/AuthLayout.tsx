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
      }}
    >
      <Typography variant="h4" mb={3}>Rick and Morty cards auction</Typography>
      <Outlet />
    </Box>
  )
}
