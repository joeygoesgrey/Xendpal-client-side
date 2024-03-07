import Navbar from "@/components/Navbar/Index";
import { useOutletContext } from "react-router-dom";
import SidebarSearch from "@/components/Sidebar/SidebarSearch";
import FolderPage from "@/components/Folder";
import { useParams, useLocation } from 'react-router-dom';
import { ApplicationContext } from "@/context/ApplicationContext";
import { useState, useContext, useEffect } from "react";

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

function FolderTable() {
    const query = useQuery();
    const folderId = query.get("q") || ''; // Ensure folderId is a string; consider handling null case more gracefully
    const { foldername } = useParams<{ foldername: string }>(); // Specify the expected type for useParams
    const [sidebarToggle] = useOutletContext<boolean[]>(); // Ensure the context type matches expected
    const [loading, setLoading] = useState<boolean>(false);
    const { dispatch } = useContext(ApplicationContext);

    useEffect(() => {
        dispatch({
            type: "SET_SEARCHTERM",
            payload: "",
        }, []);
    })

    // You might need to adjust the FolderPage props if it expects a different type for `query`
    return (
        <>
            <main className="h-full">
                <Navbar toggle={sidebarToggle} />
                <SidebarSearch />
                <div className="mainCard">
                    <div className="border w-full border-gray-200 bg-white py-2 px-2 rounded-md">
                        <FolderPage
                            loading={loading}
                            query={folderId} // Consider what specific value or type you want for `query`
                            folderId={folderId}
                            foldername={foldername || ''} // Ensure foldername is a string
                        />
                    </div>
                </div>
            </main>
        </>
    );
}

export default FolderTable;
