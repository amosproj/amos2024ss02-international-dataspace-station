import { NextRequest, NextResponse } from 'next/server';
import { checkTransferStatus } from '../connector-functions';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const transferId = searchParams.get('transferId');
  try {
    const result = await checkTransferStatus(transferId as string);
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
