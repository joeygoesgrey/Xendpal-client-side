import { useState, useContext, useEffect } from "react";
import { ApplicationContext } from "@/context/ApplicationContext";
import Navbar from "@/components/Navbar/Index";
import { useOutletContext } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import { API, getuserinfo, formatBytes } from "@/utils/utils";
import ModalComponent from "@/components/Other/FolderCreationModal";
import { Spinner } from "flowbite-react";
import SelectComponent from "@/components/Other/FolderSelection";


function Form() {
  const [sidebarToggle] = useOutletContext();

  return (
    <>
      <main className="h-full">
        <Navbar toggle={sidebarToggle} />
        {/* Main Content */}
        <div className="mainCard">
          <FileUploadForm />
        </div>
      </main>
    </>
  );
}

const FileUploadForm = () => {
  // INITIALIZING THE GLOBAL STATES
  const { userinfo, dispatch, folder_id } = useContext(ApplicationContext);

  // INITIALISING LOCAL STATES
  const [uploadProgress, setUploadProgress] = useState({});
  const [totalBytes, setTotalBytes] = useState(0); // Total file size in bytes
  const [selectedFiles, setSelectedFiles] = useState([]); // Store the selected file
  const [uploading, setUploading] = useState(false); // Flag to track if upload is in progress

  const handleFileChange = (e) => {
    const files = [...e.target.files];
    const newUploadProgress = {};

    files.forEach((file) => {
      newUploadProgress[file.name] = {
        uploadedBytes: 0,
        totalBytes: file.size,
        percentage: 0,
      };
    });

    setSelectedFiles(files);
    setUploadProgress(newUploadProgress);
  };

  const uploadFile = async (file) => {
    setTotalBytes(file.size);

    const chunkSize = 1024 * 1024; // 1MB chunks
    let offset = 0;

    const totalChunks = Math.ceil(file.size / chunkSize);

    for (let chunkNumber = 0; chunkNumber < totalChunks; chunkNumber++) {
      const start = offset;
      const end = Math.min(offset + chunkSize, file.size);
      const chunk = file.slice(start, end);

      const formData = new FormData();
      formData.append("file_data", chunk);
      formData.append("file_name", file.name);
      formData.append("total_file_size", file.size);
      formData.append("sequence_number", chunkNumber);
      formData.append("total_chunks", totalChunks);
      formData.append("is_complete", chunkNumber === totalChunks - 1);
      formData.append("file_type", "file");
      if (folder_id) {
        formData.append("folder_id", folder_id);
      }

      try {
        const response = await API.post(`/files/upload-chunk`, formData, {
          onUploadProgress: (progressEvent) => {
            const uploaded = progressEvent.loaded;
            const total = progressEvent.total;
            const fileProgress = uploadProgress[file.name];
            const totalUploaded = fileProgress.uploadedBytes + uploaded;

            setUploadProgress((prevProgress) => ({
              ...prevProgress,
              [file.name]: {
                ...fileProgress,
                uploadedBytes: totalUploaded,
                percentage: (totalUploaded / file.size) * 100,
              },
            }));
          },
        });
        if (response.status === 200) {
          offset += chunkSize;
        } else if (response.status === 202) {
        }
      } catch (error) {
        console.error("Error uploading chunk:", error);
        setUploading(false);
        // Optionally pause or halt further uploads
        break;
      }
    }

    // Reset states if needed here
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true); // Indicate uploading process has started
    for (const file of selectedFiles) {
      await uploadFile(file); // Upload each file individually
    }
    dispatch({ type: "SET_FOLDERID", payload: "" });
    setTotalBytes(0)
    setUploading(false); // Indicate uploading process has ended
    setSelectedFiles([]); // Clear the selection
    setUploadProgress({}); // Reset the upload progress
  };

  // GETTING THE USER DATA FROM THE API
  useEffect(() => {
    getuserinfo().then((userInfoFromServer) => {
      dispatch({ type: "SET_USERINFO", payload: userInfoFromServer });
    });
  }, []);

  return (
    <div>
      <div className="flex justify-center items-center my-5">
        <ModalComponent />
      </div>
      <form
        onSubmit={handleSubmit}
        className="border w-full border-gray-200 bg-white py-4 px-6 rounded-md"
      >
        <div className="flex justify-between">
          <SelectComponent />
        </div>
        {uploading && (
          <div className="flex-row flex  mt-2 justify-center items-center">
            <Spinner />
            <strong className="mx-2">Hold on while process is ongoing</strong>
          </div>
        )}
        <div className="image-upload-wrap rounded-lg">
          <input
            className="file-upload-input"
            multiple={true}
            type="file"
            accept="*"
            onChange={handleFileChange}
          />

          <div className="w-full flex justify-center items-center">
            <h3 className="text-gray-700 m-20">Click me</h3>
          </div>
          {/* Display selected file name */}
          <div className="flex flex-row justify-center flex-wrap">
            {selectedFiles &&
              selectedFiles.length > 0 &&
              selectedFiles.map((file, index) => (
                <p key={index} className="truncate mx-2">
                  {file.name}
                </p>
              ))}
          </div>
        </div>

        {totalBytes > 0 &&
          Object.keys(uploadProgress).map((fileName, index) => {
            const { uploadedBytes, totalBytes, percentage } =
              uploadProgress[fileName];
            return (
              <div key={index} className="flex flex-col mt-3">
                <div className="progress-bar-container bg-gray-200 h-2 w-full rounded">
                  <div
                    className="progress-bar bg-blue-500 h-2 rounded"
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
                <small className="text-center text-xs mt-1">
                  {formatBytes(uploadedBytes)} of {formatBytes(totalBytes)}{" "}
                  uploaded
                </small>
              </div>
            );
          })}

        {selectedFiles && selectedFiles.length > 0 && (
          <div className="mt-6 flex justify-center">
            <button
              type="submit"
              className="text-emerald-600 border-gray-200 px-3 py-2 rounded-lg shadow-lg text-sm flex gap-2 items-center"
            >
              <div>
                <FontAwesomeIcon icon={faUpload} />
              </div>
              <span>
                Upload to <strong>Xendpal</strong>{" "}
              </span>
            </button>
          </div>
        )}

      </form>{" "}
    </div>
  );
};

export default Form;

export { FileUploadForm };
