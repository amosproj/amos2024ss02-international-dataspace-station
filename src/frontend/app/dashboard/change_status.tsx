import React, { useState, useEffect } from 'react';
import { PauseCircleIcon, PlayCircleIcon } from '@heroicons/react/24/outline';

interface ConnectorStatusProps {
    connectorName: string | undefined;
}

export default function ChangeStatusButton({ connectorName }: ConnectorStatusProps) {
    const [buttonText, setButtonText] = useState<string>('Checking status...');
    const [iconName, setIconName] = useState<string>('PauseCircleIcon');
    const [buttonColor, setButtonColor] = useState<string>('bg-green-500');

    const iconMapping: { [key: string]: React.ElementType } = {
        PauseCircleIcon: PauseCircleIcon,
        PlayCircleIcon: PlayCircleIcon
    }; 

    const changeStatus = async () => {
        if (!connectorName) return;

        try {
            const response = await fetch(`/api/check_status?connector=${connectorName}`);
            const data = await response.json();
            if (data.status === 'running') {
                await fetch('/api/pauseConnector');
                setButtonText("Start the connector");
                setIconName("PlayCircleIcon");
                setButtonColor('bg-green-500');
            } else {
                await fetch('/api/unpauseConnector');
                setButtonText("Pause the connector");
                setIconName("PauseCircleIcon");
                setButtonColor('bg-red-500');
            }
        } catch (error) {
            setButtonText('Error checking status');
        }
    };

    useEffect(() => {
        const fetchInitialStatus = async () => {
            if (!connectorName) return;

            try {
                const response = await fetch(`/api/check_status?connector=${connectorName}`);
                const data = await response.json();
                if (data.status === 'running') {
                    setButtonText("Pause the connector");
                    setIconName("PauseCircleIcon");
                    setButtonColor('bg-red-500');
                } else {
                    setButtonText("Start the connector");
                    setIconName("PlayCircleIcon");
                    setButtonColor('bg-green-500');
                }
            } catch (error) {
                setButtonText('Error checking status');
            }
        };

        fetchInitialStatus();
    }, [connectorName]);

    const IconComponent = iconMapping[iconName] || PauseCircleIcon;

    return (
        <div className="flex justify-start pb-5">
            <button onClick={changeStatus}
                className={`mb-4 px-4 py-2 rounded-md hover:bg-neonBlue text-white flex items-center ${buttonColor}`}
                style={{ height: '50px', width: '240px' }}> 
                <IconComponent className="w-6 mr-1" style={{ height: '30px', width: '30px' }}/>
                {buttonText}
            </button>
        </div>
    );
}