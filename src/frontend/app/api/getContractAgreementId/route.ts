import { NextRequest, NextResponse } from 'next/server';
import { getContractNegotiationStatus } from '../connector-functions';
import { auth } from "@/auth";

const WAIT_INTERVAL = 5000;

export const GET = auth(async function GET(req) {
    try {
        if (!req.auth) {
            return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
        }
        //console.log("req in contractId,", req);
        //const negotiationId = req.nextUrl.searchParams.get('negotiationId');
        //console.log("req-test: ", req.nextUrl.searchParams.get('negotiationId'));
        const { searchParams } = new URL(req.url);
        const negotiationId = searchParams.get('negotiationId');
        
        //const negotiationId = req.nextUrl.pathname.split('/').pop();
        console.log("negotiation id in req: ", negotiationId);
        //const { params } = req;
        //const negotiationId = params?.negotiationId as string; 
        

        if (!negotiationId) {
            return NextResponse.json({ error: "Missing negotiationId parameter" }, { status: 400 });
        }
        console.log("calling negotiateStatus with id ", negotiationId);
        
        let negotiationStatus = await getContractNegotiationStatus(negotiationId);
        while (negotiationStatus.state !== 'FINALIZED') {
            await new Promise(resolve => setTimeout(resolve, WAIT_INTERVAL));
            negotiationStatus = await getContractNegotiationStatus(negotiationId);
        }
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