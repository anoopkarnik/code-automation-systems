import { Button } from '@repo/ui/molecules/shadcn/Button'
import { Input } from '@repo/ui/molecules/shadcn/Input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@repo/ui/molecules/shadcn/Select'
import React, { useContext, useEffect, useState } from 'react'
import { ConnectionsContext } from '../../../../providers/connections-provider'
import { createNotionPageAction, queryNotionDatabaseAction } from '../../../../actions/notion/notion'

const BudgetForm = () => {
    const connectionsContext = useContext(ConnectionsContext)
    const apiToken = connectionsContext?.notionNode?.accessToken
    const budgetDbId = connectionsContext?.notionNode?.monthlyBudgetDb?.id
    let schedulerDbId = connectionsContext?.notionNode?.schedulerDb?.id
    let expenseTypes = ['Living','Growth','Delight','Saving','Others']
    let schedulerTypes = ['Monthly','BiMonthly','Quarterly','Yearly','Half Yearly']


    const [name, setName] = useState('')
    const [cost, setCost] = useState('')
    const [expenseType, setExpenseType] = useState('')
    const [schedulerType, setSchedulerType] = useState('')
    const [scheduler, setScheduler] = useState('')
    const [schedulers, setSchedulers] = useState([])
    const [filteredSchedulers, setFilteredSchedulers] = useState([])
    const [searchSchedulerQuery, setSearchSchedulerQuery] = useState('')

  
    useEffect(() => {
      const updateSummary = async () => {
        try{
          if (!apiToken || !schedulerDbId) {
            return
          }
          const schedulers = await queryNotionDatabaseAction({apiToken,database_id:schedulerDbId}) 
          setSchedulers(schedulers.results)
          setFilteredSchedulers(schedulers.results)
          
        }catch(e){
          console.error('Error in fetching schedulers',e)
        }
      }
      updateSummary()
    },[apiToken, schedulerDbId])
  
      const handleScheduler = (event:any) => {
        const query = event.target.value.toLowerCase();
        setSearchSchedulerQuery(query)
        setFilteredSchedulers(schedulers?.filter((scheduler:any) => {
          if(scheduler.Name ===null) return
          return scheduler.Name.toLowerCase().includes(query)
        }));
      }
  
      const handleAddBudget = async () => {
        if (!name || !cost || !expenseType || !schedulerType || !scheduler) {
          return
        }
        const selectedScheduler:any = schedulers?.find((scheduler:any) => scheduler.Name === scheduler)
        if (!scheduler) {
          return
        }
        const properties:any = [
            {name:'Name',type: 'title', value: name},
            {name:'Cost',type: 'number', value: Number(cost)},
            {name:'Expense Type',type: 'select', value: expenseType},
            {name:'Scheduler Type',type: 'select', value: schedulerType},
            {name:'Scheduler',type: 'relation', value: [selectedScheduler.id]},
        ]
        const dbId = budgetDbId
        const response = await createNotionPageAction({apiToken, dbId, properties})
      }
  
  
  return (
    <div className='flex flex-col items-center justify-center gap-4 border-2 border-border/20 p-4 m-2'>
        <div className='flex items-center justify-between gap-4 w-[95%] flex-wrap my-2 mx-2 '>
          <Input className='w-[300px]' placeholder='Name' value={name} onChange={(event)=>setName(event.target.value)} />
          <Input className='w-[300px]' placeholder='Cost' value={cost} onChange={(event)=>setCost(event.target.value)} />
          <Select value={expenseType} onValueChange={(value) => setExpenseType(value)} >
              <SelectTrigger className='w-[300px]'>
                  <SelectValue placeholder={`Select Expense Type`}/>
              </SelectTrigger>
              <SelectContent>
                  {expenseTypes.length> 0 && expenseTypes?.map((expenseType:any) => (
                      <SelectItem key={expenseType} value={expenseType}>
                          <div className='flex items-center justify-center gap-4'>
                              <div>{expenseType}</div>
                          </div>
                      </SelectItem>
                  ))}
              </SelectContent>
          </Select>
          <Select value={schedulerType} onValueChange={(value) => setSchedulerType(value)} >
              <SelectTrigger className='w-[300px]'>
                  <SelectValue placeholder={`Select Scheduler Type`}/>
              </SelectTrigger>
              <SelectContent>
                  {schedulerTypes.length> 0 && schedulerTypes?.map((schedulerType:any) => (
                      <SelectItem key={schedulerType} value={schedulerType}>
                          <div className='flex items-center justify-center gap-4'>
                              <div>{schedulerType}</div>
                          </div>
                      </SelectItem>
                  ))}
              </SelectContent>
          </Select>
          <Select value={scheduler} onValueChange={(value) => setScheduler(value)} >
              <SelectTrigger className='w-[300px]'>
                  <SelectValue placeholder={`Select Budget`}/>
              </SelectTrigger>
              <SelectContent>
                  <Input placeholder='Search Budget' className='w-full' value={searchSchedulerQuery} onChange={handleScheduler} />
                  {filteredSchedulers.length> 0 && filteredSchedulers?.map((scheduler:any) => (
                      <SelectItem key={scheduler.id} value={scheduler.Name}>
                          <div className='flex items-center justify-center gap-4'>
                              <div>{scheduler.Name}</div>
                          </div>
                      </SelectItem>
                  ))}
              </SelectContent>
          </Select>
        </div>
        <Button onClick={handleAddBudget} size="lg"  variant='secondary'> Add a Budget</Button>
    </div>
  )
}

export default BudgetForm