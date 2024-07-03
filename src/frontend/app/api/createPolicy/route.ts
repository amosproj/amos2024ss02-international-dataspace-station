import { NextRequest, NextResponse } from 'next/server';
import { createPolicy } from '../connector-functions';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { policyId } = body;
    const result = await createPolicy(policyId);
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
