'use client';
import React, { useState, useEffect } from 'react';
import { ArrowPathIcon } from '@heroicons/react/24/outline';
import { fetchCatalogItems } from '@/actions/api';
import participants from '@/data/participants.json';
import { CatalogItem } from "@/data/interface/file";
import { toast } from 'react-toastify';

const DownloadPage: React.FC = () => {
    const [connector, setConnector] = useState<string>('');
    const [catalogItems, setCatalogItems] = useState<CatalogItem[]>([]);
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [loadingItems, setLoadingItems] = useState<boolean>(false);


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
        try {
            setLoadingItems(true);
            setErrorMessage("");
            toast.dismiss();
            const fetchedCatalog = await fetchCatalogItems(connector);
            // Filter assets by connector if needed
            setCatalogItems(fetchedCatalog);
        } catch (error) {
            console.error('Error fetching assets:', error);
            setErrorMessage('Error fetching assets.');
            toast.error("There was an error fetching the assets of " + participants.find(p => p.id === connector)?.displayName)
        } finally {
            setLoadingItems(false);
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
                        className="px-4 py-2 bg-neonBlue rounded flex items-center"
                        disabled={loadingItems}
                    >
                        <ArrowPathIcon className={`w-5 h-5 ${loadingItems ? "spinning" : ""}`} />
                    </button>
                </div>
            </div>
            {connector && (
                <>
                    <h2 className="text-lg font-medium text-gray-700 mb-4">Files for <b>{participants.find(p => p.id === connector)?.displayName}</b></h2>
                    <div className="overflow-x-auto overflow-y-clip">
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
                                        <button onClick={() => console.log(item)} className="flex items-center px-4 py-2 bg-neonGreen text-white rounded">
                                            NEGOTIATE
                                        </button>
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
