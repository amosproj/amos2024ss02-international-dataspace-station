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

    const [dbStatus, setDbStatus] = useState<string>('Checking database status...');
    const [dbRunning, setDbRunning] = useState<boolean | null>(null);

    var connectorStatus: string;
    var connectorRunning: boolean | null;
    var databaseStatus: string;
    var databaseRunning: boolean | null;

    const fetchStatus = async () => {
        setStatus("Checking connector status...");
        setRunning(null);
        setDbStatus("Checking database status...");
        setDbRunning(null);

        try {
            const response = await fetch(`/api/check_status?connector=${connectorName}`); 
            const data = await response.json();
            if (data.status == 'running') {
                connectorStatus = "Connector is running!";
                connectorRunning = true;
            } else {
                connectorStatus = "Connector is not running!";
                connectorRunning = false;
            }
        } catch (error) {
            console.error('Error occurred while checking connector status:', error);
            connectorStatus = 'Error occurred while checking connector status';
            connectorRunning = null;
        }

        try {
            const response = await fetch(`/api/check_db_status?connector=${connectorName}`); 
            const data = await response.json();
            if (data.status == 'running') {
                databaseStatus = "Database is running!";
                databaseRunning = true;
            } else {
                databaseStatus = "Database is not running!";
                databaseRunning = false;
            }
        } catch (error) {
            console.error('Error occurred while checking database status:', error);
            databaseStatus = 'Error occurred while checking database status';
            databaseRunning = null;
        }
        setStatus(connectorStatus);
        setRunning(connectorRunning);
        setDbStatus(databaseStatus);
        setDbRunning(databaseRunning);

    };

    useEffect(() => {
        fetchStatus();
    }, [connectorName]);

    return (
        <div className={`flex items-center bg-gray-100 border-2 rounded-lg p-5 text-black ${
            running === null || dbRunning === null
            ? '' 
            : running && dbRunning
            ? 'border-green-500' 
            : 'border-red-500'
        }`}>
            <div className="flex items-center space-x-4">
                <button 
                    onClick={fetchStatus}
                    className="px-4 py-2 text-black bg-white rounded hover:bg-neonBlue shadow-xl flex"
                >
                    <ArrowPathIcon className="w-6 mr-1"/>
                    Refresh
                </button>
                <div className="flex flex-col gap-1">
                    <div className="flex items-center border-b-2 pb-1">
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

                    <div className="flex items-center">
                        <span 
                            className={`h-4 w-4 rounded-full ${
                                dbRunning === null 
                                ? 'bg-gray-500' 
                                : dbRunning 
                                ? 'bg-green-500' 
                                : 'bg-red-500'
                            }`} 
                        />
                        <span className="ml-2">{dbStatus}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}