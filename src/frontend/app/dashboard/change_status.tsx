import React, { useState, useEffect } from 'react';
import { PauseCircleIcon, PlayCircleIcon, ExclamationCircleIcon } from '@heroicons/react/24/outline';

interface ConnectorStatusProps {
    connectorName: string | undefined;
    connectorStatus: boolean | null;
    callbackFunction: () => void;
}

export default function ChangeStatusButton({ connectorName, connectorStatus, callbackFunction }: ConnectorStatusProps) {
    const [buttonText, setButtonText] = useState<string>('Checking status...');
    const [iconName, setIconName] = useState<string>('ExclamationCircleIcon');
    const [buttonColor, setButtonColor] = useState<string>('bg-gray-700');

    const iconMapping: { [key: string]: React.ElementType } = {
        PauseCircleIcon: PauseCircleIcon,
        PlayCircleIcon: PlayCircleIcon
    };

    const changeStatus = async () => {
        if (!connectorName) return;
        if (connectorStatus == null) return;

        try {
            if (connectorStatus) {
                await fetch('/api/pauseConnector');
            } else {
                await fetch('/api/unpauseConnector');
            }
            await callbackFunction();
        } catch (error) {
            console.error("There was an error changing conenctor status");
        }
    };

    useEffect(() => {
        if (connectorStatus == null) {
            setButtonText("Checking status...");
            setIconName("ExclamationCircleIcon");
            setButtonColor("bg-gray-700");
        } else if (connectorStatus) {
            setButtonText("Pause the connector");
            setIconName("PauseCircleIcon");
            setButtonColor('bg-red-500');
        } else {
            setButtonText("Start the connector");
            setIconName("PlayCircleIcon");
            setButtonColor('bg-green-500');
        }
    }, [connectorStatus])


    const IconComponent = iconMapping[iconName] || ExclamationCircleIcon;

    return (
        <div className="flex justify-start mt-5">
            <button onClick={changeStatus}
                className={`mb-4 px-4 py-2 rounded-md hover:bg-neonBlue text-white flex items-center ${buttonColor}`}
                style={{ height: '50px', width: '240px' }}> 
                <IconComponent className="w-6 mr-1" style={{ height: '30px', width: '30px' }}/>
                {buttonText}
            </button>
        </div>
    );
}