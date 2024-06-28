import React, { useState, useEffect } from 'react';

interface PortsProps {
    port: number;
}

export default function ConnectorStatus({ port }: PortsProps) {
    const [status, setStatus] = useState<string>('Checking connector status...');

    useEffect(() => {
        const fetchStatus = async () => {
            try {
                const response = await fetch(`/api/check_port?port=${port}`); 
                const data = await response.json();
                if (data.status === 'running') {
                    setStatus('Connector is running');
                    console.log(`Connector is running on port ${port}`)
                } else {
                    setStatus(`Connector is not running `);
                    console.log(`Connector is not running on port ${port}`)
                }
            } catch (error) {
                console.error('Error occurred while checking connector status:', error);
                setStatus('Error occurred while checking connector status');
            }
        };

        fetchStatus();
    }, [port]);

    return status;
}