import { NextRequest, NextResponse } from 'next/server';
import { createAsset } from '../connector-functions';
import { auth } from "@/auth"

export const POST = auth(async function POST(request) {
  try {
      if (!request.auth) {
          return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
      }
    const body = await request.json();
    const { description, contenttype, name, baseUrl, assetId, date, size } = body;
    const result = await createAsset(description, contenttype, name, baseUrl, assetId, date, size);
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
})
