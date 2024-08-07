import { execSync } from 'child_process';
import { NextResponse } from 'next/server';
import { auth } from "@/auth"

const executeCommand = (command: string) => {
    try {
        const output = execSync(command, { encoding: 'utf-8' });
        console.log(output);
        return output.trim(); // Return the trimmed output
    } catch (error) {
        console.error(error);
        throw new Error((error as Error).message);
    }
};

export const GET = auth(async function GET(req) {
    try {
        if (!req.auth) {
            return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
        }
        let containerID;
        if (process.env.NEXT_PUBLIC_CONNECTOR_NAME === "company") {
            containerID = executeCommand("docker container ls --all | grep 'src-company-1' | awk '{print $1}'");
        } else if (process.env.NEXT_PUBLIC_CONNECTOR_NAME === "taxadvisor") {
            containerID = executeCommand("docker container ls --all | grep 'src-taxadvisor-1' | awk '{print $1}'");
        } else {
            containerID = executeCommand("docker container ls --all | grep 'src-bank-1' | awk '{print $1}'");
        }

        const result = executeCommand(`curl --unix-socket /var/run/docker.sock -X POST http://localhost/v1.45/containers/${containerID}/unpause`);
        return NextResponse.json({ result });

    } catch (e) {
        return NextResponse.json({ error: (e as Error).message }, { status: 500 });
    }
})