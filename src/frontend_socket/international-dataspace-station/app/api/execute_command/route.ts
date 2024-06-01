import { NextResponse } from 'next/server';
import { execSync } from 'child_process';

export async function GET() {
  try {
    const output = execSync('ls', { encoding: 'utf-8' });
    const splitted = output.split(/\r?\n/);
    const filtered = splitted.filter(e => e !== '');
    return NextResponse.json({ output: filtered });
  } catch (e) {
    return NextResponse.json({ error: (e as Error).message }, { status: 500 });
  }
}