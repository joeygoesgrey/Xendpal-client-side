import Navbar from "@/components/Navbar/Index";
import UserTable from "./UserTable";
import SidebarSearch from "@/components/Sidebar/SidebarSearch";
import { sidebarToggle } from "@/utils/toggler.js";

function Table() {
 
  return (
    <>
      <main className="h-full">
        <Navbar toggle={sidebarToggle} />
        {/* Search Menu */}
        <SidebarSearch />
        {/* Main Content */}
        <div className="mainCard">
          <div className="border w-full border-gray-200 bg-white py-2 px-2 rounded-md">
            <UserTable />
          </div>
        </div>
      </main>
    </>
  );
}

export default Table;
