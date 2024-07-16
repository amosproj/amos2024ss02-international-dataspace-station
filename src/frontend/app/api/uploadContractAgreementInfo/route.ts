import { NextRequest, NextResponse } from 'next/server';
import { uploadContractAgreementInfo } from '../database-functions';
import { auth } from "@/auth"

export const POST = auth(async function POST(req) {
    try {
        if (!req.auth) {
            return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
        }
        const body = await req.json();
        const { agreementId, fileName, fileSize, title, date, author, contenttype } = body;
        await uploadContractAgreementInfo(agreementId, fileName, fileSize, title, date, author, contenttype);
        return NextResponse.json({status: 200});
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
})
