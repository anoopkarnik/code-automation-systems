import { createEvent } from '@repo/prisma-db/repo/workflow';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest, { params }: { params: {  workflowId: string } }) {
  const { workflowId } = params;
  const body = await req.json();
  await createEvent(workflowId, 'STARTED', body);
  return NextResponse.json({ message: `POST request received to start workflowId: ${workflowId}`, data: body });
}
