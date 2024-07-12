import { NextRequest, NextResponse } from 'next/server';
import {getPolicies} from '../connector-functions';
import { auth } from "@/auth"

export const GET = auth(async function GET(req) {
  try {
      if (!req.auth) {
          return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
      }
    const data = await getPolicies();
    const policies = data.map((item: any) => ({
        name: item.privateProperties?.name || 'Default Policy',
        description: item.privateProperties?.description || 'No description provided',
        id: item["@id"]
    }));

    return NextResponse.json(policies);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
})
