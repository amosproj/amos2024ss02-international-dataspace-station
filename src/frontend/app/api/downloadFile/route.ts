import { NextRequest, NextResponse } from 'next/server';
import { downloadFile } from '../database-functions';
import { auth } from "@/auth"


export const GET = auth(async function GET(request) {
    try {
        if (!request.auth) {
            return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
        }
        const { searchParams } = new URL(request.url);
        var fileId = searchParams.get('id');

        if (!fileId) {
            return NextResponse.json({ error: 'Please provide the file ID as query parameter "id"'}, { status: 400 });
        }

        const response = await downloadFile(fileId);

        const contentDisposition = response.headers.get("content-disposition");
        const contentType = response.headers.get("content-type");
        const fileName = contentDisposition ? contentDisposition.split('filename=')[1].replace(/"/g, "") : "file";

        const fileData = await response.arrayBuffer();
        const buffer = Buffer.from(fileData);

        const ourResponse = new NextResponse(buffer);
        ourResponse.headers.set('Content-Type', contentType || 'application/octet-stream');
        ourResponse.headers.set('Content-Disposition', `attachment; filename="${fileName}"`);

        return ourResponse;

    } catch (error) {
        console.error('Error occurred while downloading file:', error);
        return NextResponse.json({ error: 'Error occurred while downloading file' }, { status: 500 });
    }
})
