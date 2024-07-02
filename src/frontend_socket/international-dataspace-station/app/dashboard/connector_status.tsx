import React, { useState, useEffect } from 'react';

export default function ConnectorStatus() {
    const [status, setStatus] = useState<string>('Checking connector status...');

    useEffect(() => {
        const fetchStatus = async () => {
            try {
                const response = await fetch(`/api/check_status`); 
                const data = await response.json();
                if (data.status === 'running') {
                    setStatus('Connector is running');
                    console.log(`Connector is running`)
                } else {
                    setStatus(`Connector is not running `);
                    console.log(`Connector is not running`)
                }
            } catch (error) {
                console.error('Error occurred while checking connector status:', error);
                setStatus('Error occurred while checking connector status');
            }
        };

        fetchStatus();
    });

    return status;
}