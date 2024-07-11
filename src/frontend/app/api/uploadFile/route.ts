import { NextRequest, NextResponse } from 'next/server';
import { uploadFile } from '../database-functions';

export async function POST(req: NextRequest) {
    try {
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
}
