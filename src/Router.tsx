import { BrowserRouter, Routes, Route } from "react-router";
import Signin from "./pages/Signin";

export default function Router() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/signin" element={<Signin />} />
    </Routes>
  </BrowserRouter>
  )
}
