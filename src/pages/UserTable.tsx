import { useState, useContext, useEffect } from "react";
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
  getUserItems,
} from "@/utils/utils";
import moment from "moment";
import { ApplicationContext } from "@/context/ApplicationContext";
import { Link } from 'react-router-dom';
import DeleteModal from "@/components/Other/DeletionModal";

interface CopiedStatus {
  [key: string]: boolean;
}

interface handleClickOptionsProps {
  file_type: string;
  fileIdToDelete: string | number;
}

interface FileItem {
  id: string;
  name: string;
  created_at: string; // Assuming you might need to use the creation date
  type: string; // Assuming this could be useful in your logic
}


function UserTable() {
  const { refreshUserItems, userItems, searchTerm, dispatch } = useContext(ApplicationContext);
  // const [fileIdToDelete, setFileIdToDelete] = useState<string | null>(null);
  const [copiedStatus, setCopiedStatus] = useState<CopiedStatus>({});

  useEffect(() => {
    getUserItems().then((userItemsFromServer: FileItem) => {
      dispatch({ type: "SET_USERITEMS", payload: userItemsFromServer });
      dispatch({ type: 'SET_REFRESHUSERITEMS', payload: false })
    });
  }, [refreshUserItems, dispatch]);

  const handleCopyClick = (fileId: string, link: string) => {
    navigator.clipboard.writeText(link);
    setCopiedStatus({ ...copiedStatus, [fileId]: true });
    setTimeout(
      () => setCopiedStatus({ ...copiedStatus, [fileId]: false }),
      3000
    );
  };

  const handleClickOptions = (props: handleClickOptionsProps) => {
    // Set the file ID to delete and show the modal
    dispatch({ type: 'SET_FILETYPETODELETE', payload: props.file_type })
    dispatch({ type: 'SET_FILEIDTODELETE', payload: props.fileIdToDelete })
    dispatch({ type: 'SET_SHOWDELETEMODAL', payload: true })
  }

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

  return (
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
      {filteredUserItems.length > 0 && (
        <Datatables dataHeader={dataHeader}>
          {filteredUserItems.map((file: FileItem, index: number) => (
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
                {file.type === 'file' ? (
                  <a
                    href={`
                    https://storage.googleapis.com/xendpal/${file.id}-${file.name}`}
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
                  </a>) : (
                  <Link to={`/${file.name}?q=${file.id}`}>
                    <h1 className="uppercase text-slate-400 hover:underline">
                      {highlightText(file.name, searchTerm)}
                    </h1>
                  </Link>
                )}
              </TableCell >

              <TableCell dataLabel="Created At" showLabel={true}>
                <span className="space-x-1">
                  <span className="rounded-full py-1 px-3 text-xs font-semibold bg-emerald-200 text-green-900">
                    {moment(file?.created_at).fromNow()}
                  </span>
                </span>
              </TableCell>

              <TableCell dataLabel="Action" showLabel={true}>
                {file.type === 'file' && (

                  <div
                    onClick={() =>
                      handleCopyClick(
                        file.id,
                        `https://storage.googleapis.com/xendpal/${file.id}-${file.name}`
                      )
                    }
                    className={`icon- inline-flex my-auto px-3 cursor-pointer text-sm`}
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
                )}
                <FontAwesomeIcon
                  onClick={() => handleClickOptions({
                    file_type: file.type, // Replace with the actual file type
                    fileIdToDelete: file.id // Replace with the actual file ID
                  })}
                  icon={faTrash}
                  className={`text-sky-700 inline-flex my-auto px-3 cursor-pointer text-sm`}
                />

                <DeleteModal />

              </TableCell>
            </tr >
          ))}
        </Datatables >
      )}
      {userItems?.length === 0 && (
        <div className="flex justify-center items-center h-full"> No item has been uploaded to Xendpal </div>
      )}
    </>
  );
}



export default UserTable;
