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
      if (workflowId){
        const res = await getEventsByWorkflowId(workflowId as string)
        setEvents(res)
      }
    }
    fetchEvents()
  },[workflowId])



  return (
    <Card>
      <CardHeader>
        <CardTitle>Events</CardTitle>
      </CardHeader>
      <CardContent>
          {events.map((event:any) => (
            <div key={event.id} className='flex items-center justify-between gap-4'>
              <div>{format(event.createdAt,'HH:mm dd/MM')}</div>
              <div>{event.status}</div>
            </div>
          ))
          }
      </CardContent>
    </Card>

  )
}

export default Event