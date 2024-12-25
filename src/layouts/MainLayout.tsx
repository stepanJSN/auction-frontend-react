import { Box } from "@mui/material";
import Header from "./Header/Header";
import { Outlet } from "react-router";

export default function MainLayout() {
  return (
    <Box>
      <Header/>
      <Outlet />
    </Box>
  )
}
