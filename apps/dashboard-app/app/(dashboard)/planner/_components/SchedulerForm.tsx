import { Button } from '@repo/ui/molecules/shadcn/Button'
import { Input } from '@repo/ui/molecules/shadcn/Input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@repo/ui/molecules/shadcn/Select'
import React, { useContext, useState } from 'react'
import { ConnectionsContext } from '../../../../providers/connections-provider'
import { createNotionPageAction } from '../../../../actions/notion/notion'
import { Checkboxes } from '@repo/ui/molecules/common/Checkboxes'
import { DatePicker } from '@repo/ui/molecules/shadcn/DatePicker'

const SchedulerForm = () => {
    const connectionsContext = useContext(ConnectionsContext)
    const apiToken = connectionsContext?.notionNode?.accessToken
    const schedulerDbId = connectionsContext?.notionNode?.schedulerDb?.id
    const budgetDbId = connectionsContext?.notionNode?.monthlyBudgetDb?.id
    let repeatTypes = ['daily','weekly','monthly','yearly','off']
    let locations = ['Home','Parents','Long Vacation','Short Vacation']
    let weeks = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday']
    let timeZones = ['Asia/Kolkata']
    let types = ['Financial','Task','Habit']

    const [name, setName] = useState('')
    const [repeatType, setRepeatType] = useState('')
    const [daysOfWeek, setDaysOfWeek] = useState('')
    const [selectedLocations, setSelectedLocations] = useState<string[]>([])
    const [repeatNumber, setRepeatNumber] = useState(1)
    const [startDate, setStartDate] = useState(new Date())
    const [time, setTime] = useState('')
    const [timeZone, setTimeZone] = useState('')
    const [type, setType] = useState('')

      const handleAddScheduler = async () => {
        if (!name || !repeatType ||  !selectedLocations || !repeatNumber || !startDate || !time || !timeZone || !type) {
          return
        }
        const properties:any = [
            {name:'Name',type: 'title', value: name},
            {name:'Repeat Type',type: 'select', value: repeatType},
            {name:'Location',type: 'multi_select', value: selectedLocations},
            {name:'Repeat Number',type: 'number', value: repeatNumber},
            {name:'Start Date',type: 'date', value: startDate},
            {name:'Time',type: 'text', value: time},
            {name:'Time Zone',type: 'select', value: timeZone},
            {name:'Type',type: 'select', value: type},
        ]
        if (repeatType === 'weekly') {
            properties.push({name:'Days of Week',type: 'multi_select', value: daysOfWeek})
        }
        const dbId =schedulerDbId
        const response = await createNotionPageAction({apiToken, dbId, properties})
      }
  
  
  return (
    <div className='flex flex-col items-center justify-center gap-4 border-2 border-border/20 p-4 m-2'>
        <div className='flex items-center justify-between gap-4 w-[95%] flex-wrap my-2 mx-2 '>
            <Input className='w-[300px]' placeholder='Name' value={name} onChange={(event)=>setName(event.target.value)} />
            <Select value={type} onValueChange={(value) => setType(value)} >
                <SelectTrigger className='w-[300px]'>
                    <SelectValue placeholder={`Select Type`}/>
                </SelectTrigger>
                <SelectContent>
                    {types.length> 0 && types?.map((type:any) => (
                        <SelectItem key={type} value={type}>
                            <div className='flex items-center justify-center gap-4'>
                                <div>{type}</div>
                            </div>
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
            <Input className='w-[300px]' placeholder='Repeat Number' value={repeatNumber} onChange={(event)=>setRepeatNumber(Number(event.target.value))} />
            <Checkboxes className='w-[300px]' placeholder='Select Eligible Locations' options={locations} values={selectedLocations} onChange={setSelectedLocations} />
            <DatePicker className='w-[300px]' placeholder='select start Date' value={startDate} onChange={setStartDate} />
            <Select value={repeatType} onValueChange={(value) => setRepeatType(value)} >
                <SelectTrigger className='w-[300px]'>
                    <SelectValue placeholder={`Select Repeat Type`}/>
                </SelectTrigger>
                <SelectContent>
                    {repeatTypes.length> 0 && repeatTypes?.map((repeatType:any) => (
                        <SelectItem key={repeatType} value={repeatType}>
                            <div className='flex items-center justify-center gap-4'>
                                <div>{repeatType}</div>
                            </div>
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
            <Select value={timeZone} onValueChange={(value) => setTimeZone(value)} >
                <SelectTrigger className='w-[300px]'>
                    <SelectValue placeholder={`Select Time Zone`}/>
                </SelectTrigger>
                <SelectContent>
                    {timeZones.length> 0 && timeZones?.map((timeZone:any) => (
                        <SelectItem key={timeZone} value={timeZone}>
                            <div className='flex items-center justify-center gap-4'>
                                <div>{timeZone}</div>
                            </div>
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
            <Input className='w-[300px]' placeholder='Time' value={time} onChange={(event)=>setTime(event.target.value)} />
            {repeatType === 'weekly' && 
            <Checkboxes className='w-[200px]' placeholder='Select Days of Week' options={weeks} values={daysOfWeek}
            onChange={setDaysOfWeek} />}
            
        </div>
        <Button onClick={handleAddScheduler} size="lg" variant='secondary'> Add a Schedule</Button>
    </div>
  )
}

export default SchedulerForm