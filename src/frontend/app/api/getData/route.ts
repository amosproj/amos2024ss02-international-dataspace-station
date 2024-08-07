import { NextRequest, NextResponse } from 'next/server';
import { getData } from '../connector-functions';
import { auth } from "@/auth"

export const GET = auth(async function GET(req) {
  try {
      if (!req.auth) {
          return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
      }
    const { searchParams } = new URL(req.url);
    const authorizationKey = searchParams.get('authorizationKey');
    const counterPartyName = searchParams.get('counterPartyName');
    const result = await getData(authorizationKey as string, counterPartyName as string);
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
})
