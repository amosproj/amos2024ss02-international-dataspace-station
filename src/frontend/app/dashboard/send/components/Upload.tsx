'use client'
import React from 'react';
import { useState, useEffect } from 'react';
import Modal from './Modal';
import FileTable from './FileTable';
import { FileInfo, Policy } from "../../../../data/interface/file";
import { createAsset, createContractDefinition, uploadFile, getPolicies } from '@/actions/api';


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
    uploadedFiles: FileInfo[];
}

const Upload: React.FC<UploadProps> = ({ fetchFiles, uploadedFiles }) => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [fileName, setFileName] = useState<string | null>(null);
    const [showModal, setShowModal] = useState(false);
    const [output, setOutput] = useState('');
    const [connectionMessage, setConnectionMessage] = useState('');
    const [policies, setPolicies] = useState<Policy[]>([]);

    useEffect(() => {
        const fetchPolicies = async () => {
            try {
                const policies = await getPolicies();
                setPolicies(policies);
            } catch (err) {
                // TODO: Display error fetching policies
                console.error("Failed to fetch policies", err);
            }
        };
        fetchPolicies();
    }, [showModal]);

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

    function getFileSizeString(size: number) {
        var fileSizes = new Array('Bytes', 'KB', 'MB', 'GB');
        var i = 0;
        while (size > 900) {
            size /= 1024;
            i++;
        }
        return (Math.round(size*100)/100) + " " + fileSizes[i];
    }

    const handleFileUpload = async (title: string, policyId: string) => {
        if (selectedFile) {
            const formData = new FormData();
            formData.append('file', selectedFile);
            try {
                const databaseInfo = await uploadFile(formData);
                const fileInfo: FileInfo = {
                    name: selectedFile.name,
                    title: title || "Untitled File",
                    size: getFileSizeString(selectedFile.size),
                    link: databaseInfo.url,
                    id: databaseInfo.id,
                    uploadDate: new Date().toJSON().slice(0,10)
                };
                createAsset(fileInfo);
                createContractDefinition("contract-" + databaseInfo.id, policyId, databaseInfo.id);
            } catch (err) {
                // TODO: Error message in frontend
                console.error(err);
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
            {showModal && <Modal setShowModal={setShowModal} handleFileChange={handleFileChange} handleFileUpload={handleFileUpload} policies={policies}/>}
        </div>
    );
};

export default Upload;
