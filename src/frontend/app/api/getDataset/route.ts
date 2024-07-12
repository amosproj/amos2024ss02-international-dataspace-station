import { NextRequest, NextResponse } from 'next/server';
import { getDataset } from '../connector-functions';
import { auth } from "@/auth"

export const POST = auth(async function POST(req) {
  try {
      if (!req.auth) {
          return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
      }
    const body = await req.json();
    const { assetId, counterPartyName } = body;
    const result = await getDataset(assetId, counterPartyName);
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
})
