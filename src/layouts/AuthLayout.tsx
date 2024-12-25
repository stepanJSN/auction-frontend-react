import { Box, SxProps, Theme, Typography } from "@mui/material";
import { Outlet } from "react-router";

const authContainerStyles: SxProps = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '100vh',
  padding: 2
}

const titleStyles: SxProps<Theme> = () => ({
  mb: {
    sx: 1,
    md: 2,
  },
  textAlign: 'center'
})

export default function AuthLayout() {
  return (
    <Box sx={authContainerStyles}>
      <Typography variant="h4" sx={titleStyles}>Rick and Morty cards auction</Typography>
      <Outlet />
    </Box>
  )
}
