import { useState, useContext, useEffect } from "react";
import { ApplicationContext } from "@/context/ApplicationContext";
import Navbar from "@/components/Navbar/Index";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import { API, getuserinfo} from "@/utils/utils";
import ModalComponent from "@/components/Other/FolderCreationModal";
import { Spinner } from "flowbite-react";
import SelectComponent from "@/components/Other/FolderSelection";
import axios from 'axios';
import { sidebarToggle } from "@/utils/toggler.js";

function Form() {

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
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  // const [totalBytes, setTotalBytes] = useState(0); // Total file size in bytes
  const [uploading, setUploading] = useState(false); // Flag to track if upload is in progress

  const handleFileChange = (e) => {
    const files = [...e.target.files];
    const newUploadProgress = {};
    let totalBytes = 0;

    files.forEach((file) => {
      totalBytes += file.size; // Calculate the total size of selected files
      newUploadProgress[file.name] = {
        uploadedBytes: 0,
        totalBytes: file.size,
        percentage: 0,
      };
    });

    // Calculate remaining space
    const remainingSpace = userinfo.max_space - userinfo.space;
    if (totalBytes > remainingSpace) {
      alert('You do not have enough space to upload these files.');
      // Optionally, clear the selected files if they exceed the available space
      setSelectedFiles([]);
      return; // Stop further execution
    }

    setSelectedFiles(files);
    setUploadProgress(newUploadProgress);
  };

  async function uploadFileToStorageBucket(presignedUrl, file) {
    try {
      const config = {
        onUploadProgress: (progressEvent) => {
          const percentage = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          // Update upload progress state
          setUploadProgress(prevProgress => ({
            ...prevProgress,
            [file.name]: {
              uploadedBytes: progressEvent.loaded,
              totalBytes: progressEvent.total,
              percentage,
            },
          }));
        },
        headers: {
          'Content-Type': file.type,
        },
      };

      const response = await axios.put(presignedUrl, file, config);
      if (response.status === 200) {
        console.log('Upload successful');
      } else {
        console.error('Upload failed with status: ', response.status);
      }
      return response; // Return the response for further processing
    } catch (error) {
      console.error('Error uploading file:', error);
      throw error; // Re-throw the error to be handled by the caller
    }
  }


  const uploadFile = async (file) => {
    const formData = new FormData();
    formData.append("file_name", file.name);
    formData.append("file_size", file.size);
    formData.append("file_type", file.type);
    if (folder_id) {
      formData.append("folder_id", folder_id);
    }

    setUploading(true); // Indicate the uploading process has started

    try {
      // Send file details to your backend to get a presigned URL for uploading
      const detailResponse = await API.post('/files/upload-file', formData);
      const data = await detailResponse.data;

      if (detailResponse.status === 200 || detailResponse.status === 202) {
        // Extract the presigned URL and file ID from the response
        const { file_id, presigned_url } = data;
        const uploadResponse = await uploadFileToStorageBucket(presigned_url, file);

        if (uploadResponse.status === 200) {
          console.log('Upload successful');
        }
        else {
          console.error("Upload to storage failed", file_id);
          // Handle upload failure
        }
      }
    } catch (error) {
      console.error("Error uploading file details:", error);
    } finally {
      setUploading(false); // Reset uploading state regardless of outcome
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true); // Indicate uploading process has started
    for (const file of selectedFiles) {
      await uploadFile(file); // Upload each file individually
    }
    dispatch({ type: "SET_FOLDERID", payload: "" });
    // setTotalBytes(0)
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
            <strong className="mx-2">Hold on while file is been uploaded</strong>
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

        {Object.keys(uploadProgress).length > 0 && uploading && selectedFiles.map((file, index) => (
          <div key={index}>
            {/* <div>{file.name}</div> */}
            <div className="progress-bar-container bg-gray-200 h-2 my-5 w-full rounded flex items-center justify-center ">
              <div
                className="progress-bar bg-blue-500 pt-3 text-center h-2 rounded"
                style={{ width: `${uploadProgress[file.name]?.percentage || 0}%` }}
              >{uploadProgress[file.name]?.percentage || 0}%</div>
            </div>
          </div>
        ))}

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
