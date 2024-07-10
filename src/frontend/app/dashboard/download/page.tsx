'use client';
import React, { useState, useEffect } from 'react';
import { CloudArrowDownIcon } from '@heroicons/react/24/outline';
import { getAssets } from '@/actions/api';
import { FileInfo } from "../../../../data/interface/file";
import ports from '@/data/ports.json';
import { User } from "../../../../data/interface/user";
import Cookies from 'js-cookie';
import {Asset} from "../../../data/interface/file";

const DownloadPage: React.FC = () => {
    const [connector, setConnector] = useState<string>('');
    const [assets, setAssets] = useState<FileInfo[]>([]);
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [loggedInUser, setLoggedInUser] = useState<User | null>(null);

    useEffect(() => {
        const userCookie = Cookies.get('user');
        if (userCookie) {
            const user = JSON.parse(userCookie) as User;
            setLoggedInUser(user);
        }
    }, []);

    useEffect(() => {
        if (connector) {
            fetchAssets();
        } else {
            setAssets([]);
        }
    }, [connector]);

    function updateLinksForLocalhost(files: Asset[]): Asset[] {
        const isLocalhost = location.hostname === "localhost" || location.hostname === "127.0.0.1";
        if (isLocalhost) {
            return files.map(file => {
                const updatedLink = file.baseUrl.replace(/http:\/\/[^/]+:8080/, 'http://localhost:8080');
                return { ...file, baseUrl: updatedLink };
            });
        }

        return files;
    };

    const fetchAssets = async () => {
        try {
            const fetchedAssets = updateLinksForLocalhost(await getAssets());
            // Filter assets by connector if needed
            setAssets(fetchedAssets);
        } catch (error) {
            console.error('Error fetching assets:', error);
            setErrorMessage('Error fetching assets.');
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
                        {ports.map(({ role }) => (
                            role !== loggedInUser?.role &&
                            <option key={role} value={role}>
                                {role}
                            </option>
                        ))}
                    </select>
                    {/*<button*/}
                    {/*    onClick={fetchAssets}*/}
                    {/*    className="px-4 py-2 bg-green-500 text-white rounded flex items-center"*/}
                    {/*>*/}
                    {/*    Fetch*/}
                    {/*</button>*/}
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
                            {assets.map((file) => (
                                <tr key={file.id}>
                                    <td className="px-6 py-4 text-sm font-medium text-gray-900 break-words">{file.name}</td>
                                    <td className="px-6 py-4 text-sm text-gray-500">{file.size}</td>
                                    <td className="px-6 py-4 text-sm text-gray-500">{file.title}</td>
                                    <td className="px-6 py-4 text-sm text-gray-500">{file.date}</td>
                                    <td className="px-6 py-4 text-sm text-gray-500">{file.author}</td>
                                    <td className="px-6 py-4 text-sm text-gray-500">{file.contenttype}</td>
                                    <td className="px-6 py-4 text-sm text-gray-500">
                                        <button onClick={() => handleDownload(file.baseUrl)} className="flex items-center px-4 py-2 bg-neonGreen text-white rounded">
                                            {/*<CloudArrowDownIcon className="w-5 h-5 mr-2" /> */}
                                            GET
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
