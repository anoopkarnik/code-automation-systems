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
  if (events.length==0) return null;

  return (
    <div className= 'flex flex-col gap-4'>
      <div className='rounded-lg border bg-card text-card-foreground shadow-sm ml-4'>
        <div className='text-xl font-medium text-center mt-1 mb-2 '>Events</div>
      </div>
      <div className='flex flex-col border-x-2 border-border/50 p-4 rounded-lg border bg-card text-card-foreground shadow-sm ml-4'>
        {events.slice(0,24).map((event) => (
          <div key={event.id} className='flex items-center justify-between gap-4 border-b-2 border-border/40 text-xs'>
            <div>{format(new Date(event.createdAt), 'HH:mm')}</div>
            <div>{format(new Date(event.createdAt), 'ddMMM')}</div>
            <div>{event.Workflows.name}</div>
            <div>{event.status}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventComponent;
