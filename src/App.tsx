import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Route, Routes } from "react-router-dom";

import Dashboard from "@/pages/Dashboard";
import Table from "@/pages/Table";
import AuthLayout from "@/components/Layout/AuthLayout";
import GuestLayout from "@/components/Layout/GuestLayout";
import Login from "@/pages/auth/Login";
import NotFound from "@/pages/NotFound";
import Form from "@/pages/Form";
import GoogleCallback from "@/google_login";
import FolderTable from "@/pages/FolderPage";
import { isTokenExpired, getToken } from "@/utils/utils";


function App() {
  // const navigate = useNavigate();
  // const location = useLocation();

  // useEffect(() => {
  //   const checkAuth = async () => {
  //     const token = getToken(); // Get the token from localStorage or cookies
  //     // Redirect to login page if no token or token is expired
  //     if (!token || isTokenExpired(token)) {
  //       if (!location.pathname.startsWith("/auth/login")) {
  //         navigate("/auth/login");
  //       }
  //     }
  //   };

  //   checkAuth();
  // }, [navigate, location.pathname]);

  return (
    <Routes>
      <Route path="/" element={<AuthLayout />}>
        <Route path="/items" element={<Table />} />
        <Route path="/" element={<Dashboard />} />
        <Route path="/home" element={<Dashboard />} />
        <Route path="/404" element={<NotFound />} />
        <Route path="/upload" element={<Form />} />
        <Route path="/:foldername" element={<FolderTable />} />
      </Route>
      <Route path="/auth" element={<GuestLayout />}>
        <Route path="/auth/login" element={<Login />} />
      </Route>
      <Route path="/login" element={<GuestLayout />}>
        <Route path="/login/google" element={<GoogleCallback />} />
      </Route>
    </Routes>
  );
}

export default App;
