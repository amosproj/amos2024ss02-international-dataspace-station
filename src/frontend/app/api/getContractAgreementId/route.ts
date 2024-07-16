import { NextRequest, NextResponse } from 'next/server';
import { getContractNegotiationStatus } from '../connector-functions';
import { auth } from "@/auth";

const WAIT_INTERVAL = 2000;

export const GET = auth(async function GET(req) {
    try {
        if (!req.auth) {
            return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
        }

        const { searchParams } = new URL(req.url);
        const negotiationId = searchParams.get('negotiationId');
        
        if (!negotiationId) {
            return NextResponse.json({ error: "Missing negotiationId parameter" }, { status: 400 });
        }
        
        let negotiationStatus = await getContractNegotiationStatus(negotiationId);
        while (negotiationStatus.state !== 'FINALIZED') {
            await new Promise(resolve => setTimeout(resolve, WAIT_INTERVAL));
            negotiationStatus = await getContractNegotiationStatus(negotiationId);
            if (negotiationStatus.state === "TERMINATED") throw new Error("Contract agreement has been terminated");
        }
        const agreementId = negotiationStatus.contractAgreementId;
        if (!agreementId) {
            return NextResponse.json({ error: "Agreement ID not found" }, { status: 404 });
        }
        return NextResponse.json({ agreementId });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
});