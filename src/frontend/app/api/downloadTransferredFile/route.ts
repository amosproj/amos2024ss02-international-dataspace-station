import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';

export const GET = auth(async function GET(req) {
    try {
        if (!req.auth) {
            return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
        }

        const { searchParams } = new URL(req.url);
        const url = searchParams.get('url');
        const authorization = searchParams.get('authorization');

        if (!url || !authorization) {
            return NextResponse.json({ error: 'Missing required parameters' }, { status: 400 });
        }
        console.log('url:', url);
        console.log('authorization:', authorization);

        const fetchResponse = await fetch(url, {
            headers: {
                Authorization: authorization,
            },
        });
        console.log("fetchResponse: ", fetchResponse);
        if (!fetchResponse.ok) {
            throw new Error(`Failed to fetch file: ${fetchResponse.statusText}`);
        }

        const blob = await fetchResponse.blob();
        const arrayBuffer = await blob.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        const contentDisposition = fetchResponse.headers.get('content-disposition');
        const contentType = fetchResponse.headers.get('content-type');
        const fileName = contentDisposition ? contentDisposition.split('filename=')[1].replace(/"/g, '') : 'file';

        const response = new NextResponse(buffer, {
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