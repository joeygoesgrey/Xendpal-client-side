import { useState, useEffect, useContext } from "react";
import Datatables from "@/components/Datatables/Table";
import TableCell from "@/components/Datatables/TableCell";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCheckCircle,
    faClipboard,
    faDownload,
    faFile,
    faFolder,
    faTrash,
} from "@fortawesome/free-solid-svg-icons";
import {
    deleteUpload,
    API,
} from "@/utils/utils";
import moment from "moment";
import { ApplicationContext } from "@/context/ApplicationContext";
import { Timeline } from 'flowbite-react';
import { HiCalendar } from 'react-icons/hi';
import React from 'react';


interface CopiedStatus {
    [key: string]: boolean;
}
interface FileItem {
    id: string;
    name: string;
    created_at: string; // Assuming you might need to use the creation date
    type: string; // Assuming this could be useful in your logic
}



interface FolderPageProps {
    // query: string;
    folderId: string;
    // loading: boolean;
    foldername: string;
}

const FolderPage: React.FC<FolderPageProps> = ({ folderId, foldername }) => {
    const [refresh, setRefresh] = useState(false);
    const { userItems, searchTerm, loading, dispatch } = useContext(ApplicationContext);
    const [fileIdToDelete, setFileIdToDelete] = useState<string | null>(null);
    const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
    const [copiedStatus, setCopiedStatus] = useState<CopiedStatus>({});
    useEffect(() => {
        // This code will run whenever the page or URL changes
        dispatch({ type: "SET_USERITEMS", payload: null });
        dispatch({ type: 'SET_SHOWDELETEMODAL', payload: false })
      }, [dispatch]); // Pass the variable that you want to watch for changes here
    
    useEffect(() => {
        const fetchFiles = async () => {
            try {
                // Adjust the API endpoint as necessary
                const response = await API.get(`user/folders/${folderId}/files`);
                const data = await response.data;
                dispatch({ type: "SET_USERITEMS", payload: data });
                setRefresh(false); // Reset the refresh state after data is fetched

            } catch (error) {
                console.error("Failed to fetch files", error);
            }
        };

        if (folderId) {
            fetchFiles();
        }
    }, [folderId, refresh, dispatch]);

    const handleCopyClick = (fileId: string, link: string) => {
        navigator.clipboard.writeText(link);
        setCopiedStatus({ ...copiedStatus, [fileId]: true });
        setTimeout(
            () => setCopiedStatus({ ...copiedStatus, [fileId]: false }),
            3000
        );
    };

    const handleDeleteClick = (fileId: string) => {
        // Set the file ID to delete and show the modal
        setFileIdToDelete(fileId);
        setShowDeleteModal(true);
    };

    const handleDeleteConfirm = async () => {
        try {
            dispatch({ type: 'SET_LOADING', payload: true });
            // Await the deleteUpload function and capture the returned value
            const result = await deleteUpload(fileIdToDelete);

            // Now you can use the returned value
            if (result) {
                alert(result); // Logs: "Shared items cannot be deleted"
            } else {
                // If there was no error, refresh the UI and close the delete modal
                setRefresh(true);
                setShowDeleteModal(false);
            }
        } catch (error) {
            console.error(error);
        } finally {
            dispatch({ type: 'SET_LOADING', payload: false });
        }
    };

    const dataHeader = [
        {
            key: "type",
            label: "Type",
        },

        {
            key: "name",
            label: "Name",
        },
        {
            key: "created_at",
            label: "Created At",
        },
        {
            key: "action",
            label: "Action",
        },
    ];

    const filteredUserItems = userItems
        ? userItems.filter((file: FileItem) =>
            file.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
        : [];

    const highlightText = (text: string, highlight: string) => {
        // Split on highlight term and include term into parts, ignore case
        const parts = text.split(new RegExp(`(${highlight})`, "gi"));
        return (
            <span>
                {parts.map((part, i) => (
                    <span
                        key={i}
                        style={
                            part.toLowerCase() === highlight.toLowerCase()
                                ? { backgroundColor: "#73E7B7" }
                                : {}
                        }
                    >
                        {part}
                    </span>
                ))}
            </span>
        );
    };
    console.log(userItems);


    return (
        <Timeline>
            <Timeline.Item>
                <Timeline.Point icon={HiCalendar} />
                <Timeline.Content>
                    <Timeline.Time> <h1 className="p-1 mb-3 uppercase">
                        {foldername} </h1></Timeline.Time>
                    <>
                        {Object.values(copiedStatus).some((status) => status) && (
                            <div
                                className="flex items-center justify-center text-center p-4 mb-4 text-sm text-green-800 rounded-lg"
                                role="alert"
                            >
                                <svg
                                    className="flex-shrink-0 inline w-4 h-4 mx-2"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                >
                                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                                </svg>
                                <div>
                                    <span className="font-medium">Link copied to Clipboard!</span>
                                </div>
                            </div>
                        )}

                        <Datatables  dataHeader={dataHeader}>
                            {filteredUserItems.map((file: FileItem, index:number ) => (
                                <tr
                                    key={index}
                                    className="bg-white border md:border-b block md:table-row rounded-md shadow-md md:rounded-none md:shadow-none mb-5"
                                >
                                    <TableCell dataLabel="Type" showLabel={true}>
                                        {file.type === 'folder' ? (
                                            <FontAwesomeIcon
                                                icon={faFolder}
                                                className="text-emerald-500 inline-flex py-1 px-1 cursor-pointer text-sm"
                                            />
                                        ) : (
                                            <FontAwesomeIcon
                                                icon={faFile}
                                                className="text-emerald-500 inline-flex py-1 px-1 cursor-pointer text-sm"
                                            />
                                        )}
                                    </TableCell>

                                    < TableCell dataLabel="Name" showLabel={true} >
                                        <a
                                            href={`https://storage.googleapis.com/xendpal/${file.name}`}
                                            target="_blank"
                                            className="inline-flex items-center"
                                        >
                                            <small className="truncate">
                                                <FontAwesomeIcon
                                                    icon={faDownload}
                                                    className={`text-emerald-500 inline-flex py-1 px-1 cursor-pointer text-sm`}
                                                />{" "}
                                                {highlightText(file.name, searchTerm)}
                                            </small>
                                        </a>
                                    </TableCell >

                                    <TableCell dataLabel="Created At" showLabel={true}>
                                        <span className="space-x-1">
                                            <span className="rounded-full py-1 px-3 text-xs font-semibold bg-emerald-200 text-green-900">
                                                {moment(file?.created_at).fromNow()}
                                            </span>
                                        </span>
                                    </TableCell>

                                    <TableCell dataLabel="Action" showLabel={true}>
                                        <div
                                            onClick={() =>
                                                handleCopyClick(
                                                    file?.id,
                                                    `https://storage.googleapis.com/xendpal/${file.name}`
                                                )
                                            }
                                            className={`icon-container inline-flex my-auto px-3 cursor-pointer text-sm`}
                                        >
                                            {copiedStatus[file.id] ? (
                                                <FontAwesomeIcon
                                                    icon={faCheckCircle}
                                                    className="text-green-500"
                                                />
                                            ) : (
                                                <FontAwesomeIcon
                                                    icon={faClipboard}
                                                    className="text-sky-700"
                                                />
                                            )}
                                        </div>

                                        <FontAwesomeIcon
                                            onClick={() => handleDeleteClick(file.id)}
                                            icon={faTrash}
                                            className={`text-sky-700 inline-flex my-auto px-3 cursor-pointer text-sm`}
                                        />
                                        {showDeleteModal && (
                                            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                                                <div className="relative w-auto my-6 mx-auto max-w-3xl">
                                                    {/*content*/}
                                                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                                        {/*header*/}
                                                        <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                                                            <h3 className="text-3xl font-semibold">
                                                                Confirm Deletion
                                                            </h3>
                                                            <button
                                                                className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                                                onClick={() => setShowDeleteModal(false)}
                                                            >
                                                                <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                                                                    ×
                                                                </span>
                                                            </button>
                                                        </div>
                                                        {/*body*/}
                                                        <div className="relative p-6 flex-auto">
                                                            <p className="mt-4 mb-1 text-slate-500 text-lg leading-relaxed">
                                                                Are you sure you wanna permanently delete this?
                                                            </p>
                                                        </div>

                                                        {/*footer*/}
                                                        <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                                                            <button
                                                                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                                type="button"
                                                                onClick={() => setShowDeleteModal(false)}
                                                            >
                                                                Close
                                                            </button>
                                                            <button
                                                                className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                                type="button"
                                                                onClick={handleDeleteConfirm}
                                                            >
                                                                {loading ? (
                                                                    <div className="flex items-center justify-center"> Deleting .... </div>
                                                                ) : (
                                                                    <div className="flex items-center justify-center"> Yes </div>
                                                                )}
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </TableCell>
                                </tr >
                            ))
                            }
                        </Datatables >

                    </>
                </Timeline.Content>
            </Timeline.Item>

        </Timeline>

    );
}



export default FolderPage;

// import { useState, useEffect, useContext } from "react";
// import Datatables from "@/components/Datatables/Table";
// import TableCell from "@/components/Datatables/TableCell";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//     faCheckCircle,
//     faClipboard,
//     faDownload,
//     faFile,
//     faFolder,
//     faTrash,
// } from "@fortawesome/free-solid-svg-icons";
// import {
//     API,
// } from "@/utils/utils";
// import moment from "moment";
// import { ApplicationContext } from "@/context/ApplicationContext";
// import { Timeline } from 'flowbite-react';
// import { HiCalendar } from 'react-icons/hi';
// import React from 'react';


// interface handleClickOptionsProps {
//     file_type: string;
//     fileIdToDelete: string | number;
// }

// interface CopiedStatus {
//     [key: string]: boolean;
// }


// interface FolderPageProps {
//     query: string;
//     folderId: string;
//     loading: boolean;
//     foldername: string;
// }

// const FolderPage: React.FC<FolderPageProps> = ({ query, folderId, loading, foldername }) => {
//     const [refresh, setRefresh] = useState(false);
//     const { userItems, searchTerm, dispatch } = useContext(ApplicationContext);
//     const [copiedStatus, setCopiedStatus] = useState<CopiedStatus>({});
//     useEffect(() => {
//         const fetchFiles = async () => {
//             try {
//                 // Adjust the API endpoint as necessary
//                 const response = await API.get(`user/folders/${folderId}/files`);
//                 const data = await response.data;
//                 dispatch({ type: "SET_USERITEMS", payload: data });
//                 setRefresh(false); // Reset the refresh state after data is fetched
//             } catch (error) {
//                 console.error("Failed to fetch files", error);
//             }
//         };

//         if (folderId) {
//             fetchFiles();
//         }
//     }, [folderId, refresh]);

//     const handleCopyClick = (fileId: string, link: string) => {
//         navigator.clipboard.writeText(link);
//         setCopiedStatus({ ...copiedStatus, [fileId]: true });
//         setTimeout(
//             () => setCopiedStatus({ ...copiedStatus, [fileId]: false }),
//             3000
//         );
//     };

//     const handleClickOptions = (props: handleClickOptionsProps) => {
//         // Set the file ID to delete and show the modal
//         dispatch({ type: 'SET_FILETYPETODELETE', payload: props.file_type })
//         dispatch({ type: 'SET_FILEIDTODELETE', payload: props.fileIdToDelete })
//         dispatch({ type: 'SET_SHOWDELETEMODAL', payload: true })
//     }

//     const dataHeader = [
//         {
//             key: "type",
//             label: "Type",
//         },

//         {
//             key: "name",
//             label: "Name",
//         },
//         {
//             key: "created_at",
//             label: "Created At",
//         },
//         {
//             key: "action",
//             label: "Action",
//         },
//     ];

//     const filteredUserItems = userItems
//         ? userItems.filter((file) =>
//             file.name.toLowerCase().includes(searchTerm.toLowerCase())
//         )
//         : [];

//     const highlightText = (text: string, highlight: string) => {
//         // Split on highlight term and include term into parts, ignore case
//         const parts = text.split(new RegExp(`(${highlight})`, "gi"));
//         return (
//             <span>
//                 {parts.map((part, i) => (
//                     <span
//                         key={i}
//                         style={
//                             part.toLowerCase() === highlight.toLowerCase()
//                                 ? { backgroundColor: "#73E7B7" }
//                                 : {}
//                         }
//                     >
//                         {part}
//                     </span>
//                 ))}
//             </span>
//         );
//     };

//     return (
//         <Timeline>
//             <Timeline.Item>
//                 <Timeline.Point icon={HiCalendar} />
//                 <Timeline.Content>
//                     <Timeline.Time> <h1 className="p-1 mb-3 uppercase">
//                         {foldername} </h1></Timeline.Time>
//                     <>
//                         {Object.values(copiedStatus).some((status) => status) && (
//                             <div
//                                 className="flex items-center justify-center text-center p-4 mb-4 text-sm text-green-800 rounded-lg"
//                                 role="alert"
//                             >
//                                 <svg
//                                     className="flex-shrink-0 inline w-4 h-4 mx-2"
//                                     aria-hidden="true"
//                                     xmlns="http://www.w3.org/2000/svg"
//                                     fill="currentColor"
//                                     viewBox="0 0 20 20"
//                                 >
//                                     <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
//                                 </svg>
//                                 <div>
//                                     <span className="font-medium">Link copied to Clipboard!</span>
//                                 </div>
//                             </div>
//                         )}

//                         <Datatables loading={loading} dataHeader={dataHeader}>
//                             {filteredUserItems.map((file, index) => (
//                                 <tr
//                                     key={index}
//                                     className="bg-white border md:border-b block md:table-row rounded-md shadow-md md:rounded-none md:shadow-none mb-5"
//                                 >
//                                     <TableCell dataLabel="Type" showLabel={true}>
//                                         {file.type === 'folder' ? (
//                                             <FontAwesomeIcon
//                                                 icon={faFolder}
//                                                 className="text-emerald-500 inline-flex py-1 px-1 cursor-pointer text-sm"
//                                             />
//                                         ) : (
//                                             <FontAwesomeIcon
//                                                 icon={faFile}
//                                                 className="text-emerald-500 inline-flex py-1 px-1 cursor-pointer text-sm"
//                                             />
//                                         )}
//                                     </TableCell>

//                                     < TableCell dataLabel="Name" showLabel={true} >
//                                         {file.type === 'file' ? (
//                                             <a
//                                                 href={`https://xendpal001.it-mil-1.linodeobjects.com/${file.id}-${file.name}`}
//                                                 target="_blank"
//                                                 className="inline-flex items-center"
//                                             >
//                                                 <small className="truncate">
//                                                     <FontAwesomeIcon
//                                                         icon={faDownload}
//                                                         className={`text-emerald-500 inline-flex py-1 px-1 cursor-pointer text-sm`}
//                                                     />{" "}
//                                                     {highlightText(file.name, searchTerm)}
//                                                 </small>
//                                             </a>) : (
//                                             <Link to={`/${file.name}?q=${file.id}`}>
//                                                 <h1 className="uppercase text-slate-400 hover:underline">
//                                                     {highlightText(file.name, searchTerm)}
//                                                 </h1>
//                                             </Link>
//                                         )}
//                                     </TableCell >

//                                     <TableCell dataLabel="Created At" showLabel={true}>
//                                         <span className="space-x-1">
//                                             <span className="rounded-full py-1 px-3 text-xs font-semibold bg-emerald-200 text-green-900">
//                                                 {moment(file?.created_at).fromNow()}
//                                             </span>
//                                         </span>
//                                     </TableCell>

//                                     <TableCell>
//                                         {file.type === 'file' && (

//                                             <div
//                                                 onClick={() =>
//                                                     handleCopyClick(
//                                                         file.file_id,
//                                                         `https://xendpal001.it-mil-1.linodeobjects.com/${file.id}-${file.name}`
//                                                     )
//                                                 }
//                                                 className={`icon-container inline-flex my-auto px-3 cursor-pointer text-sm`}
//                                             >
//                                                 {copiedStatus[file.id] ? (
//                                                     <FontAwesomeIcon
//                                                         icon={faCheckCircle}
//                                                         className="text-green-500"
//                                                     />
//                                                 ) : (
//                                                     <FontAwesomeIcon
//                                                         icon={faClipboard}
//                                                         className="text-sky-700"
//                                                     />
//                                                 )}
//                                             </div>
//                                         )}
//                                         <FontAwesomeIcon
//                                             onClick={() => handleClickOptions({
//                                                 file_type: file.type, // Replace with the actual file type
//                                                 fileIdToDelete: file.id // Replace with the actual file ID
//                                             })}
//                                             icon={faTrash}
//                                             className={`text-sky-700 inline-flex my-auto px-3 cursor-pointer text-sm`}
//                                         />

//                                         <DeleteModal />

//                                     </TableCell>
//                                 </tr >
//                             ))
//                             }
//                         </Datatables >

//                     </>
//                 </Timeline.Content>
//             </Timeline.Item>

//         </Timeline>

//     );
// }

// export default FolderPage;
