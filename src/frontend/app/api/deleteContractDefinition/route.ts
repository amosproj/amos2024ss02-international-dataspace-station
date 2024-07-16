import { NextRequest, NextResponse } from 'next/server';
import { deleteContractDefinition } from '../connector-functions';
import { auth } from "@/auth"

export const GET = auth(async function GET(req) {
  try {
      if (!req.auth) {
          return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
      }
    const { searchParams } = new URL(req.url);
    const contractId = searchParams.get('contractId');
    if (!contractId) {
        return NextResponse.json({ error: "Missing contract id" }, { status: 400 })
    }
    await deleteContractDefinition(contractId as string);
    return NextResponse.json(true);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
})
