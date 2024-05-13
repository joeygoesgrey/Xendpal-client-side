import   { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import { sidebarToggle } from "@/utils/toggler.js";
import BottomNavbar from "../BottomNavbar/Index";
 

function AuthLayout() {
  const isDesktop = () => document.body.clientWidth > 768;
  const [sidebarStatus, setSidebarStatus] = useState<boolean>(isDesktop());

  useEffect(() => {
    const handleResize = () => {
      setSidebarStatus(isDesktop());
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="adminLayout">
      {/* Sidebar */}
      <Sidebar toggle={sidebarToggle} className={sidebarStatus ? "" : "mobile"} />

      {/* Main Wrapper */}
      <div className="mainWrapper">
        <Outlet context={[sidebarToggle]} />
      </div>

      {/* Bottom Navigation */}
      <BottomNavbar />
    </div>
  );
}

export default AuthLayout;

