import React, { useState, useEffect } from 'react';
import { ArrowPathIcon } from '@heroicons/react/24/solid';

interface ConnectorStatusProps {
        connectorName: string | undefined;
}

function capitalizeFirstLetter(string: string | undefined) {
    if (string == undefined) return "";
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export default function ConnectorStatus({ connectorName }: ConnectorStatusProps) {
    const [status, setStatus] = useState<string>('Checking connector status...');
    const [running, setRunning] = useState<boolean | null>(null);

    const fetchStatus = async () => {
        try {
            setStatus("Checking connector status...");
            setRunning(null);
            const response = await fetch(`/api/check_status?connector=${connectorName}`); 
            const data = await response.json();
            console.log("STATUS: ", response.status);
            console.log(data);
            if (data.status == 'running') {
                setStatus(capitalizeFirstLetter(connectorName) + " connector is running!");
                console.log(capitalizeFirstLetter(connectorName) + " connector is running!");
                setRunning(true);
            } else {
                setStatus(capitalizeFirstLetter(connectorName) + " connector is not running!");
                console.log(capitalizeFirstLetter(connectorName) + " connector is not running!");
                setRunning(false);
            }
        } catch (error) {
            console.error('Error occurred while checking connector status:', error);
            setStatus('Error occurred while checking connector status');
            setRunning(null);
        }
    };

    useEffect(() => {
        fetchStatus();
    }, [connectorName]);

    return (
        <div className={`flex items-center bg-gray-100 border-2 rounded-lg p-5 text-black ${
            running === null 
            ? '' 
            : running 
            ? 'border-green-500' 
            : 'border-red-500'
        }`}>
            <div className="flex items-center space-x-4">
                <button 
                    onClick={fetchStatus}
                    className="px-4 py-2 text-black bg-white rounded hover:bg-neonBlue shadow-xl flex gap:1em"
                >
                    <ArrowPathIcon className="w-6 mr-1"/>
                    Refresh
                </button>
                <div className="flex items-center">
                    <span 
                        className={`h-4 w-4 rounded-full ${
                            running === null 
                            ? 'bg-gray-500' 
                            : running 
                            ? 'bg-green-500' 
                            : 'bg-red-500'
                        }`} 
                    />
                    <span className="ml-2">{status}</span>
                </div>
            </div>
        </div>
    );
}