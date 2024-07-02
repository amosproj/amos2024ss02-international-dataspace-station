import { NextRequest, NextResponse } from 'next/server';
import { createContractDefinition } from '../connector-functions';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { contractId, policyId } = body;
    const result = await createContractDefinition(contractId, policyId);
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
