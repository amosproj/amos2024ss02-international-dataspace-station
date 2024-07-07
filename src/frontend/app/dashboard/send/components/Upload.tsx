import { useState } from 'react';
import Modal from './Modal';
import FileTable from './FileTable';

interface FileDetails {
    id: string;
    title: string;
    sender: string;
    receiver: string;
    date: string;
    fileTitle: string;
    fileSize: string;
    link: string;
}

interface UploadProps {
    fetchFiles: () => void;
    uploadedFiles: FileDetails[];
}

const Upload: React.FC<UploadProps> = ({ fetchFiles, uploadedFiles }) => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [fileName, setFileName] = useState<string | null>(null);
    const [showModal, setShowModal] = useState(false);
    const [output, setOutput] = useState('');
    const [connectionMessage, setConnectionMessage] = useState('');

    const handleClick = async () => {
        const response = await fetch('/api/execute_command');
        const data = await response.json();
        setOutput(data.output);

        if (data.results && data.results.length > 0) {
            const lastCommandResult = data.results[data.results.length - 1];
            if (lastCommandResult.output) {
                setConnectionMessage('The connection has been established.');
            } else {
                setConnectionMessage('Failed to establish the connection.');
            }
        }
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            const file = event.target.files[0];
            setSelectedFile(file);
            setFileName(file.name);
        }
    };

    const handleFileUpload = async () => {
        if (selectedFile) {
            const formData = new FormData();
            formData.append('file', selectedFile[0]);

            try {
                const response = await fetch('http://database:8080/files/upload', {
                    method: 'POST',
                    body: formData,
                });

                if (response.ok) {
                    const fileId = await response.text();
                    console.log(`File uploaded successfully with ID: ${fileId}`);
                    fetchFiles();
                    setShowModal(false);
                } else {
                    console.error('Failed to upload file:', response.status);
                }
            } catch (error) {
                console.error('Error uploading file:', error);
            }
        }
    };

    return (
        <div>
            <div className="flex justify-end mb-4">
                <button onClick={handleClick} className="px-4 py-2 rounded-md bg-neonGreen hover:bg-neonBlue text-white mr-2">
                    Execute Command
                </button>
                <button onClick={() => setShowModal(true)} className="px-4 py-2 rounded-md bg-neonGreen hover:bg-neonBlue text-white">
                    Upload File
                </button>
            </div>
            {output && <pre>{output}</pre>}
            {connectionMessage && <p className="text-black">{connectionMessage}</p>}
            <FileTable files={uploadedFiles} />
            {showModal && <Modal setShowModal={setShowModal} handleFileChange={handleFileChange} fileName={fileName} handleFileUpload={handleFileUpload} />}
        </div>
    );
};

export default Upload;
