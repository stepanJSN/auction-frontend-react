import { BrowserRouter, Routes, Route } from "react-router";
import Signin from "./pages/Signin";
import AuthLayout from "./layouts/AuthLayout";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/signin" element={<Signin />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
