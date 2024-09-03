import { Button } from '@repo/ui/atoms/shadcn/Button'
import { Input } from '@repo/ui/atoms/shadcn/Input'
import React, { useContext, useState } from 'react'
import { ConnectionsContext } from '../../../../providers/connections-provider'
import { createNotionPageAction } from '../../../actions/notion/notion'
import { DatePicker } from '@repo/ui/molecules/shadcn/DatePicker'
import { Checkbox } from '../../../../../../packages/ui/src/components/atoms/shadcn/Checkbox'

const TaskForm = () => {
    const connectionsContext = useContext(ConnectionsContext)
    const apiToken = connectionsContext?.notionNode?.accessToken
    const eisenhowerMatrixDbId = connectionsContext?.notionNode?.eisenhowerMatrixDb?.id

    const [name, setName] = useState('')
    const [deadlines, setDeadlines] = useState(new Date())
    const [importance, setImportance] = useState(false)
    const [urgency, setUrgency] = useState(false)


      const handleAddTask = async () => {
        if (!name ) {
          return
        }
        const properties:any = [
            {name:'Task',type: 'title', value: name},
            {name:'Deadlines',type: 'date', value: deadlines},
            {name:'Important',type: 'checkbox', value: importance},
            {name:'Urgent',type: 'checkbox', value: urgency},
        ]
        
        const dbId =eisenhowerMatrixDbId
        const response = await createNotionPageAction({apiToken, dbId, properties})
      }
  
  
  return (
    <div className='flex flex-col items-center justify-center gap-4 border-2 border-border/20 p-4 m-2 my-10'>
        <div className='flex items-center justify-between gap-4 w-[95%] flex-wrap my-2 mx-2 '>
            <Input className='w-[300px]' placeholder='Name' value={name} onChange={(event:any)=>setName(event.target.value)} />
            <div className='flex flex-col items-center justify-center gap-1 w-[300px]'>
                <div className='text-xs'>Importance</div>
                <Checkbox onCheckedChange={()=>setImportance(!importance)} />
            </div>
            <div className='flex flex-col items-center justify-center gap-1 w-[300px]'>
                <div className='text-xs'>Urgency</div>
                <Checkbox onCheckedChange={()=>setUrgency(!urgency)}/>
            </div>
            <DatePicker className='w-[300px]' placeholder='select Deadline' value={deadlines} onChange={setDeadlines} />
        </div>
        <Button onClick={handleAddTask} size="lg" variant='secondary'> Add a Task</Button>
    </div>
  )
}

export default TaskForm