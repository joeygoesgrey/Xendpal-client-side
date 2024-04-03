import { Button, Modal, TextInput } from 'flowbite-react';
import { useState, useContext } from 'react';
import { API } from '@/utils/utils'
import { ApplicationContext } from "@/context/ApplicationContext";
import { toast } from 'react-toastify'; // Assuming you're using react-toastify for user notifications


function ModalComponent() {
    const { loading, dispatch } = useContext(ApplicationContext);
    const [openModal, setOpenModal] = useState(false);
    const [folderName, setfolderName] = useState('');

    function onCloseModal() {
        setOpenModal(false);
        setfolderName('');
    }


    const createFolder = async () => {
        try {
            dispatch({ type: 'SET_LOADING', payload: true });
            await API.post('/user/create_folder', { name: folderName });
        } catch (error) {
            console.error('Error creating folder:', error);
            toast.error('Error creating folder. Please try again.'); // User feedback for error
        } finally {
            dispatch({ type: 'SET_LOADING', payload: false }); // Ensure loading state is reset in all cases
            onCloseModal(); // Close the modal irrespective of the outcome
            dispatch({ type: 'SET_LOADFOLDERS', payload: true }); // Trigger a reload of folders
        }
    };

    return (
        <>
            <Button onClick={() => setOpenModal(true)} className='hover:bg-emerald-300 bg-emerald-300 hover:text-white text-white'>Create Folder</Button>
            <Modal show={openModal} size="md" onClose={onCloseModal} popup>
                <Modal.Header />
                <Modal.Body>
                    <div className="space-y-6">
                        <div>

                            <TextInput
                                id="name"
                                placeholder="Type in a Folder name"
                                value={folderName}
                                onChange={(event) => setfolderName(event.target.value)}
                                required
                            />
                        </div>

                        <div className="w-full">
                            <Button onClick={createFolder}>
                                {loading ? (
                                    <div className='text-center flex justify-center items-center'>
                                        Creating folder .....
                                    </div>
                                ) : (
                                    <div className='text-center flex justify-center items-center'>
                                        Create folder
                                    </div>
                                )}
                            </Button>
                        </div>

                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
}


export default ModalComponent