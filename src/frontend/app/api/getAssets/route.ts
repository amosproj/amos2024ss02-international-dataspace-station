import { NextRequest, NextResponse } from 'next/server';
import { getAssets } from '../connector-functions';
import { auth } from "@/auth"

export const GET = auth(async function GET(req) {
  try {
      if (!req.auth) {
          return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
      }
    const data = await getAssets();

    const formattedAssets = data.map((item: any) => ({
      date: item.properties?.date || 'Unknown Date',
      name: item.properties?.name || 'Unnamed Item',
      title: item.properties?.description || 'Unitled Item',
      author: item.properties?.author || 'Unknown Author',
      id: item.properties?.id || 'No ID',
      contenttype: item.properties?.contenttype || 'Unknown Content Type',
      size: item.properties?.size || 'Unknown Size',
      baseUrl: item.dataAddress.baseUrl || 'No URL',
    }));
    return NextResponse.json(formattedAssets);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
})
