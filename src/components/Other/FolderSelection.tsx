import React, { useState, useContext, useEffect, ChangeEvent } from "react";
import { ApplicationContext } from "@/context/ApplicationContext";
import { API } from "@/utils/utils";
import { Select } from 'flowbite-react';

interface Folder {
    id: string;
    name: string;
    parent_id: string | null;
}

function SelectComponent() {
    const { dispatch } = useContext(ApplicationContext);
    const [folders, setFolders] = useState<Folder[]>([]);
    const [selectedFolder, setSelectedFolder] = useState<string | null>(null);

    useEffect(() => {
        // Fetch folders from the server when the component mounts
        API.get<{ folders: Folder[] }>('/user/folders').then((response) => {
            setFolders(response.data.folders);
        });
    }, []);

    const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
        const selectedFolderId = event.target.value;
        setSelectedFolder(selectedFolderId);
        dispatch({ type: "SET_FOLDERID", payload: selectedFolderId });
    };

    return (
        <div className="max-w-md">
            <Select id="folders" onChange={handleSelectChange} value={selectedFolder || ""}>
                <option value="" disabled>Folder to upload to</option>
                {folders.map((folder) => (
                    <option key={folder.id} value={folder.id}>
                        {folder.name}
                    </option>
                ))}
            </Select>
        </div>
    );
}

export default SelectComponent;
