import { Box, containerClasses, SxProps, Theme, Typography } from "@mui/material";
import { Outlet } from "react-router";

const authContainerStyles: SxProps = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '100vh',
  padding: 2
}

const titleStyles: SxProps<Theme> = (theme: Theme) => ({
  fontSize: {
    xs: theme.typography.h4.fontSize,
    md: theme.typography.h3.fontSize,
  },
  mb: {
    sx: 1,
    md: 2,
  },
  textAlign: 'center'
})

export default function AuthLayout() {
  return (
    <Box sx={authContainerStyles}>
      <Typography sx={titleStyles}>Rick and Morty cards auction</Typography>
      <Outlet />
    </Box>
  )
}
