import { NextRequest, NextResponse } from 'next/server';
import { getTransferredFile } from '../connector-functions';
import { auth } from '@/auth';

export const GET = auth(async function GET(req) {
    try {
        if (!req.auth) {
            return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
        }

        const { searchParams } = new URL(req.url);
        const url = searchParams.get('url');
        const authorization = searchParams.get('authorization');
        const fileName = searchParams.get("filename");

        if (!url || !authorization) {
            return NextResponse.json({ error: 'Missing required parameters' }, { status: 400 });
        }

        const { data, contentType, contentDisposition } = await getTransferredFile(authorization, url);

        const response = new NextResponse(data, {
            headers: {
                'Content-Type': contentType || 'application/octet-stream',
                'Content-Disposition': `attachment; filename="${fileName}"`,
            },
        });

        return response;
    } catch (error) {
        console.error('Error downloading file:', error);
        return NextResponse.json({ error: 'Error downloading file' }, { status: 500 });
    }
});