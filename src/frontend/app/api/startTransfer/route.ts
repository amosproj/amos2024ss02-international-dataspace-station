import { NextRequest, NextResponse } from 'next/server';
import { startTransfer } from '../connector-functions';
import { auth } from "@/auth"

export const POST = auth(async function POST(req) {
  try {
      if (!req.auth) {
          return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
      }
    const body = await req.json();
    const { contractId, assetId, counterPartyName } = body;
    const result = await startTransfer(contractId, assetId, counterPartyName);
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
})
