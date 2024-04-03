import { useState, useContext, useEffect, ChangeEvent } from "react";
import { ApplicationContext } from "@/context/ApplicationContext";
import { API } from "@/utils/utils";
import { Select } from 'flowbite-react';
import LoaderComponent from "./Loader";

interface Folder {
    id: string;
    name: string;
    parent_id: string | null;
}

function SelectComponent() {
    const { dispatch, loadFolders, folder_id, loading } = useContext(ApplicationContext);
    const [folders, setFolders] = useState<Folder[]>([]);

    useEffect(() => {
        dispatch({ type: 'SET_LOADING', payload: true });
        // Fetch folders from the server when the component mounts
        API.get<{ folders: Folder[] }>('/user/folders')
            .then((response) => {
                setFolders(response.data.folders);
                dispatch({ type: 'SET_LOADING', payload: false });
                dispatch({ type: 'SET_LOADFOLDERS', payload: false });
            })
            .catch((error) => {
                console.error('Failed to fetch folders:', error);
                dispatch({ type: 'SET_LOADING', payload: false });
            });
    }, [loadFolders, dispatch]);


    const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
        const selectedFolderId = event.target.value;
        // setSelectedFolder(selectedFolderId);
        dispatch({ type: "SET_FOLDERID", payload: selectedFolderId });
    };

    return (
        <div className="max-w-md">
            {loading ? (
                <LoaderComponent />
            ) : (
                <Select id="folders" onChange={handleSelectChange} value={folder_id || ""}>
                    <option value="" disabled>Folder to upload to</option>
                    {folders.map((folder) => (
                        <option key={folder.id} value={folder.id}>
                            {folder.name}
                        </option>
                    ))}
                </Select>
            )
            }
        </div >
    );
}

export default SelectComponent;
