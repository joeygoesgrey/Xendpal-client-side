import Navbar from "@/components/Navbar/Index";
import SidebarSearch from "@/components/Sidebar/SidebarSearch";
import FolderPage from "@/components/Folder";
import { useParams, useLocation } from 'react-router-dom';
import { ApplicationContext } from "@/context/ApplicationContext";
import { useContext, useEffect } from "react";
import { sidebarToggle } from "@/utils/toggler.js";

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

function FolderTable() {
    const query = useQuery();
    const folderId = query.get("q") || ''; // Ensure folderId is a string; consider handling null case more gracefully
    const { foldername } = useParams<{ foldername: string }>(); // Specify the expected type for useParams
     const { dispatch } = useContext(ApplicationContext);

    useEffect(() => {
        dispatch({
            type: "SET_SEARCHTERM",
            payload: "",
        },);
    }) 
    return (
        <>
            <main className="h-full">
                {/* <Navbar toggle={() => setSidebarStatus(!sidebarStatus)} /> */}

                <Navbar toggle={sidebarToggle} />
                <SidebarSearch />
                <div className="mainCard">
                    <div className="border w-full border-gray-200 bg-white py-2 px-2 rounded-md">
                        <FolderPage
                            folderId={folderId}
                            // loading={loading}
                            foldername={foldername || ''} // Ensure foldername is a string
                        />
                    </div>
                </div>
            </main>
        </>
    );
}

export default FolderTable;
