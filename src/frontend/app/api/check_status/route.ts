import { NextRequest, NextResponse } from 'next/server';

var connectorStatusUrl: string;



function getConnectorStatusUrl(connectorName: string | null) {
    if (process.env.RUNNING_ENV == "local") {
        connectorStatusUrl = "http://" + connectorName + ":19191/api/status";
    } else {
        connectorStatusUrl = "https://" + connectorName + "." + process.env.CLOUD_DOMAIN + ":443/api/status";
    }
}

async function checkPortStatus(connectorName: string | null): Promise<boolean> {
    try {
        console.log("Trying to fetch connector status from URL " + getConnectorStatusUrl(connectorName));
        var result = await fetch(connectorStatusUrl, {cache: "no-store"});
        var data = await result.json();
        console.log("Got a new result.");
        console.log(data);
        if (data.response == "Running!") {
            return true;
        } else {
            return false;
        }
    } catch (err) {
        console.log(err);
        return false;
    }
}

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        var connectorName = searchParams.get('connector');
        if (connectorName == null && process.env.NEXT_PUBLIC_CONNECTOR_NAME) {
            connectorName = process.env.NEXT_PUBLIC_CONNECTOR_NAME;
        }
        const isPortInUse = await checkPortStatus(connectorName);
        if (isPortInUse) {
            return NextResponse.json({ status: 'running' , connector: connectorName});
        } else {
            return NextResponse.json({ status: 'not running' , connector: connectorName});
        }
    } catch (error) {
        console.error('Error occurred while checking connector status:', error);
        return NextResponse.json({ error: 'Error occurred while checking connector status' }, { status: 500 });
    }
}
