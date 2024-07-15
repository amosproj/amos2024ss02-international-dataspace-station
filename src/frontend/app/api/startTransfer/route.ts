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
        await new Promise(resolve => setTimeout(resolve, 5000)); // wait for 5 seconds
        status = await checkTransferStatus(transferProcess["@id"]);
    } while (status.state !== "STARTED");

    // Fetch the endpoint data reference
    const edr = await getEndpointDataReference(transferProcess["@id"]);
    console.log("edr: ", edr);

    const url = edr.endpoint.replace(counterPartyName, 'localhost');
    console.log(url);
    return NextResponse.json({ url, authorization: edr.authorization });

  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
})