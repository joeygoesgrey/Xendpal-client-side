import React, { useEffect } from "react";
import StatisticWidget from "@/components/Widget/Statistic";
import DashboardHeader from "@/components/Other/DashboardHeader";
import { getuserinfo } from "@/utils/utils.js";
import { ApplicationContext } from "@/context/ApplicationContext";
import { formatBytes } from "@/utils/utils.js";
import { Progress } from 'flowbite-react';
import { sidebarToggle } from "@/utils/toggler.js";



interface UserInfo {
  name: string;
  picture: string | null;
  space: number | null;
  max_space: number | null;
}

function Dashboard() {
  const { userinfo, dispatch } = React.useContext(ApplicationContext);

  useEffect(() => {
    async function fetchUserInfo() {
      try {
        const userInfoFromServer: UserInfo = await getuserinfo();
        dispatch({ type: "SET_USERINFO", payload: userInfoFromServer });
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    }

    fetchUserInfo();
  }, [dispatch]);


  return (
    <>
      <main className="h-full">
        {/* Welcome Header */}
        <DashboardHeader
          toggle={sidebarToggle}
          avatar={userinfo?.picture}
          user={{ name: userinfo?.name }}
        />

        {/* Credit */}
        <div className="px-2 mx-auto mainCard mt-10">
          <h1 className="text-slate-500 pb-3 text-base md:text-lg text-center flex-col flex items-center gap-2 justify-center">
            <span>
              {formatBytes(userinfo?.space || 0)} |{" "}
              {formatBytes(userinfo?.max_space || 2147483648)} used
            </span>

            <Progress progress={Number(userinfo?.space || 0) / Number(userinfo?.max_space || 2147483648) * 100} className="progress progress-accent w-56 mx-3" />

          </h1>
        </div>

        {/* Stats */}
        <div className="px-2 mx-auto mainCard">
          <div className="w-full overflow-hidden text-slate-700 md:grid gap-4">
            <StatisticWidget className="col-span-4 col-start-1 bg-white" />
          </div>
        </div>
      </main>
    </>
  );
}

export default Dashboard;
