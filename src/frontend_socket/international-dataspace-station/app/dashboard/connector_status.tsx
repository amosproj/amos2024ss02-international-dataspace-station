// import * as net from 'net';
//
// function checkPortStatus(port: number): Promise<boolean> {
//     return new Promise((resolve) => {
//         const client = net.createConnection({ port }, () => {
//             client.end();
//             resolve(true);
//         });
//
//         client.on('error', (error) => {
//             console.error('Error occurred while checking port status:', error);
//             resolve(false);
//         });
//     });
// }
//
// export default async function checkConnectorStatus(port: number) {
//     let response: boolean = false;
//     try {
//         response = await checkPortStatus(port);
//     } catch (error) {
//         console.error('Error occurred while checking connector status:', error);
//     }
//     console.log(response);
//     return response;
// }
import * as net from 'net';

function checkPortStatus(port: number): Promise<boolean> {
    return new Promise((resolve) => {
        const client = net.createConnection({port}, () => {
            client.end();
            resolve(true);
        });

        client.on('error', () => {
            resolve(false);
        });
    });
}

export async function checkConnectorStatus(PORT: number): Promise<string> {
    try {
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
        return("")
    }
}
interface PortsProps{
    port: number
}
export default function ConnectorStatus({port}: PortsProps){
    const response = checkConnectorStatus(port);
    return(
        response
    )
}

