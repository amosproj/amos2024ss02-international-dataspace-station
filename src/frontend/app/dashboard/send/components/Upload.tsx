'use client'
import React from 'react';
import { useState } from 'react';
import Modal from './Modal';
import FileTable from './FileTable';
import {File} from "../../../../data/interface/file";


const config = [
    { label: 'Title', field: 'title' },
    { label: 'File Size', field: 'size' },
    { label: 'Link', field: 'link' },
    { label: 'Upload Date', field: 'uploadDate' },
    { label: 'File Type', field: 'type' },
    { label: 'Actions', field: 'actions' }
];

interface UploadProps {
    fetchFiles: () => void;
    uploadedFiles: File[];
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

    const handleFileChange = (file: File | null) => {
        setSelectedFile(file);
        setFileName(file ? file.name : null);
    };

    const handleFileUpload = async () => {
        if (selectedFile) {
            const formData = new FormData();
            formData.append('file', selectedFile);

            try {
                const response = await fetch('/api/uploadFile', {
                    method: 'POST',
                    body: formData
                });

                if (response.ok) {
                    const result = await response.json();
                    console.log(`File uploaded successfully with ID: ${result.id}`);
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
            <FileTable files={uploadedFiles} config={config}/>
            {showModal && <Modal setShowModal={setShowModal} handleFileChange={handleFileChange} fileName={fileName} handleFileUpload={handleFileUpload} />}
        </div>
    );
};

export default Upload;
