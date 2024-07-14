import { NextRequest, NextResponse } from 'next/server';
import { deleteFile } from '../database-functions';
import { auth } from "@/auth"

export const GET = auth(async function GET(req) {
  try {
      if (!req.auth) {
          return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
      }
    const { searchParams } = new URL(req.url);
    const fileId = searchParams.get('fileId');
    if (!fileId) {
        return NextResponse.json( { error: "Missing fileId" }, { status: 400 })
    }
    return NextResponse.json(await deleteFile(fileId as string));
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
})
