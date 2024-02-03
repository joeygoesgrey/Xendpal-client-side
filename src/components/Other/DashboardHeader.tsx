import { faBars, IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

interface DashboardHeaderProps {
  user: { name: string };
  avatar: string;
  toggle: () => void;
}

function DashboardHeader({ user, avatar, toggle }: DashboardHeaderProps) {
  return (
    <div className="px-3 sm:px-8 pt-9 pb-4 flex flex-wrap w-full justify-between items-center">
      <div className="flex flex-row gap-3">
        <p className="flex-shrink-0 rounded-full block md:hidden border border-emerald-400 p-[3px] shadow-lg">
          <img
            className="rounded-full  md:h-14 md:w-14 h-12 w-12 border cursor-pointer"
            src={avatar}
            alt="Avatar"
          />
        </p>
        <div id="nameSection">
          <p className="text-sm font-semibold text-gray-500">Welcome back,</p>
          <h1 className="font-medium lg:text-3xl text-2xl text-gray-700">
            {user?.name}
          </h1>
        </div>
      </div>
      <div className="avaterSection flex items-center gap-2 sm:gap-6 text-slate-400">
        <p className="rounded-full hidden md:block border border-emerald-400 p-[3px] shadow-lg">
          <img
            className="rounded-full md:h-14 md:w-14 h-10 w-10 border cursor-pointer"
            src={avatar}
            alt="Avatar"
            loading="lazy"
          />
        </p>

        <p className="cursor-pointer md:hidden text-2xl">
          <FontAwesomeIcon icon={faBars as IconDefinition} onClick={toggle} className="" />
        </p>
      </div>
    </div>
  );
}

export default DashboardHeader;
