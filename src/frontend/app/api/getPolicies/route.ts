import { NextRequest, NextResponse } from 'next/server';
import {getPolicies} from '../connector-functions';

export async function GET(req: NextRequest) {
  try {
    const data = await getPolicies();
    const policies = data.map((item: any) => ({
        name: item.privateProperties?.name || 'Unnamed Policy',
        description: item.privateProperties?.description || 'No description provided',
    }));
    return NextResponse.json(policies);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
