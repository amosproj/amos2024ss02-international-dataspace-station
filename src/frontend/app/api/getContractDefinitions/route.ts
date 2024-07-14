import { NextRequest, NextResponse } from 'next/server';
import { getAssets, getContractDefinitions } from '../connector-functions';
import { auth } from "@/auth"

export const GET = auth(async function GET(req) {
  try {
      if (!req.auth) {
          return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
      }
    const data = await getContractDefinitions();

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
})
