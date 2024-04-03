import { ReactNode, useState } from "react";
import Sidebar from "./Sidebar/Sidebar";
import { ApplicationContextProvider } from "@/context/ApplicationContext";
import { sidebarToggle } from "@/utils/toggler.js";

interface LayoutProps {
  children: ReactNode;
}

function Layout({ children }: LayoutProps): JSX.Element {
  const isDesktop = () => document.body.clientWidth > 768;
  const [sidebarStatus] = useState<boolean>(isDesktop());
  return (
    <ApplicationContextProvider>
      <>
        <div className="flex min-h-screen font-Poppins">
          <Sidebar toggle={sidebarToggle} className={sidebarStatus ? "" : "mobile"} />
          <div className="flex flex-1 flex-col bg-slate-100 see">
            {children}
            {/* <FooterComp/>  */}
          </div>
        </div>
      </>
    </ApplicationContextProvider>
  );
}

export default Layout;
