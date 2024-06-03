import * as net from 'net';

function checkPortStatus(port: number): Promise<boolean> {
    return new Promise((resolve) => {
        const client = net.createConnection({ port }, () => {
            client.end();
            resolve(true);
        });

        client.on('error', (error) => {
            console.error('Error occurred while checking port status:', error);
            resolve(false);
        });
    });
}

export default async function checkConnectorStatus(port: number) {
    let response: boolean = false;
    try {
        response = await checkPortStatus(port);
    } catch (error) {
        console.error('Error occurred while checking connector status:', error);
    }
    return response;
}
