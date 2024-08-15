import { createEvent } from '@repo/prisma-db/repo/workflow';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest, { params }: { params: {  workflowId: string } }) {
  const { workflowId } = params;
  const body = await req.json();
  let eventMetadata:any = {
    trigger: {
      result: body,
      logs: []
    }
  }
  eventMetadata.trigger.logs.push(`POST request received to start workflowId: ${workflowId}`);
  await createEvent(workflowId, 'STARTED', eventMetadata);
  return NextResponse.json({ message: `POST request received to start workflowId: ${workflowId}`, data: body });
}
