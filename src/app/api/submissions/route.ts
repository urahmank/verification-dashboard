import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  try {
    // In a real app, you'd fetch from a database
    // For demo purposes, we'll return an empty array
    return NextResponse.json([]);
  } catch {
    return NextResponse.json(
      { error: 'Failed to fetch submissions' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // In a real app, you'd save to a database
    // For demo purposes, we'll just return success
    const submission = {
      id: Date.now().toString(),
      ...body,
      status: 'pending',
      submittedAt: new Date().toISOString(),
    };

    return NextResponse.json(submission, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: 'Failed to create submission' },
      { status: 500 }
    );
  }
} 