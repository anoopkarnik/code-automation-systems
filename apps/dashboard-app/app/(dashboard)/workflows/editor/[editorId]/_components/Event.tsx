import React, {  useEffect, useState } from 'react'
import { getEventsByWorkflowId } from '../../../../../../actions/workflows/workflow'
import { useParams } from 'next/navigation'
import { format } from 'date-fns/format'
import { Card, CardContent, CardHeader, CardTitle } from '@repo/ui/molecules/shadcn/Card'

const Event = () => {
  const [events, setEvents] = useState([])
  const param = useParams()
  const workflowId = param.editorId

  useEffect(()=>{
    const fetchEvents = async () => {
      const res = await getEventsByWorkflowId(workflowId as string)
      setEvents(res)
      console.log(res)
    }
    fetchEvents()
  },[workflowId])



  return (
    <div className='flex flex-col h-screen border-x-2 border-border/50 pr-2 px-2 bg-secondary/70'>
      <div className='text-2xl font-medium text-center mb-4'>Events</div>
        {events.map((event:any) => (
          <div key={event.id} className='flex items-center justify-between gap-4 border-b-2 border-border/40'>
            <div>{format(event.createdAt,'HH:mm')}</div>
            <div>{format(event.createdAt,'ddMMM')}</div>
            <div>{event.Workflows.name}</div>
            <div>{event.status}</div>
          </div>
        ))
        }
    </div>
  )
}

export default Event