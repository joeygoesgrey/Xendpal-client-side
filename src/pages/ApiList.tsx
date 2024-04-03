import React, { useContext, useEffect, useState } from 'react';
import Navbar from "@/components/Navbar/Index";
import Datatables from "@/components/Datatables/Table";
import TableCell from "@/components/Datatables/TableCell";
import moment from "moment";
import { ApplicationContext } from "@/context/ApplicationContext";
import KeyDeleteModal from '@/components/Other/KeyDeletionModal';
import KeyCreateModal from '@/components/Other/KeyCreationModal';
import { API } from '@/utils/utils';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { sidebarToggle } from "@/utils/toggler.js";

interface ApiToken {
    id: number;
    token: string;
    name?: string;
    revoked: boolean;
    created_at: string;
    edited_at?: string;
}


const dataHeader = [
    { key: "name", label: "Name" },
    { key: "secret_key", label: "Secret Key" },
    { key: "created_at", label: "Created" },
    { key: "Actions", label: "Actions" },
    { key: "last_used", label: "Last Used" },
];

const truncateSecretKey = (secretKey: string) => {
    return secretKey.slice(0, 5) + '...' + secretKey.slice(-5);
};

const ApiKeyList: React.FC = () => {
    const { loading, CreateKeyModal, dispatch } = useContext(ApplicationContext);
    const [deleteKeyModal, setDeleteKeyModal] = useState<boolean>(false);
    const [apiTokens, setApiTokens] = useState<ApiToken[]>([]);
    const [selectedToken, setSelectedToken] = useState<ApiToken | null>(null);

    const fetchApiTokens = async () => {
        dispatch({ type: 'SET_LOADING', payload: true });
        try {
            const response = await API.get("auth/api-tokens");
            setApiTokens(response.data);
        } catch (error) {
            console.error("Failed to fetch API tokens:", error);
        } finally {
            dispatch({ type: 'SET_LOADING', payload: false });
        }
    };

    useEffect(() => {
        fetchApiTokens();
    }, [selectedToken, CreateKeyModal]); // Corrected dependency array

    return (
        <>
            <Navbar toggle={sidebarToggle} />
            {!loading && (
                <main className="h-full">
                    <div className="mainCard">
                        {apiTokens.length === 0 && (
                            <div className='text-center flex text-black items-center justify-center my-5'>
                                No Secret Key has been generated
                            </div>
                        )}

                        <div className="flex justify-center items-center mb-4">
                            <button className='bg-green-300 px-3 py-1 rounded text-white' onClick={() => dispatch({ type: 'SET_CREATEKEYMODAL', payload: true })}>
                                Create key
                            </button>
                        </div>

                        {apiTokens.length > 0 && (
                            <Datatables dataHeader={dataHeader}>
                                {apiTokens.map((token, index) => (
                                    <tr key={index} className="bg-white border md:border-b block md:table-row rounded-md shadow-md md:rounded-none md:shadow-none mb-5">
                                        <TableCell dataLabel="Name" showLabel={true}>
                                            <h1>{token.name && token.name.length > 0 ? token.name : " "}</h1>
                                        </TableCell>

                                        <TableCell dataLabel="Secret Key" showLabel={true}>
                                            <span className="py-1 text-xs font-semibold">{truncateSecretKey(token.token)}</span>
                                        </TableCell>

                                        <TableCell dataLabel="Created" showLabel={true}>
                                            <span className="rounded-full py-1 px-3 text-xs font-semibold">
                                                {moment(token.created_at).fromNow()}
                                            </span>
                                        </TableCell>

                                        <TableCell dataLabel="Actions" showLabel={true}>
                                            <FontAwesomeIcon
                                                icon={faTrash}
                                                onClick={() => {
                                                    setSelectedToken(token);
                                                    setDeleteKeyModal(true);
                                                }}
                                                className="text-sky-700 inline-flex my-auto px-3 cursor-pointer text-sm"
                                            />
                                        </TableCell>

                                        <TableCell dataLabel="Last Used" showLabel={true}>
                                            <span>{moment(token.edited_at).fromNow()}</span>
                                        </TableCell>
                                    </tr>
                                ))}
                            </Datatables>
                        )}

                        <KeyCreateModal />
                        {deleteKeyModal && selectedToken && (
                            <KeyDeleteModal
                                setDeleteKeyModalState={setDeleteKeyModal}
                                selectedToken={selectedToken}
                                setSelectedTokenState={setSelectedToken as unknown as (token: ApiToken | null) => void}
                            />
                        )}
                    </div>
                </main>
            )}
        </>
    );
};

export default ApiKeyList;
