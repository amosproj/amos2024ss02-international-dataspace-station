'use client';
import React, { useState, useEffect } from 'react';

import { ArrowPathIcon, TrashIcon, CloudArrowDownIcon, XCircleIcon, CheckCircleIcon } from '@heroicons/react/24/outline';
import { createAsset, createContractDefinition, getAssets, uploadFile, getPolicies, fetchCatalogItems, deleteAsset, deleteContractDefinition, deleteFile, getContractDefinitions, getNegotiatedContractsAsProvider, ContractAgreement } from '@/actions/api';
import { FileInfo, Policy, Asset, CatalogItem } from "@/data/interface/file";
import PolicyDropdown from './PolicyDropdown';
import PolicyModal from './policyModal';
import { toast } from 'react-toastify';

const MAX_FILE_SIZE_MB = 10;

const UploadPage: React.FC = () => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [title, setTitle] = useState('');
    const [policy, setPolicy] = useState<Policy | null>(null);
    const [showModal, setShowModal] = useState(false);
    const [showPolicyModal, setShowPolicyModal] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [files, setFiles] = useState<Asset[]>([]);
    const [contractDefinitions, setContractDefinitions] = useState<[]>([]);
    const [policies, setPolicies] = useState<Policy[]>([]);
    const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
    const [hoveredItem, setHoveredItem] = useState<string | null>(null);
    const [hoveredAgreementCount, setHoveredAgreementCount] = useState<string | null>(null);
    const [contractAgreements, setContractAgreements] = useState<ContractAgreement[]>([]);

    const [loadingAssets, setLoadingAssets] = useState<boolean>(false);

    useEffect(() => {
        fetchAssets();
        fetchPolicies();
    }, []);

    const handleMouseEnterOffered = (fileId: string) => {
        setHoveredItem(fileId);
    }
    const handleMouseLeave = () => {
        setHoveredItem(null);
    }

    const handleMouseEnterAgreement = (fileId: string) => {
        setHoveredAgreementCount(fileId);
    }
    const handleMouseLeaveAgreement = () => {
        setHoveredAgreementCount(null);
    }

    const getPolicyInfo = (policyId: string) => {
        const policy = policies.find(policy => policy.id === policyId);
        return policy || null;
    }

    const getPolicyFromContract = (contractId: string) => {
        const contract = contractDefinitions.find(contract => contract["@id"] === contractId);
        if (!contract) return null;
        return getPolicyInfo(contract["accessPolicyId"]);
    }

    const fetchAssets = async () => {
        try {
            setLoadingAssets(true);
            const assets = updateLinksForLocalhost(await getAssets());
            setFiles(assets);
            const ownContractDefinitions = await getContractDefinitions();
            setContractDefinitions(ownContractDefinitions);
            await fetchContractAgreements();
        } catch (error) {
            console.error('Error fetching assets:', error);
            toast.error("There was an error fetching the assets");
        } finally {
            setLoadingAssets(false);
        }
    };

    const fetchContractAgreements = async () => {
        try {
            setContractAgreements(await getNegotiatedContractsAsProvider());
        } catch (error) {
            console.error("Error fetching negotiated contracts: ", error);
            toast.error("There was an error fetching the contract agreements");
        }

    }

    const countContracts = (assetId: string) => {
        let count = 0
        for (const agreement of contractAgreements) {
            if (agreement.assetId === assetId) count++;
        }
        return count;
    }

    const getAgreementConsumerIds = (assetId: string) => {
        const consumerIdSet = new Set<string>();
        for (const agreement of contractAgreements) {
            if (agreement.assetId === assetId) consumerIdSet.add(agreement.consumerId);
        }
        return Array.from(consumerIdSet);
    }

    const deleteCallback = async (asset: Asset) => {
        try {
            await deleteContractDefinition("contract-" + asset.id)
            try {
                await deleteAsset(asset.id);
                await deleteFile(asset.id);
                toast.success("Asset has been deleted from connector and database");
            } catch (err) {
                console.error("Asset could not be deleted: ", err);
                toast.info("Asset could not be deleted because it is referenced by a contract agreement. However asset is no longer being offered.")
            }
        } catch (err) {
            console.error("Contract could not be deleted: ", err);
            toast.error("Contract could not be deleted.");
        } finally {
            await fetchAssets();
        }
    }

    function updateLinksForLocalhost(files: Asset[]): Asset[] {
        return files.map(file => {

            const updatedLink = file.baseUrl.replace(/.*\/files\/get\/(.*)$/, '/api/downloadFile?id=$1');
            return { ...file, baseUrl: updatedLink };
        });
    };

    const isOffered = (fileId: string): boolean => {
        try {
            return contractDefinitions.some(item => item["@id"] === "contract-" + fileId);
        } catch (err) {
            console.error("Failed to look for contracts: ", err)
            return false;
        }
    }

    const fetchPolicies = async () => {
        try {
            const fetchedPolicies = await getPolicies();
            setPolicies(fetchedPolicies);
        } catch (error) {
            console.error('Error fetching policies:', error);
            toast.error("There was an error fetching the policies");
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

    const closeModal = () => {
        setTitle('');
        setPolicy(null);
        setSelectedFile(null);
        fetchAssets();
        setShowModal(false);
        setErrorMessage("");
        setIsSubmitted(false);
    }

    const handleFileUpload = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitted(true);
        if (!policy) return;

        if (selectedFile && title && policy?.id) {
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
                await createContractDefinition(`contract-${databaseInfo.id}`, policy.id, databaseInfo.id);
                closeModal();
            } catch (error) {
                console.error('Error uploading file:', error);
                setErrorMessage('Error uploading file.');
                toast.error("There was an error uploading the file.");
            }
        } else {
            setErrorMessage('Please fill in all fields and select a file.');
        }
    };

    const handleDropdownChange = (policy: Policy) => {
        setPolicy(policy);
        setIsSubmitted(false);
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
            <div className="flex justify-end mb-4 gap-2">
                <button
                    onClick={() => {toast.dismiss(); fetchAssets();}}
                    className="px-4 py-2 bg-neonBlue rounded flex items-center"
                    disabled={loadingAssets}
                >
                    <ArrowPathIcon className={`w-5 h-5 ${loadingAssets ? "spinning" : ""}`} />
                </button>
                <button onClick={() => {setShowModal(true); fetchPolicies();}} className="px-4 py-2 bg-neonGreen rounded">
                    Upload File
                </button>
                <button onClick={() => setShowPolicyModal(true)} className="px-4 py-2 bg-neonGreen rounded">
                    Create Policy
                </button>
            </div>
            <div className="overflow-x-auto  overflow-y-clip">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                    <tr>
                        {['Title', 'Name', 'Size', 'Date', 'Author', 'Content Type', 'Negotiated', 'Offered', 'Actions'].map((label) => (
                            <th key={label} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                {label}
                            </th>
                        ))}
                    </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                    {files.map((file: Asset) => {
                        const policy = getPolicyFromContract("contract-" + file.id);
                        return (
                        <tr key={file.id}>
                            <td className="px-6 py-4 text-sm text-gray-900 break-words font-bold">{file.title}</td>
                            <td className="px-6 py-4 text-sm font-medium text-gray-500 break-words">{file.name}</td>
                            <td className="px-6 py-4 text-sm text-gray-500">{file.size}</td>
                            <td className="px-6 py-4 text-sm text-gray-500">{file.date}</td>
                            <td className="px-6 py-4 text-sm text-gray-500">{file.author}</td>
                            <td className="px-6 py-4 text-sm text-gray-500">{file.contenttype}</td>
                            <td className={`px-6 py-4 text-sm text-gray-500 relative text-center ${countContracts(file.id) !== 0 ? "font-bold" : ""}`} onMouseEnter={() => handleMouseEnterAgreement(file.id)} onMouseLeave={() => handleMouseLeaveAgreement()}>
                                {countContracts(file.id)}

                                { (hoveredAgreementCount === file.id && countContracts(file.id) !== 0) && (
                                    <div className="absolute left-0 mt-2 text-left">
                                        <div className="fixed mt-2 -translate-x-1/2 w-64 p-2 bg-white border border-gray-300 rounded shadow-lg z-10 ml-12">
                                            <div className="text-xs text-gray-300 font-bold">AGREED WITH</div>
                                            <div className="font-bold text-black text-lg">{getAgreementConsumerIds(file.id).join(", ")}</div>
                                        </div>
                                    </div>
                                )}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-500 relative">
                                {isOffered(file.id) ? (
                                    
                                    <CheckCircleIcon className="w-5 h-5 text-green-500 ml-4 scale-150" onMouseEnter={() => handleMouseEnterOffered(file.id)} onMouseLeave={handleMouseLeave}/>
                                ) : (
                                    <XCircleIcon className="w-5 h-5 text-red-500 ml-4 scale-150"/>
                                )}
                                { hoveredItem === file.id && (
                                    <div className="absolute left-0 mt-2">
                                        <div className="fixed mt-2 -translate-x-1/2 w-64 p-2 bg-white border border-gray-300 rounded shadow-lg z-10 ml-12">
                                            <div className="text-xs text-gray-300 font-bold">OFFERED WITH</div>
                                            <div className="font-bold text-black text-lg">{policy?.name}</div>
                                            <div className="text-sm text-gray-700">{policy?.description}</div>
                                        </div>
                                    </div>
                                )}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-500 flex space-x-2">
                                <button onClick={() => handleDownload(file.baseUrl)} className="flex items-center px-4 py-2 bg-green-500 text-white rounded">
                                    <CloudArrowDownIcon className="w-5 h-5" />
                                </button>
                                <button onClick={() => deleteCallback(file)} className="flex items-center px-4 py-2 bg-red-500 text-white rounded">
                                    <TrashIcon className="w-5 h-5" />
                                </button>
                            </td>
                        </tr>
                    )})}
                    </tbody>
                </table>
            </div>

            <PolicyModal isOpen={showPolicyModal} onClose={() => {setShowPolicyModal(false); fetchPolicies();}} />

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
                                <label className="block mb-2 text-sm font-medium">Policy</label>
                                <PolicyDropdown policies={policies} value={policy} onChange={handleDropdownChange}/>
                                <div className="h-5">
                                    {isSubmitted && !policy && (
                                        <p style={{ color: 'red' }}>Please select a policy.</p>
                                    )}
                                </div>
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
                                <button onClick={() => closeModal()} className="px-4 py-2 bg-gray-500 text-white rounded mr-2">
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
