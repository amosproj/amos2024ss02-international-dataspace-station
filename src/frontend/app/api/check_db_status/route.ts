import { NextRequest, NextResponse } from 'next/server';
import { auth } from "@/auth"


function getDataBaseStatusUrl(connectorName: string | null) {
    if (process.env.RUNNING_ENV == "local") {
        return "http://" + process.env.NEXT_PUBLIC_CONNECTOR_NAME + "-database" + ":8080/status";
    } else {
        return "https://" + process.env.NEXT_PUBLIC_CONNECTOR_NAME + "." + process.env.CLOUD_DOMAIN + ":443/database/status";
    }
}

async function checkDatabaseStatus(connectorName: string | null): Promise<boolean> {
    const url = getDataBaseStatusUrl(connectorName);
    try {
        var result = await fetch(url, {cache: "no-store"});
        var data = await result.json();
        return data.response === "Running!";
    } catch (err) {
        console.error(err);
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
        const isRunning = await checkDatabaseStatus(connectorName);
        return NextResponse.json({
            isRunning: isRunning,
            connector: connectorName
        });
    } catch (error) {
        console.error('Error occurred while checking connector status:', error);
        return NextResponse.json({ error: 'Error occurred while checking connector status' }, { status: 500 });
    }
})