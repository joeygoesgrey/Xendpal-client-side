import React, { ReactNode } from "react";
import Sidebar from "./Sidebar/Sidebar";
import Footer from "./Footer";
import { ApplicationContextProvider } from "@/context/ApplicationContext";

interface LayoutProps {
  children: ReactNode;
}

function Layout({ children }: LayoutProps): JSX.Element {
  return (
    <ApplicationContextProvider>
      <>
        <div className="flex min-h-screen font-Poppins">
          <Sidebar></Sidebar>
          <div className="flex flex-1 flex-col bg-slate-100 see">
            {children}
            <Footer></Footer>
          </div>
        </div>
      </>
    </ApplicationContextProvider>
  );
}

export default Layout;
