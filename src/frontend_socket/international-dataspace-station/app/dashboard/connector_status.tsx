import React, { useState, useEffect } from 'react';

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export default function ConnectorStatus() {
    const [status, setStatus] = useState<string>('Checking connector status...');

    useEffect(() => {
        const fetchStatus = async () => {
            try {
                const response = await fetch(`/api/check_status`); 
                const data = await response.json();
                if (data.status == 'running') {
                    setStatus(capitalizeFirstLetter(data.connector) + " connector is running!");
                    console.log(capitalizeFirstLetter(data.connector) + " connector is running!");
                } else {
                    setStatus(capitalizeFirstLetter(data.connector) + " connector is not running!");
                    console.log(capitalizeFirstLetter(data.connector) + " connector is not running!");
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