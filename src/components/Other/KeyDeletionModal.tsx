import { useState } from "react";
import {
    API
} from "@/utils/utils";

interface ApiToken {
    id: number;
    token: string;
    name?: string;
    revoked: boolean;
    created_at: string;
    edited_at?: string;
}


interface KeyDeleteModalProps {
    setDeleteKeyModalState: (state: boolean) => void;
    selectedToken: ApiToken; // Ensure this matches the type used in ApiList.tsx
    setSelectedTokenState: (token: ApiToken | null) => void; // Match the type here too
}


const KeyDeleteModal: React.FC<KeyDeleteModalProps> = ({
    setDeleteKeyModalState,
    selectedToken,
    setSelectedTokenState,
}) => {



    // const truncateSecretKey = (secretKey: string) => {
    //     return secretKey.slice(0, 5) + '...' + secretKey.slice(-5);
    // };
    const [isDeleting, setIsDeleting] = useState(false);

    const deleteApiKey = async (keyId: number) => {
        setIsDeleting(true);
        try {
            await API.delete(`auth/api-keys/${keyId}`);
            alert("API key deleted successfully");
            setSelectedTokenState(null);
        } catch (error) {
            console.error("Failed to delete API key:", error);
            alert("Failed to delete API key.");
        } finally {
            setIsDeleting(false);
            setDeleteKeyModalState(false);
        }
    };

    return (

        <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
                {/*content*/}
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                    {/*header*/}
                    <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                        <h3 className="text-3xl text-black font-bold">
                            Revoke secret key
                        </h3>
                        <button
                            className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                            onClick={() => setDeleteKeyModalState(false)}
                        >
                            <span className="bg-transparent text-red h-6 w-6 text-2xl block outline-none focus:outline-none">
                                ×
                            </span>
                        </button>
                    </div>
                    {/*body*/}
                    <div className="relative p-6 flex-auto">
                        <form>
                            <div className="mb-4">
                                This API key will immediately be disabled. API requests made using this key will be rejected, which could cause any systems still depending on it to break. Once revoked, you'll no longer be able to view or modify this API key.
                            </div>
                            <input type="text" value={selectedToken.token} disabled className="mb-4 w-full" />

                            <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                                <button
                                    className="text-white bg-black rounded font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none me-4 ease-linear transition-all duration-150"
                                    type="button"
                                    onClick={() => setDeleteKeyModalState(false)}
                                >
                                    Close
                                </button>


                                <button
                                    onClick={() => deleteApiKey(selectedToken.id)}
                                    disabled={isDeleting}
                                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                                >
                                    {isDeleting ? 'Deleting...' : 'Delete Key'}
                                </button>

                            </div>
                        </form>
                    </div>

                    {/*footer*/}

                </div>
            </div>
        </div>

    )
}

export default KeyDeleteModal