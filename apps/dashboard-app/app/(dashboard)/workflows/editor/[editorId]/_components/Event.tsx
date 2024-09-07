import React, { useEffect, useState } from 'react';
import { getEventsByWorkflowIdAndUserId } from '../../../../../actions/workflows/workflow';
import { useParams } from 'next/navigation';
import { format } from 'date-fns';
import { useSession } from 'next-auth/react';

interface Event {
  id: string;
  workflowId: string;
  createdAt: string; // assuming createdAt is a string in ISO format
  status: string;
  Workflows: {
    name: string;
  };
}

const EventComponent = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const param = useParams();
  const workflowId:any = param?.editorId;
  const session = useSession();
  let userId = session?.data?.user?.id;

  useEffect(() => {
    const fetchEvents = async () => {
      if (!userId) return;
      const res = await getEventsByWorkflowIdAndUserId(workflowId,userId);
      setEvents(res);
    };
    fetchEvents();
  }, [workflowId,userId]);

  return (
    <div className='flex flex-col h-[800px] border-x-2 border-border/50 pr-2 px-2 rounded-lg border bg-card text-card-foreground shadow-sm ml-4'>
      <div className='text-xl font-medium text-center mb-4'>Events</div>
      {events.slice(0,10).map((event) => (
        <div key={event.id} className='flex items-center justify-between gap-4 border-b-2 border-border/40 text-xs'>
          <div>{format(new Date(event.createdAt), 'HH:mm')}</div>
          <div>{format(new Date(event.createdAt), 'ddMMM')}</div>
          <div>{event.Workflows.name}</div>
          <div>{event.status}</div>
        </div>
      ))}
    </div>
  );
};

export default EventComponent;
