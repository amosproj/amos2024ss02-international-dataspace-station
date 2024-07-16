import { NextRequest, NextResponse } from 'next/server';
import { deleteAsset } from '../connector-functions';
import { auth } from "@/auth"

export const GET = auth(async function GET(req) {
  try {
      if (!req.auth) {
          return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
      }
    const { searchParams } = new URL(req.url);
    const assetId = searchParams.get('assetId');
    if (!assetId) {
        return NextResponse.json({ error: "Missing asset id" }, { status: 400 })
    }
    await deleteAsset(assetId as string);
    return NextResponse.json(true);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
})
