import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Route, Routes, Navigate } from "react-router-dom";

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
import ApiKeyList from "@/pages/ApiList";
import Pricing from "@/pages/Pricing"; // Ensure this is the correct path to the Pricing component

function App() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const checkAuth = () => {
      const token = getToken(); // Get the token from localStorage or cookies
      // Redirect to login page if no token or token is expired and not already on a public path
      if (
        (!token || isTokenExpired(token)) &&
        !location.pathname.startsWith("/xendpal") &&
        !location.pathname.startsWith("/login/google")
      ) {
        navigate("/xendpal"); // Updated to navigate to "/xendpal"
      }
    };

    checkAuth();
  }, [navigate, location.pathname]);

  const token = getToken();
  const isAuthenticated = token && !isTokenExpired(token);

  return (
    <Routes>
      {isAuthenticated ? (
        <>
          <Route path="/" element={<AuthLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="items" element={<Table />} />
            <Route path="home" element={<Dashboard />} />
            <Route path="404" element={<NotFound />} />
            <Route path="upload" element={<Form />} />
            <Route path=":foldername" element={<FolderTable />} />
            <Route path="apikeys" element={<ApiKeyList />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </>
      ) : (
        <>
          <Route path="/xendpal" element={<GuestLayout />}>
            <Route index element={<Login />} />
            <Route path="pricing" element={<Pricing />} /> {/* Add this line */}
            <Route path="*" element={<NotFound />} />
          </Route>
          <Route path="/login/google" element={<GuestLayout />}>
            <Route index element={<GoogleCallback />} />
          </Route>
          <Route path="*" element={<Navigate replace to="/xendpal" />} />
        </>
      )}
    </Routes>
  );
}

export default App;
