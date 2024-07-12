import React, {  useContext, useEffect, useState } from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@repo/ui/molecules/shadcn/Select'
import { ConnectionsContext } from '../../../../providers/connections-provider'
import { getDatabases } from '../_actions/notion'
import { Button } from '@repo/ui/molecules/shadcn/Button'
import { updateNotionDatabase } from '../_actions/notion'

const DbSelection = ({title,name,fieldName}:any) => {
    const connectionsContext = useContext(ConnectionsContext)
    const accessToken = connectionsContext.notionNode?.accessToken
    const [databases, setDatabases] = useState([])
    const [selectedDb, setSelectedDb] =  useState<any>('')

    useEffect(() => {
        const fetchDatabases = async () => {
            if (!accessToken) return
            const databases = await getDatabases(accessToken)
            setDatabases(databases)
        }
        fetchDatabases()
    },[accessToken])

    useEffect(() => {
        if (!connectionsContext) return
        if (name == 'Accounts'){
            setSelectedDb(JSON.stringify(connectionsContext.notionNode?.accountsDb || {}))
        }
        else if (name == 'Transactions'){
            setSelectedDb(JSON.stringify(connectionsContext.notionNode?.transactionsDb || {}))
        }
        else if (name == 'BudgetPlan'){
            setSelectedDb(JSON.stringify(connectionsContext.notionNode?.budgetPlanDb || {}))
        }
        else if (name == 'MonthlyBudget'){
            setSelectedDb(JSON.stringify(connectionsContext.notionNode?.monthlyBudgetDb || {}))
        }
        else if (name == 'FinancialGoals'){
            setSelectedDb(JSON.stringify(connectionsContext.notionNode?.financialGoalsDb || {}))
        }
        
    },[name,connectionsContext])

    const updateDatabase = async () => {
        const selectedDatabase = selectedDb ? JSON.parse(selectedDb) : null;
        setTimeout(() => {
            console.log('Selected Database',selectedDatabase)
        }, 1000);   
        if ( name == 'Accounts'){
            connectionsContext.setNotionNode({...connectionsContext.notionNode,accountsDb:selectedDatabase})
        }
        else if (name == 'Transactions'){
            connectionsContext.setNotionNode({...connectionsContext.notionNode,transactionsDb:selectedDatabase})
        }
        else if (name == 'MonthlyBudget'){
            connectionsContext.setNotionNode({...connectionsContext.notionNode,monthlyBudgetDb:selectedDatabase})
        }
        else if (name == 'BudgetPlan'){
            connectionsContext.setNotionNode({...connectionsContext.notionNode,budgetPlanDb:selectedDatabase})
        }
        else if (name == 'FinancialGoals'){
            connectionsContext.setNotionNode({...connectionsContext.notionNode,financialGoalsDb:selectedDatabase})
        }
        await updateNotionDatabase(connectionsContext.notionNode?.notionId,fieldName,selectedDatabase)
    }

  return (
    <div className='flex items-center gap-4 my-2'>
        <div className='font-bold w-[200px]'> {title}</div>
        <Select value={selectedDb} onValueChange={(value) => setSelectedDb(value)} >
            <SelectTrigger className='w-[380px] py-8'>
                <SelectValue placeholder={`Select ${name} Notion Db`}/>
            </SelectTrigger>
            <SelectContent>
                {databases?.map((database:any) => (
                    <SelectItem key={database.id} value={JSON.stringify({id:database.id, icon: database.icon?.emoji, 
                    name: database.title[0]?.text?.content})}>
                        <div className='flex items-center justify-center gap-4'>
                            <div>{database.icon?.emoji || "⛁"}</div>
                            <div className='flex flex-col items-start justify-center w-[400px]'>
                                <div>{database.title[0]?.text?.content}</div>
                                <div>{database.id}</div>
                            </div>
                        </div>
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
        <Button onClick={updateDatabase} className='font-bold'> Update Database</Button>
    </div>
  )
}

export default DbSelection