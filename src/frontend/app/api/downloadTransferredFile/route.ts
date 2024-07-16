import { NextRequest, NextResponse } from 'next/server';
import { getTransferredFile } from '../connector-functions';
import { auth } from '@/auth';

export const GET = auth(async function GET(req) {
    try {
        if (!req.auth) {
            return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
        }

        const { searchParams } = new URL(req.url);
        const counterPartyname = searchParams.get('counterPartyname');
        const authorization = searchParams.get('authorization');
        console.log(counterPartyname, authorization);

        if (!counterPartyname || !authorization) {
            return NextResponse.json({ error: 'Missing required parameters' }, { status: 400 });
        }
        console.log('counterPartyname:', counterPartyname);
        console.log('authorization:', authorization);

        const { data, contentType, contentDisposition } = await getTransferredFile(authorization, counterPartyname);

        console.log("data: ", data);
        console.log("content type: ", contentType);
        console.log("contentDisposition", contentDisposition);

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