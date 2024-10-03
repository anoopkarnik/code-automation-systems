import { Button } from '@repo/ui/atoms/shadcn/Button'
import { Input } from '@repo/ui/atoms/shadcn/Input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@repo/ui/molecules/shadcn/Select'
import React, { useContext, useEffect, useState} from 'react'
import { ConnectionsContext } from '../../../../providers/connections-provider'
import { createNotionPageAction, queryNotionDatabaseAction } from '../../../actions/notion/notion'

const TransactionForm = () => {
    const connectionsContext = useContext(ConnectionsContext)
    const apiToken = connectionsContext?.notionNode?.accessToken
    const transactionsDbId = connectionsContext?.notionNode?.transactionsDb?.id
    const budgetDbId = connectionsContext?.notionNode?.monthlyBudgetDb?.id

    // Add Transaction
    const [name, setName] = useState('')
    const [cost, setCost] = useState('')
    const [selectedBudget, setSelectedBudget] = useState('')
    const [budgets, setBudgets] = useState([])
    const [filteredBudgets, setFilteredBudgets] = useState([])
    const [searchBudgetQuery, setSearchBudgetQuery] = useState('')

    useEffect(() => {
      const updateSummary = async () => {
        try{
          if (!apiToken || !budgetDbId) {
            return
          }
          const budgets = await queryNotionDatabaseAction({apiToken,database_id:budgetDbId}) 
          setBudgets(budgets.results)
          setFilteredBudgets(budgets.results)
          
        }catch(e){
          console.error('Error in fetching financial summary',e)
        }
      }
      updateSummary()
    },[apiToken, budgetDbId])

      const handleBudget = (event:any) => {
        const query = event.target.value.toLowerCase();
        setSearchBudgetQuery(query)
        setFilteredBudgets(budgets?.filter((budget:any) => {
          if(budget.Name ===null) return
          return budget.Name.toLowerCase().includes(query)
        }));
      }
  
      const handleAddTransaction = async () => {
        if (!name || !cost || !selectedBudget) {
          return
        }
        const budget:any = budgets?.find((budget:any) => budget.Name === selectedBudget)
        if (!budget) {
          return
        }
        const properties:any = [
          {name:'Name',type: 'title', value: name},
          {name:'Cost',type: 'number', value: Number(cost)},
          {name:'Monthly Budget',type: 'relation', value: [budget.id]}
        ]
        const dbId = transactionsDbId
        const response = await createNotionPageAction({apiToken, dbId, properties})
      }
  
  
  return (
    <div className='flex flex-col items-center justify-center gap-4 border-2 border-border/20 p-4 m-2 my-10'>
        <div className='flex items-center justify-between gap-4 w-[95%] flex-wrap my-2 mx-2 '>
          <Input className='w-[300px]' placeholder='Name' value={name} onChange={(event)=>setName(event.target.value)} />
          <Input className='w-[300px]' placeholder='Cost' value={cost} onChange={(event)=>setCost(event.target.value)} />
          <Select value={selectedBudget} onValueChange={(value) => setSelectedBudget(value)} >
              <SelectTrigger className='w-[300px]'>
                  <SelectValue placeholder={`Select Budget`}/>
              </SelectTrigger>
              <SelectContent>
                  <Input placeholder='Search Budget' className='w-full' value={searchBudgetQuery} onChange={handleBudget} />
                  {filteredBudgets.length> 0 && filteredBudgets?.map((budget:any) => (
                      <SelectItem key={budget.id} value={budget.Name}>
                          <div className='flex items-center justify-center gap-4'>
                              <div>{budget.Name}</div>
                          </div>
                      </SelectItem>
                  ))}
              </SelectContent>
          </Select>
        </div>
        <Button onClick={handleAddTransaction} size="lg" variant='secondary'> Add a Transaction</Button>
    </div>
  )
}

export default TransactionForm