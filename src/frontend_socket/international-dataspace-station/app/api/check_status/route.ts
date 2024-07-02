import { NextRequest, NextResponse } from 'next/server';

var connectorStatusUrl: string;

if (process.env.RUNNING_ENV == "local") {
    connectorStatusUrl = "http://" + process.env.CONNECTOR_NAME + ":19191/api/status";
} else {
    connectorStatusUrl = "https://" + process.env.CONNECTOR_NAME + "." + process.env.CLOUD_DOMAIN + ":443/api/status";
}

async function checkPortStatus(): Promise<boolean> {
    try {
        console.log("Trying to fetch connector status from URL " + connectorStatusUrl);
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
        const isPortInUse = await checkPortStatus();
        if (isPortInUse) {
            return NextResponse.json({ status: 'running' , connector: process.env.CONNECTOR_NAME});
        } else {
            return NextResponse.json({ status: 'not running' , connector: process.env.CONNECTOR_NAME});
        }
    } catch (error) {
        console.error('Error occurred while checking connector status:', error);
        return NextResponse.json({ error: 'Error occurred while checking connector status' }, { status: 500 });
    }
}
