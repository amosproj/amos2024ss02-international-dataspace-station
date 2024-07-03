import { NextRequest, NextResponse } from 'next/server';
import { registerDataplaneProvider } from '../connector-functions';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { dataplaneId } = body;
    const result = await registerDataplaneProvider(dataplaneId);
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
