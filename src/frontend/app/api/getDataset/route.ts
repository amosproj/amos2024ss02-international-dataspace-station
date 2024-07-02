import { NextRequest, NextResponse } from 'next/server';
import { getDataset } from '../connector-functions';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { assetId, counterPartyName } = body;
    const result = await getDataset(assetId, counterPartyName);
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
