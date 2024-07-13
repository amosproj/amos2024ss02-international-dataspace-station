import { NextRequest, NextResponse } from 'next/server';
import { getContractNegotiationStatus } from '../connector-functions';
import { auth } from "@/auth";

export const GET = auth(async function GET(req) {
    try {
        if (!req.auth) {
            return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
        }
        console.log("req in contractId,", req);
        const negotiationId = req.nextUrl.searchParams.get('negotiationId');

        if (!negotiationId) {
            return NextResponse.json({ error: "Missing negotiationId parameter" }, { status: 400 });
        }
        const negotiationStatus = await getContractNegotiationStatus(negotiationId);
        console.log(negotiationStatus);
        const agreementId = negotiationStatus.contractAgreementId;
        if (!agreementId) {
            return NextResponse.json({ error: "Agreement ID not found" }, { status: 404 });
        }
        return NextResponse.json({ agreementId });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
});