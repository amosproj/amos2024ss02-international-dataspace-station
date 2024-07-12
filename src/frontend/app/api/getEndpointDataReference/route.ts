import { NextRequest, NextResponse } from 'next/server';
import { getEndpointDataReference } from '../connector-functions';
import { auth } from "@/auth"

export const GET = auth(async function GET(req) {
  try {
      if (!req.auth) {
          return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
      }
    const { searchParams } = new URL(req.url);
    const transferId = searchParams.get('transferId');
    const result = await getEndpointDataReference(transferId as string);
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
})
