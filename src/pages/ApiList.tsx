import React, { useContext, useEffect, useState } from 'react';
import { useOutletContext } from "react-router-dom";
import Navbar from "@/components/Navbar/Index";
import Datatables from "@/components/Datatables/Table";
import TableCell from "@/components/Datatables/TableCell";
import moment from "moment";
import { ApplicationContext } from "@/context/ApplicationContext";
import KeyDeleteModal from '@/components/Other/KeyDeletionModal';
import KeyCreateModal from '@/components/Other/KeyCreationModal';
import { API } from '@/utils/utils';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faTrash
} from "@fortawesome/free-solid-svg-icons";
import LoaderComponent from '@/components/Other/Loader';

interface ApiTokenProps {
    id: number;
    token: string;
    name?: string;
    revoked: boolean;
    created_at: string; // ISO string date
    edited_at: string; // ISO string date
}

const dataHeader = [
    {
        key: "name",
        label: "Name",
    },
    {
        key: "secret_key",
        label: "Secret Key",
    },
    {
        key: "created_at",
        label: "Created",
    },
    {
        key: "Actions",
        label: "Actions",
    },
    {
        key: "last_used",
        label: "Last Used",
    },

];

const truncateSecretKey = (secretKey: string) => {
    return secretKey.slice(0, 5) + '...' + secretKey.slice(-5);
};


const ApiKeyList: React.FC = () => {
    const [sidebarToggle] = useOutletContext();
    const { loading, CreateKeyModal, dispatch } = useContext(ApplicationContext);
    const [deleteKeymodal, setDeleteKeyModal] = useState<boolean>(false);
    const [apiTokens, setApiTokens] = useState<ApiTokenProps[]>([]); // State to store fetched API tokens
    const [selectedToken, setSelectedToken] = useState<ApiTokenProps | null>(null);

    useEffect(() => {
        const fetchApiTokens = async () => {
            dispatch({ type: 'SET_LOADING', payload: true });
            try {
                const response = await API.get("auth/api-tokens"); // Adjust the API utility call according to your setup
                setApiTokens(response.data);
            } catch (error) {
                console.error("Failed to fetch API tokens:", error);
            } finally {
                dispatch({ type: 'SET_LOADING', payload: false });
            }
        };

        fetchApiTokens();
    }, [selectedToken, CreateKeyModal]); // Empty dependency array means this effect runs once on mount


    return (
        <>
            <Navbar toggle={sidebarToggle} />
            {!loading && (
                <main className="h-full">

                    {/* Main Content */}
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
                                {apiTokens.map((tokens, index) => (
                                    <tr
                                        key={index}
                                        className="bg-white border md:border-b block md:table-row rounded-md shadow-md md:rounded-none md:shadow-none mb-5"
                                    >
                                        <TableCell dataLabel="Name" showLabel={true}>
                                            <h1> {tokens?.name?.length > 0 ? tokens.name : " "}</h1>
                                        </TableCell>

                                        < TableCell dataLabel="Secret Key" showLabel={true} >
                                            <span className="py-1 text-xs font-semibold">{truncateSecretKey(tokens?.token)}</span>
                                        </TableCell >

                                        <TableCell dataLabel="Created" showLabel={true}>
                                            <span className="space-x-1">
                                                <span className="rounded-full py-1 px-3 text-xs font-semibold">
                                                    {moment(tokens?.created_at).fromNow()}
                                                </span>
                                            </span>
                                        </TableCell>

                                        <TableCell dataLabel="Actions" showLabel={true}>
                                            <span className="space-x-1">

                                                <FontAwesomeIcon
                                                    onClick={() => {
                                                        setSelectedToken(tokens);
                                                        setDeleteKeyModal(true);
                                                    }}
                                                    icon={faTrash}
                                                    className="text-sky-700 inline-flex my-auto px-3 cursor-pointer text-sm"
                                                />
                                            </span>
                                        </TableCell>


                                        <TableCell dataLabel="Last Used" showLabel={true}>
                                            <span>
                                                {moment(tokens?.edited_at).fromNow()}
                                            </span>
                                        </TableCell>
                                        {deleteKeymodal && selectedToken &&
                                            <KeyDeleteModal
                                                setDeleteKeyModalState={setDeleteKeyModal}
                                                selectedToken={selectedToken}
                                                setSelectedToken={setSelectedToken}
                                            />
                                        }

                                    </tr >
                                ))
                                }
                            </Datatables >
                        )}

                        <KeyCreateModal />

                    </div>
                </main>
            )}

        </>
    );
};

export default ApiKeyList;