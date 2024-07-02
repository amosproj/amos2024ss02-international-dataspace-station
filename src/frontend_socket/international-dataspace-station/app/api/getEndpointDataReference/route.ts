import { NextRequest, NextResponse } from 'next/server';
import { getEndpointDataReference } from '../connector-functions';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const transferId = searchParams.get('transferId');
    const result = await getEndpointDataReference(transferId as string);
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
