import { NextRequest, NextResponse } from 'next/server';
import { startTransfer, checkTransferStatus, getEndpointDataReference } from '../connector-functions';
import { auth } from "@/auth"

export const POST = auth(async function POST(req) {
  try {
      if (!req.auth) {
          return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
      }
    const body = await req.json();
    const { contractId, assetId, counterPartyName } = body;
    const transferProcess = await startTransfer(contractId, assetId, counterPartyName);

    // Check status until it reaches STARTED
    let status;
    do {
        await new Promise(resolve => setTimeout(resolve, 2000)); // wait for 2 seconds
        status = await checkTransferStatus(transferProcess["@id"]);
        if (status.state === "TERMINATED") throw new Error("Transfer got terminated");
    } while (status.state !== "STARTED");

    // Fetch the endpoint data reference
    const edr = await getEndpointDataReference(transferProcess["@id"]);

    //const url = edr.endpoint.replace(counterPartyName, 'localhost');

    //console.log(url);
    return NextResponse.json({url: edr.endpoint, authorization: edr.authorization });

  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
})