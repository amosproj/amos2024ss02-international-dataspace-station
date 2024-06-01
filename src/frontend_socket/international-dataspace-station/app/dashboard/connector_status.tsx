import * as net from 'net';

// const PORT = 29191;

function checkPortStatus(port: number): Promise<boolean> {
    return new Promise((resolve) => {
        const client = net.createConnection({ port }, () => {
            client.end();
            resolve(true);
        });

        client.on('error', () => {
            resolve(false);
        });
    });
}


async function checkConnectorStatus(port): Promise<string> {
    try {
        const PORT = port
        const isPortInUse = await checkPortStatus(PORT);
        if (isPortInUse) {
            console.log(`Connector is running on port ${PORT}`);
            return("Your connector is running!");
        } else {
            console.log(`Connector is not running on port ${PORT}`);
            return("Your connector is not running!");
        }
    } catch (error) {
        console.error('Error occurred while checking connector status:', error);
    }
}
interface ConnectorProp{
    port: number;
}
export default function ConnectorStatus(props: ConnectorProp){
    const response = checkConnectorStatus(props.port);
    return(
        response
    )
}