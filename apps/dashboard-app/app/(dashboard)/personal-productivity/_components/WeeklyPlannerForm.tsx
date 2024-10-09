import { Button } from '@repo/ui/atoms/shadcn/Button'
import { Input } from '@repo/ui/atoms/shadcn/Input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@repo/ui/molecules/shadcn/Select'
import React, { useContext, useState } from 'react'
import { ConnectionsContext } from '../../../../providers/connections-provider'
import { createNotionPageAction} from '../../../actions/notion/notion'
import { DatePicker } from '@repo/ui/molecules/shadcn/DatePicker'

const WeeklyPlannerForm = () => {
    const connectionsContext = useContext(ConnectionsContext)
    const apiToken = connectionsContext?.notionNode?.accessToken
    const weeklyPlannerDbId = connectionsContext?.notionNode?.weeklyPlannerDb?.id

    const [name, setName] = useState('')
    let difficulties = ['Easy','Medium','Hard']
    const [difficulty, setDifficulty] = useState('')
    const [actualTime, setActualTime] = useState(0)
    const [weekToWorkOn, setWeekToWorkOn] = useState(new Date())


      const handleAddWeeklyWork = async () => {
        if (!name || !difficulty || !actualTime || !weekToWorkOn) {
          return
        }
        const properties:any = [
            {name:'Name',type: 'title', value: name},
            {name:'Difficulty',type: 'select', value: difficulty},
            {name:'Actual Time',type: 'number', value: actualTime},
            {name:'WeekToWorkOn',type: 'date', value: weekToWorkOn},
        ]
        
        const dbId = weeklyPlannerDbId
        const response = await createNotionPageAction({apiToken, dbId, properties})
      }
  
  
  return (
    <div className='flex flex-col items-center justify-center gap-4 border-2 border-border/20 p-4 m-2 my-10'>
        <div className='flex items-center justify-between gap-4 w-[95%] flex-wrap my-2 mx-2 '>
            <Input className='w-[300px]' placeholder='Name' value={name} onChange={(event:any)=>setName(event.target.value)} />
            <Input className='w-[300px]' placeholder='Time' value={actualTime} onChange={(event:any)=>setActualTime(Number(event.target.value))} />
            <Select value={difficulty} onValueChange={(value) => setDifficulty(value)} >
                <SelectTrigger className='w-[300px]'>
                    <SelectValue placeholder={`Select Difficulty`}/>
                </SelectTrigger>
                <SelectContent>
                    {difficulties.length> 0 && difficulties?.map((type:any) => (
                        <SelectItem key={type} value={type}>
                            <div className='flex items-center justify-center gap-4'>
                                <div>{type}</div>
                            </div>
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
            <DatePicker className='w-[300px]' placeholder='Select Week to Work On' value={weekToWorkOn} onChange={setWeekToWorkOn} />
        </div>
        <Button onClick={handleAddWeeklyWork} size="lg" variant='secondary'> Add a Weekly Deep Work Task</Button>
    </div>
  )
}

export default WeeklyPlannerForm