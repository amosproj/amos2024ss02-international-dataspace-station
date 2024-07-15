'use client';
import React, { useState, useEffect } from 'react';
import { fetchCatalogItems, getContractAgreementId, getEnrichedContractAgreements, getNegotiatedContracts, negotiateContract, startTransfer, uploadContractAgreementInfo} from '@/actions/api';
import participants from '@/data/participants.json';
import { CatalogItem, EnrichedContractAgreement } from "@/data/interface/file";
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import 'react-tabs/style/react-tabs.css'; 

const DownloadPage: React.FC = () => {
    const [connector, setConnector] = useState<string>('');
    const [catalogItems, setCatalogItems] = useState<CatalogItem[]>([]);
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [errorMessageNegotiated, setErrorMessageNegotiated] = useState<string>("");
    const [negotiatingId, setNegotiatingId] = useState<string>("");
    const [negotiatedContracts, setNegotiatedContracts] = useState<EnrichedContractAgreement[]>([]);
    const [activeTabIndex, setActiveTabIndex] = useState(0);


    useEffect(() => {
        setCatalogItems([]);
        setNegotiatedContracts([]);
        if (connector) {
            fetchItems();
        }
    }, [connector]);

    const fetchItems = async () => {
        setErrorMessage("");
        setErrorMessageNegotiated("");
        try {
            const fetchedCatalog = await fetchCatalogItems(connector);
            setCatalogItems(fetchedCatalog);
        } catch (error) {
            console.error('Error fetching assets:', error);
            setErrorMessage('Error fetching assets.');
        }
        try {
            const negotiatedContracts = await getEnrichedContractAgreements(connector);
            setNegotiatedContracts(negotiatedContracts);
        } catch (error) {
            console.error("Error fetching negotiated contracts");
            setErrorMessageNegotiated("Error fetching contract agreements.");
        }
    };

    const handleNegotiateClick = async (item: CatalogItem) => {
        setNegotiatingId(item.id);
        try {
            const negotiationId = await negotiateContract(item);
            // Get agreement ID
            const agreementId = await getContractAgreementId(negotiationId);

            await uploadContractAgreementInfo(item, agreementId);

            fetchItems();

        } catch (err) {
            setErrorMessage(err.message);
            console.error('Error negotiating contract', err);
        } finally {
            setNegotiatingId("");
        }

    };

    const handleDownload = async (agreementId: string, assetId: string, counterPartyname: string) => {
        try {
            const {url, authorization} = await startTransfer(agreementId, assetId, counterPartyname);
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Authorization': `${authorization}`
                }
            });

            if (!response.ok) {
                throw new Error(`Failed to download file: ${response.statusText}`);
            }

            const blob = await response.blob();
            const downloadUrl = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = downloadUrl;
            link.download = url.split('/').pop() || 'download';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(downloadUrl);
        } catch (error) {
            console.error('Error downloading file:', error);
            setErrorMessage('Error downloading file.');
        }
    };
    
    const handleTabSelect = (index: number) => {
        setActiveTabIndex(index); // Update active tab index
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
                        disabled={!connector || negotiatingId !== ""}
                    >
                        Refresh
                    </button>
                </div>
            </div>
            {connector && (
                <>

                <Tabs defaultIndex={0} onSelect={handleTabSelect}>
                    <TabList className="flex border-b border-gray-200">
                        <Tab className={`px-4 py-2 cursor-pointer ${activeTabIndex === 0 ? 'text-black border-b-2 border-blue-600' : 'text-gray-500'}`}>
                            Catalog Offers
                        </Tab>
                        <Tab className={`px-4 py-2 cursor-pointer ${activeTabIndex === 1 ? 'text-black border-b-2 border-blue-600' : 'text-gray-500'}`}>
                            Negotiated Contracts
                        </Tab>
                    </TabList>
                    <TabPanel>
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
                                                <button onClick={() => handleNegotiateClick(item)}
                                                    className={`flex items-center px-4 py-2 text-white rounded ${negotiatedContracts.some(contract => contract.assetId === item.id) ? 'bg-gray-300 cursor-not-allowed' : 'bg-neonGreen'} ${negotiatingId === item.id ? "cursor-wait" : ""}`}
                                                    disabled={negotiatingId === item.id || negotiatedContracts.some(contract => contract.assetId === item.id)}>
                                                    {negotiatedContracts.some(contract => contract.assetId === item.id) ? "NEGOTIATED" : 'NEGOTIATE'}
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        {errorMessage && <p className="text-red-500 mt-4">{errorMessage}</p>}
                    </TabPanel>

                    <TabPanel>
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
                                    {negotiatedContracts.map((item) => (
                                        <tr key={item.id}>
                                            <td className="px-6 py-4 text-sm font-medium text-gray-900 break-words">{item.fileName}</td>
                                            <td className="px-6 py-4 text-sm text-gray-500">{item.fileSize}</td>
                                            <td className="px-6 py-4 text-sm text-gray-500">{item.title}</td>
                                            <td className="px-6 py-4 text-sm text-gray-500">{item.date}</td>
                                            <td className="px-6 py-4 text-sm text-gray-500">{item.author}</td>
                                            <td className="px-6 py-4 text-sm text-gray-500">{item.contenttype}</td>
                                            <td className="px-6 py-4 text-sm text-gray-500">
                                                <button onClick={() => handleDownload(item.id, item.assetId, connector)}
                                                    className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded"
                                                >
                                                    DOWNLOAD
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        {errorMessageNegotiated && <p className="text-red-500 mt-4">{errorMessageNegotiated}</p>}
                    </TabPanel>
                </Tabs>
                </>
            )}
            
        </div>
    );
};

export default DownloadPage;