'use client';
import React, { useState, useEffect } from 'react';
import { ArrowPathIcon, TrashIcon, CloudArrowDownIcon } from '@heroicons/react/24/outline';
import { createAsset, createContractDefinition, getAssets, uploadFile, getPolicies } from '@/actions/api';
import { FileInfo, Policy, Asset } from "@/data/interface/file";

const MAX_FILE_SIZE_MB = 10;

const UploadPage: React.FC = () => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [title, setTitle] = useState('');
    const [policyId, setPolicyId] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [files, setFiles] = useState<Asset[]>([]);
    const [policies, setPolicies] = useState<Policy[]>([]);

    useEffect(() => {
        fetchAssets();
        fetchPolicies();
    }, []);

    const fetchAssets = async () => {
        try {
            const assets = updateLinksForLocalhost(await getAssets());
            setFiles(assets);
        } catch (error) {
            console.error('Error fetching assets:', error);
        }
    };

    function updateLinksForLocalhost(files: Asset[]): Asset[] {
        const isLocalhost = location.hostname === "localhost" || location.hostname === "127.0.0.1";
        if (isLocalhost) {
            return files.map(file => {
                var port: string;
                switch (process.env.NEXT_PUBLIC_CONNECTOR_NAME) {
                    case "company":
                        port = "8081";
                        break;
                    case "taxadvisor":
                        port = "8082";
                        break;
                    case "bank":
                        port = "8083";
                        break;
                    default:
                        port = "8080";
                }
                const updatedLink = file.baseUrl.replace(/http:\/\/[^/]+:8080/, 'http://localhost:' + port);
                return { ...file, baseUrl: updatedLink };
            });
        }

        return files;
    };

    const fetchPolicies = async () => {
        try {
            const fetchedPolicies = await getPolicies();
            setPolicies(fetchedPolicies);
        } catch (error) {
            console.error('Error fetching policies:', error);
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const file = e.target.files[0];
            if (file.size / 1024 / 1024 > MAX_FILE_SIZE_MB) {
                setErrorMessage(`File size should be less than ${MAX_FILE_SIZE_MB} MB.`);
                setSelectedFile(null);
            } else {
                setSelectedFile(file);
                setErrorMessage('');
            }
        }
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

    const handleFileUpload = async (e: React.FormEvent) => {
        e.preventDefault();
        if (selectedFile && title && policyId) {
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
                    contenttype: selectedFile.type,
                    uploadDate: new Date().toJSON().slice(0,10)
                };
                await createAsset(fileInfo);
                await createContractDefinition(`contract-${databaseInfo.id}`, policyId, databaseInfo.id);
                setTitle('');
                setPolicyId('');
                setSelectedFile(null);
                fetchAssets();
                setShowModal(false);
            } catch (error) {
                console.error('Error uploading file:', error);
                setErrorMessage('Error uploading file.');
            }
        } else {
            setErrorMessage('Please fill in all fields and select a file.');
        }
    };

    const handleDownload = (url: string) => {
        const link = document.createElement('a');
        link.href = url;
        link.download = url.split('/').pop() || 'download';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="p-6">
            <div className="flex justify-end mb-4">
                <button
                    onClick={fetchAssets}
                    className="px-4 py-2 mr-2 bg-neonBlue rounded flex items-center"
                >
                    <ArrowPathIcon className="w-5 h-5" />
                </button>
                <button onClick={() => setShowModal(true)} className="px-4 py-2 bg-neonGreen rounded">
                    Upload File
                </button>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                    <tr>
                        {['Name', 'Size', 'Title', 'Date', 'Author', 'Content Type', 'Actions'].map((label) => (
                            <th key={label} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                {label}
                            </th>
                        ))}
                    </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                    {files.map((file: Asset) => (
                        <tr key={file.id}>
                            <td className="px-6 py-4 text-sm font-medium text-gray-900 break-words">{file.name}</td>
                            <td className="px-6 py-4 text-sm text-gray-500">{file.size}</td>
                            <td className="px-6 py-4 text-sm text-gray-500">{file.title}</td>
                            <td className="px-6 py-4 text-sm text-gray-500">{file.date}</td>
                            <td className="px-6 py-4 text-sm text-gray-500">{file.author}</td>
                            <td className="px-6 py-4 text-sm text-gray-500">{file.contenttype}</td>
                            <td className="px-6 py-4 text-sm text-gray-500 flex space-x-2">
                                <button onClick={() => handleDownload(file.baseUrl)} className="flex items-center px-4 py-2 bg-green-500 text-white rounded">
                                    <CloudArrowDownIcon className="w-5 h-5" />
                                </button>
                                <button className="flex items-center px-4 py-2 bg-red-500 text-white rounded" disabled>
                                    <TrashIcon className="w-5 h-5" />
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 text-black">
                    <div className="bg-white p-6 rounded">
                        <form onSubmit={handleFileUpload} className="flex gap-4 flex-col">
                            <div>
                                <label htmlFor="title" className="block mb-2 text-sm font-medium">Title</label>
                                <input
                                    type="text"
                                    name="title"
                                    id="title"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    className="border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="policy" className="block mb-2 text-sm font-medium">Policy</label>
                                <select
                                    name="policy"
                                    id="policy"
                                    value={policyId}
                                    onChange={(e) => setPolicyId(e.target.value)}
                                    className="border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    required
                                >
                                    <option value="">Select Policy</option>
                                    {policies.map((policy: Policy) => (
                                        <option key={policy.id} value={policy.id}>{policy.name}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label htmlFor="file" className="block mb-2 text-sm font-medium">File</label>
                                <input
                                    type="file"
                                    name="file"
                                    id="file"
                                    onChange={handleFileChange}
                                    className="border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    required
                                />
                            </div>
                            {errorMessage && <p className="text-red-500">{errorMessage}</p>}

                            <div className="flex justify-end">
                                <button onClick={() => setShowModal(false)} className="px-4 py-2 bg-gray-500 text-white rounded mr-2">
                                    Cancel
                                </button>
                                <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded">
                                    Upload
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UploadPage;
