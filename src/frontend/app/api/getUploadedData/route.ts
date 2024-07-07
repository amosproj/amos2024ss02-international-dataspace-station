import { NextResponse } from 'next/server';

// Fetch data from backend
async function getUploadedData() {
  const response = await fetch('http://database:8080/files/list');
  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }
  return await response.json();
}

// Handle GET request
export async function GET() {
  try {
    const data = await getUploadedData();
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error('Error fetching uploaded data:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
