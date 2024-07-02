import { NextRequest, NextResponse } from 'next/server';
import { negotiateContract } from '../connector-functions';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { contractOfferId, assetId, counterPartyName } = body;
    const result = await negotiateContract(contractOfferId, assetId, counterPartyName);
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
