import { useContext, useState } from "react";
import { ApplicationContext } from "@/context/ApplicationContext";
import {
    API
} from "@/utils/utils";
import LoaderComponent from "./Loader";

const KeyCreateModal = () => {

    const { loading, CreateKeyModal, dispatch } = useContext(ApplicationContext);

    const [name, setName] = useState('');
    const [permission, setPermission] = useState('Read Only');

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handlePermissionChange = (e) => {
        setPermission(e.target.value);
    };

    const handleSubmit = async (e) => {
        dispatch({ type: 'SET_LOADING', payload: true });
        e.preventDefault();
        const payload = {
            name: name || undefined, // This ensures that the name property is either a string or omitted
        };

        try {
            const response = await API.post('auth/generate-key', payload);

            alert(`API Key: ${response.data.api_key} created successfully!`);
            dispatch({ type: 'SET_CREATEKEYMODAL', payload: false });

            // Optionally refresh or update API keys list in the parent component or context
        } catch (error) {
            dispatch({ type: 'SET_CREATEKEYMODAL', payload: false });
            console.error('Error creating API key:', error);
            alert('Failed to create API key.');

        } finally {
            dispatch({ type: 'SET_LOADING', payload: false });
        }
    };

    return (
        <>

            {CreateKeyModal && (
                <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                    <div className="relative w-auto my-6 mx-auto max-w-3xl">
                        {/*content*/}
                        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                            {/*header*/}
                            <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                                <h3 className="text-3xl font-semibold">
                                    Create new secret key
                                </h3>
                                <button
                                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                    onClick={() => dispatch({ type: 'SET_CREATEKEYMODAL', payload: false })}
                                >
                                    <span className="bg-transparent text-red h-6 w-6 text-2xl block outline-none focus:outline-none">
                                        ×
                                    </span>
                                </button>
                            </div>
                            {/*body*/}
                            <div className="relative p-6 flex-auto">
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-4">
                                        <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
                                            Name (Optional)
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            value={name}
                                            onChange={handleNameChange}
                                            placeholder="Key Name"
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="permission" className="block text-gray-700 font-bold mb-2">
                                            Permissions
                                        </label>
                                        <div className="flex items-center">
                                            {/* <div className="flex items-center mr-4">
                                                <input
                                                    type="radio"
                                                    id="all"
                                                    value="All"
                                                    checked={permission === 'All'}
                                                    onChange={handlePermissionChange}
                                                    className="form-radio h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                                                />
                                                <label htmlFor="all" className="ml-2 block text-sm font-medium text-gray-700">
                                                    All
                                                </label>
                                            </div>
                                            <div className="flex items-center mr-4">
                                                <input
                                                    type="radio"
                                                    id="restricted"
                                                    value="Restricted"
                                                    checked={permission === 'Restricted'}
                                                    onChange={handlePermissionChange}
                                                    className="form-radio h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                                                />
                                                <label htmlFor="restricted" className="ml-2 block text-sm font-medium text-gray-700">
                                                    Restricted
                                                </label>
                                            </div> */}
                                            <div className="flex items-center">
                                                <input
                                                    type="radio"
                                                    id="readOnly"
                                                    value="Read Only"
                                                    checked={permission === 'Read Only'}
                                                    onChange={handlePermissionChange}
                                                    className="form-radio h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                                                />
                                                <label htmlFor="readOnly" className="ml-2 block text-sm font-medium text-gray-700">
                                                    Read Only (Default)
                                                </label>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                                        <button
                                            className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                            type="button"
                                            onClick={() => dispatch({ type: 'SET_CREATEKEYMODAL', payload: false })}
                                        >
                                            Close
                                        </button>


                                        <button
                                            type="submit"
                                            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                                        >
                                            {loading ? <LoaderComponent /> : "Create secret key"}
                                        </button>
                                    </div>
                                </form>
                            </div>

                            {/*footer*/}

                        </div>
                    </div>
                </div>
            )}
        </>

    )
}

export default KeyCreateModal