import { NextRequest, NextResponse } from 'next/server';
import * as net from 'net';

function checkPortStatus(port: number): Promise<boolean> {
    return new Promise((resolve) => {
        /***** For local run, use the first version of the function *****/
        // const client = net.createConnection({ port }, () => {
        const client = net.createConnection( port , "company_connector", () => {
            client.end();
            resolve(true);
        });

        client.on('error', () => {
            resolve(false);
        });
    });
}

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const port = searchParams.get('port');

    if (!port) {
        return NextResponse.json({ error: 'Port is required' }, { status: 400 });
    }

    const portNumber = parseInt(port, 10);

    try {
        const isPortInUse = await checkPortStatus(portNumber);
        if (isPortInUse) {
            return NextResponse.json({ status: 'running' });
        } else {
            return NextResponse.json({ status: 'not running' });
        }
    } catch (error) {
        console.error('Error occurred while checking connector status:', error);
        return NextResponse.json({ error: 'Error occurred while checking connector status' }, { status: 500 });
    }
}
