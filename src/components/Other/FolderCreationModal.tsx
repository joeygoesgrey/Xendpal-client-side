import { Button, Modal, TextInput } from 'flowbite-react';
import { useState } from 'react';
import { API } from '@/utils/utils'

function ModalComponent() {
    const [openModal, setOpenModal] = useState(false);
    const [folderName, setfolderName] = useState('');

    function onCloseModal() {
        setOpenModal(false);
        setfolderName('');
    }
    // Function to create a folder
    const createFolder = async () => {
        try {
            // Send a POST request to your server with the folder name
            const response = await API.post('/user/create_folder', { name: folderName });
            console.log(response.data); // Handle the response as needed
            onCloseModal(); // Close the modal after successful creation
        } catch (error) {
            console.error('Error creating folder:', error);
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
                            <Button onClick={createFolder}>Create folder</Button>
                        </div>

                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
}


export default ModalComponent