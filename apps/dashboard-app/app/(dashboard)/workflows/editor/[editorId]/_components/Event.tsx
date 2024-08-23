import React, { useEffect, useState } from 'react';
import { getEventsByWorkflowId } from '../../../../../../actions/workflows/workflow';
import { useParams } from 'next/navigation';
import { format } from 'date-fns';

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
  const workflowId = param?.editorId;

  useEffect(() => {
    const fetchEvents = async () => {
      const res = await getEventsByWorkflowId(workflowId as string);
      setEvents(res);
    };
    fetchEvents();
  }, [workflowId]);

  return (
    <div className='flex flex-col h-screen border-x-2 border-border/50 pr-2 px-2 bg-secondary/70'>
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
