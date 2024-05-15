import { useContext } from "react";
import { ApplicationContext } from "@/context/ApplicationContext";
import {
    deleteUpload,
    API
} from "@/utils/utils";

const DeleteModal = () => {

    const { loading, fileTypetoDelete, fileIdToDelete, showDeleteModal, dispatch } = useContext(ApplicationContext);

    const handleDeleteConfirmFolder = async () => {
        try {
            dispatch({ type: 'SET_LOADING', payload: true });

            // Await the deleteUpload function and capture the returned value
            const response = await API.delete(`user/delete_folders/${fileIdToDelete}`);

            // Check if the response status code is 204
            if (response.status === 204) {
                dispatch({ type: 'SET_REFRESHUSERITEMS', payload: true })
                dispatch({ type: 'SET_SHOWDELETEMODAL', payload: false })
            } else {
                console.error('Unexpected response status:', response.status);
            }
        } catch (error) {
            console.error(error);
            // Handle other errors, such as network errors, here
        } finally {
            dispatch({ type: 'SET_LOADING', payload: false });
        }
    };

    const handleDeleteConfirm = async () => {
        try {
            dispatch({ type: 'SET_LOADING', payload: true });
            await deleteUpload(fileIdToDelete);
            dispatch({ type: 'SET_REFRESHUSERITEMS', payload: true })
            dispatch({ type: 'SET_SHOWDELETEMODAL', payload: false })

        } catch (error) {
            console.error(error);
        } finally {
            dispatch({ type: 'SET_LOADING', payload: false });
        }
    };

    return (
        <>
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
                                    onClick={() => dispatch({ type: 'SET_SHOWDELETEMODAL', payload: false })}
                                >
                                    <span className="bg-transparent text-red h-6 w-6 text-2xl block outline-none focus:outline-none">
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
                                    onClick={() => dispatch({ type: 'SET_SHOWDELETEMODAL', payload: false })}
                                >
                                    Close
                                </button>
                                {fileTypetoDelete === 'file' ? (

                                    <button
                                        className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={handleDeleteConfirm}
                                    >
                                        {loading ? (
                                            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true">Deleting... </span>
                                        ) : (<span> Yes </span>)}
                                    </button>
                                ) : (
                                    <button
                                        className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={handleDeleteConfirmFolder}
                                    >
                                        {loading ? (
                                            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true">Deleting... </span>
                                        ) : (<span> Yes </span>)}
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>

    )
}

export default DeleteModal