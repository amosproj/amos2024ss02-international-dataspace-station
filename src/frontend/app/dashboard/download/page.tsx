'use client';
import React, { useState, useEffect } from 'react';
import { fetchCatalogItems, getContractAgreementId, negotiateContract, startTransfer} from '@/actions/api';
import participants from '@/data/participants.json';
import { CatalogItem } from "@/data/interface/file";

const DownloadPage: React.FC = () => {
    const [connector, setConnector] = useState<string>('');
    const [catalogItems, setCatalogItems] = useState<CatalogItem[]>([]);
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [downloadUrl, setDownloadUrl] = useState<{ [key: string]: { url: string, authorization: string } }>({});

    useEffect(() => {
        setErrorMessage("");
        setCatalogItems([]);
        if (connector) {
            fetchItems();
        } else {
            setCatalogItems([]);
        }
    }, [connector]);

    const fetchItems = async () => {
        setErrorMessage("");
        try {
            const fetchedCatalog = await fetchCatalogItems(connector);
            setCatalogItems(fetchedCatalog);
        } catch (error) {
            console.error('Error fetching assets:', error);
            setErrorMessage('Error fetching assets.');
        }
    };

    const handleNegotiateClick = async (item: CatalogItem) => {
        setLoading(true);
        //setErrorMessage(null);
        try {
            const negotiationId = await negotiateContract(item);
            // Get agreement ID
            const agreementId = await getContractAgreementId(negotiationId);
            // Start transfer
            const { url, authorization } = await startTransfer(agreementId, item.id, item.author);

            if (url && authorization) {
                setDownloadUrl((prev) => ({ ...prev, [item.id]: { url, authorization } }));
            }
    
            // TODO: check if transfer was successfull
            console.log('Transfer started successfully:');

        } catch (err) {
            setErrorMessage(err.message);
            console.error('An error occurred:', err);
        } finally {
            setLoading(false);
        }

    };

    const handleDownload = async (itemId: string) => {
        const downloadInfo = downloadUrl[itemId];
        if (!downloadInfo) return;

        const { url, authorization } = downloadInfo;

        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${authorization}`
                }
            });

            if (!response.ok) {
                throw new Error(`Failed to download file: ${response.statusText}`);
            }

            const blob = await response.blob();
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = url.split('/').pop() || 'download';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error) {
            console.error('Error downloading file:', error);
            setErrorMessage('Error downloading file.');
        }
    };

    return (
        <div className="p-6">
            <div className="mb-4">
                <div className="flex items-center space-x-2 mt-1">
                    <select
                        id="connector"
                        name="connector"
                        value={connector}
                        onChange={(e) => setConnector(e.target.value)}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 mr-2"
                    >
                        <option value="">Select Connector</option>
                        {participants.map((participant) => (
                            participant.id !== process.env.NEXT_PUBLIC_CONNECTOR_NAME &&
                            <option key={participant.id} value={participant.id}>
                                {participant.displayName}
                            </option>
                        ))}
                    </select>
                    <button
                        onClick={fetchItems}
                        className="px-4 py-2 bg-neonGreen text-white rounded flex items-center"
                        disabled={!connector || loading}
                    >
                        {loading ? 'Loading...' : 'Refresh'}
                    </button>
                </div>
            </div>
            {connector && (
                <>
                    <h2 className="text-lg font-medium text-gray-700 mb-4">Files for {connector}</h2>
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
                            {catalogItems.map((item) => (
                                <tr key={item.id}>
                                    <td className="px-6 py-4 text-sm font-medium text-gray-900 break-words">{item.name}</td>
                                    <td className="px-6 py-4 text-sm text-gray-500">{item.size}</td>
                                    <td className="px-6 py-4 text-sm text-gray-500">{item.title}</td>
                                    <td className="px-6 py-4 text-sm text-gray-500">{item.date}</td>
                                    <td className="px-6 py-4 text-sm text-gray-500">{item.author}</td>
                                    <td className="px-6 py-4 text-sm text-gray-500">{item.contenttype}</td>
                                    <td className="px-6 py-4 text-sm text-gray-500">
                                    <button
                                            onClick={() => handleNegotiateClick(item)}
                                            className="px-4 py-2 bg-blue-500 text-white rounded"
                                            disabled={loading}
                                        >
                                            {loading ? 'Negotiating...' : 'Negotiate'}
                                        </button>
                                        {downloadUrl[item.id] && (
                                            <button
                                                onClick={() => handleDownload(item.id)}
                                                className="px-4 py-2 bg-green-500 text-white rounded ml-2"
                                            >
                                                Download
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </>
            )}
            {errorMessage && <p className="text-red-500 mt-4">{errorMessage}</p>}
        </div>
    );
};

export default DownloadPage;
