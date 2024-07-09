import { NextRequest, NextResponse } from 'next/server';
import { execSync } from 'child_process';

const executeCommand = (command: string) => {
    try {
        const output = execSync(command, { encoding: 'utf-8' });
        console.log(output);
        return output.trim(); // Return the trimmed output
    } catch (error) {
        console.error(error);
        throw new Error((error as Error).message);
    }
};

var connectorStatusUrl: string;

function getConnectorStatusUrl(connectorName: string | null) {
    if (process.env.RUNNING_ENV == "local") {
        connectorStatusUrl = "http://" + connectorName + ":19191/api/status";
    } else {
        connectorStatusUrl = "https://" + connectorName + "." + process.env.CLOUD_DOMAIN + ":443/api/status";
    }
    return connectorStatusUrl;
}

async function checkPortStatus(connectorName: string | null): Promise<boolean> {
    try {
        let containerID; 
        containerID = executeCommand("docker container ls -f 'status=paused' | grep 'src-" + connectorName + "-1' | awk '{print $1}'");
        if (containerID) { // Checks if connector is paused, otherwise fetch will hang
            return false;
        }
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
