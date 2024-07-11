import { NextRequest, NextResponse } from 'next/server';
import { uploadFile } from '../database-functions';
import { auth } from "@/auth"

export const POST = auth(async function POST(req) {
    try {
        if (!req.auth) {
            return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
        }
        const formData = await req.formData();
        const file = formData.get("file");
        if (file == null) {
            return NextResponse.json({ error: "No file provided" }, { status: 406 });
        }
        const databaseInfo = await uploadFile(file);
        return NextResponse.json(databaseInfo);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
})
