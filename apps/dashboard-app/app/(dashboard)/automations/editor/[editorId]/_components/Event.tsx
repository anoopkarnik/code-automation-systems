import React, { useEffect, useState } from 'react';
import { getEventsByWorkflowIdAndUserId } from '../../../../../actions/workflows/workflow';
import { useParams } from 'next/navigation';
import { format, set } from 'date-fns';
import { useSession } from 'next-auth/react';
import { Button } from '@repo/ui/atoms/shadcn/Button';

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
  const [offset, setOffset] = useState(0);
  const param = useParams();
  const workflowId:any = param?.editorId;
  const session = useSession();
  let userId = session?.data?.user?.id;

  useEffect(() => {
    const fetchEvents = async () => {
      if (!userId) return;
      const res = await getEventsByWorkflowIdAndUserId(workflowId,userId,offset);
      setEvents(res);
    };
    fetchEvents();
  }, [workflowId,userId]);
  if (events.length==0) return null;

  const handleLoadMore = async () => {
    if (!userId) return;
    const res = await getEventsByWorkflowIdAndUserId(workflowId,userId,offset+20);
    setEvents([...events, ...res]);
    setOffset(offset + 20);
  }

  return (
    <div className= 'flex flex-col gap-4'>
      <div className='rounded-lg border bg-card text-card-foreground shadow-sm ml-4'>
        <div className='text-xl font-medium text-center mt-1 mb-2 '>Events</div>
      </div>
      <div className='flex flex-col border-x-2 border-border/50 p-4 rounded-lg border bg-card text-card-foreground shadow-sm ml-4'>
        {events.map((event) => (
          <div key={event.id} className='flex items-center justify-between gap-4 border-b-2 border-border/40 text-xs'>
            <div>{format(new Date(event.createdAt), 'HH:mm')}</div>
            <div>{format(new Date(event.createdAt), 'ddMMM')}</div>
            <div>{event.Workflows.name}</div>
            <div>{event.status}</div>
          </div>
        ))}
      </div>
      <Button onClick={handleLoadMore} size='sm' variant="secondary" className='ml-4'>
        Load More
      </Button>
    </div>
  );
};

export default EventComponent;
