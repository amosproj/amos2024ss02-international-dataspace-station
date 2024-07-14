import React, { useState, useEffect } from 'react';
import { ArrowPathIcon } from '@heroicons/react/24/solid';
import { isConnectorRunning, isDatabaseRunning } from '@/actions/api';
import ChangeStatusButton from './change_status';

interface ConnectorStatusProps {
        connectorName: string | undefined;
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
            const connectorRunningResponse = await isConnectorRunning(connectorName || "");
            if (connectorRunningResponse) {
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
            const databaseRunningResponse = await isDatabaseRunning(connectorName || "");
            if (databaseRunningResponse) {
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
        <div className={`flex bg-gray-100 border-2 rounded-lg p-5 text-black flex-col pr-32 ${
            running === null || dbRunning === null
            ? '' 
            : running && dbRunning
            ? 'border-green-500' 
            : 'border-red-500'
        }`}>
            <div className="flex flex-row">
                <div className="flex items-baseline space-x-4">
                    <button 
                        onClick={fetchStatus}
                        className="px-4 py-2 text-black bg-white rounded hover:bg-neonBlue shadow-xl flex"
                    >
                        <ArrowPathIcon className="w-6 mr-1"/>
                        Refresh
                    </button>
                    <div className="flex flex-col gap-4">
                        <div className={`status-field ${
                                    running === null 
                                    ? 'bg-gray-100' 
                                    : running 
                                    ? 'bg-green-100 border-green-500' 
                                    : 'bg-red-100 border-red-500'
                                }`}>
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

                        <div className={`status-field ${
                                    dbRunning === null 
                                    ? 'bg-gray-100' 
                                    : dbRunning 
                                    ? 'bg-green-100 border-green-500' 
                                    : 'bg-red-100 border-red-500'
                                }`}>
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
            <ChangeStatusButton connectorName={connectorName} connectorStatus={running} callbackFunction={fetchStatus}/>
        </div>
    );
}