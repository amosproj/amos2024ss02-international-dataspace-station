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
        console.log(url, authorization);

        if (!url || !authorization) {
            return NextResponse.json({ error: 'Missing required parameters' }, { status: 400 });
        }
        console.log('url:', url);
        console.log('authorization:', authorization);
        const test = 'company';
        const { data, contentType, contentDisposition } = await getTransferredFile(authorization, test);

        const fileName = contentDisposition ? contentDisposition.split('filename=')[1].replace(/"/g, '') : 'file';

        const response = new NextResponse(data, {
            headers: {
                'Content-Type': contentType || 'application/octet-stream',
                'Content-Disposition': `attachment; filename="${fileName}"`,
            },
        });
        console.log("response", response);

        return response;
    } catch (error) {
        console.error('Error downloading file:', error);
        return NextResponse.json({ error: 'Error downloading file' }, { status: 500 });
    }
});