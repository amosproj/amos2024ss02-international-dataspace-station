import { NextRequest, NextResponse } from 'next/server';
import { startTransfer } from '../connector-functions';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { contractId, assetId, counterPartyName } = body;
    const result = await startTransfer(contractId, assetId, counterPartyName);
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
