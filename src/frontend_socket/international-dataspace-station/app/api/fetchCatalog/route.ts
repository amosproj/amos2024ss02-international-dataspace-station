import { NextRequest, NextResponse } from 'next/server';
import { fetchCatalog } from '../connector-functions';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { counterPartyName } = body;
    const result = await fetchCatalog(counterPartyName);
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
