import { NextResponse } from 'next/server';
import { execSync } from 'child_process';
import { auth } from "@/auth"

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

function getConnectorStatusUrl(connectorName: string | null) {
    if (process.env.RUNNING_ENV == "local") {
        return "http://" + connectorName + ":19191/connector-api/status";
    } else {
        return "https://" + connectorName + "." + process.env.CLOUD_DOMAIN + ":443/connector-api/status";
    }
}

async function checkConnectorStatus(connectorName: string | null): Promise<boolean> {
    const url = getConnectorStatusUrl(connectorName);
    try {
        let containerID; 
        containerID = executeCommand("docker container ls -f 'status=paused' | grep 'src-" + connectorName + "-1' | awk '{print $1}'");
        if (containerID) { // Checks if connector is paused, otherwise fetch will hang
            return false;
        }
        console.log("Trying to fetch connector status from URL " + url);
        var result = await fetch(url, {cache: "no-store"});
        var data = await result.json();
        console.log("Got a new result.");
        console.log(data);
        return data.response === "Running!";
    } catch (err) {
        console.log(err);
        return false;
    }
}

export const GET = auth(async function GET(request) {
    try {
        if (!request.auth) {
            return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
        }
        const { searchParams } = new URL(request.url);
        var connectorName = searchParams.get('connector');
        if (connectorName == null && process.env.NEXT_PUBLIC_CONNECTOR_NAME) {
            connectorName = process.env.NEXT_PUBLIC_CONNECTOR_NAME;
        }
        const isRunning = await checkConnectorStatus(connectorName);
        return NextResponse.json({
            isRunning: isRunning,
            connector: connectorName
        });
    } catch (error) {
        console.error('Error occurred while checking connector status:', error);
        return NextResponse.json({ error: 'Error occurred while checking connector status' }, { status: 500 });
    }
})