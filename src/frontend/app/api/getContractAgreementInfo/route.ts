import { NextRequest, NextResponse } from 'next/server';
import { getContractAgreementInfo, uploadContractAgreementInfo } from '../database-functions';
import { auth } from "@/auth"

export const POST = auth(async function POST(req) {
    try {
        if (!req.auth) {
            return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
        }
        const body = await req.json();
        const { agreementId } = body;
        const contractAgreementInfo = await getContractAgreementInfo(agreementId);
        return NextResponse.json(contractAgreementInfo, {status: 200});
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
})
