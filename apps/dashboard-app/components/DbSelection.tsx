'use selection'

import React, {  useContext, useEffect, useState } from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@repo/ui/molecules/shadcn/Select'
import { ConnectionsContext } from '../providers/connections-provider'
import { getDatabases } from '../actions/notion/notion'
import { Button } from '@repo/ui/molecules/shadcn/Button'
import { updateNotionDatabase } from '../actions/notion/notion'
import { useSession } from 'next-auth/react'

const DbSelection = ({title,name,fieldName}:any) => {
    const connectionsContext = useContext(ConnectionsContext)
    const accessToken = connectionsContext.notionNode?.accessToken
    const session = useSession()
    const userId = session?.data?.user?.id
    const [databases, setDatabases] = useState([])
    const [selectedDb, setSelectedDb] =  useState<any>('')

    useEffect(() => {
        const fetchDatabases = async () => {
            if (!accessToken) return
            const databases = await getDatabases(accessToken)
            setDatabases(databases)
        }
        fetchDatabases()
    },[accessToken,userId])

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
        else if (name == 'Projects'){
            setSelectedDb(JSON.stringify(connectionsContext.notionNode?.projectsDb || {}))
        }
        else if (name == 'Blogs'){
            setSelectedDb(JSON.stringify(connectionsContext.notionNode?.blogsDb || {}))
        }
        else if (name == 'Place Of Work'){
            setSelectedDb(JSON.stringify(connectionsContext.notionNode?.placeOfWorkDb || {}))
        }
        else if (name == 'Books'){
            setSelectedDb(JSON.stringify(connectionsContext.notionNode?.booksDb || {}))
        }
        else if (name == 'Quick Capture'){
            setSelectedDb(JSON.stringify(connectionsContext.notionNode?.quickCaptureDb || {}))
        }
        else if (name == 'Areas'){
            setSelectedDb(JSON.stringify(connectionsContext.notionNode?.areasDb || {}))
        }
        else if (name == 'Archive'){
            setSelectedDb(JSON.stringify(connectionsContext.notionNode?.archiveDb || {}))
        }
        else if (name == 'Interesting'){
            setSelectedDb(JSON.stringify(connectionsContext.notionNode?.interestingDb || {}))
        }
        else if (name == 'Podcasts'){
            setSelectedDb(JSON.stringify(connectionsContext.notionNode?.podcastsDb || {}))
        }
        else if (name == 'Channels'){
            setSelectedDb(JSON.stringify(connectionsContext.notionNode?.channelsDb || {}))
        }
        else if (name == 'Videos'){
            setSelectedDb(JSON.stringify(connectionsContext.notionNode?.videosDb || {}))
        }
        else if (name == 'Skill Trees'){
            setSelectedDb(JSON.stringify(connectionsContext.notionNode?.skillTreesDb || {}))
        }

        else if (name == 'Scheduler'){
            setSelectedDb(JSON.stringify(connectionsContext.notionNode?.schedulerDb || {}))
        }
        else if (name == 'Calendar'){
            setSelectedDb(JSON.stringify(connectionsContext.notionNode?.calendarDb || {}))
        }
        else if (name == 'Eisenhower Matrix'){
            setSelectedDb(JSON.stringify(connectionsContext.notionNode?.eisenhowerMatrixDb || {}))
        }
        else if (name == 'Actions'){
            setSelectedDb(JSON.stringify(connectionsContext.notionNode?.actionsDb || {}))
        }
        else if (name == 'Time Tracking'){
            setSelectedDb(JSON.stringify(connectionsContext.notionNode?.timeTrackingDb || {}))
        }
        else if (name == 'Weekly Planner'){
            setSelectedDb(JSON.stringify(connectionsContext.notionNode?.weeklyPlannerDb || {}))
        }
        else if (name == 'Social Sphere'){
            setSelectedDb(JSON.stringify(connectionsContext.notionNode?.socialSphereDb || {}))
        }
        else if (name == 'Passwords'){
            setSelectedDb(JSON.stringify(connectionsContext.notionNode?.passwordsDb || {}))
        }
        else if (name == 'Journal'){
            setSelectedDb(JSON.stringify(connectionsContext.notionNode?.journalDb || {}))
        }
        else if (name == 'Inventory'){
            setSelectedDb(JSON.stringify(connectionsContext.notionNode?.inventoryDb || {}))
        }
        else if (name == 'Status'){
            setSelectedDb(JSON.stringify(connectionsContext.notionNode?.statusDb || {}))
        }
        else if (name == 'Goals'){
            setSelectedDb(JSON.stringify(connectionsContext.notionNode?.goalsDb || {}))
        }
        else if (name == 'Rewards'){
            setSelectedDb(JSON.stringify(connectionsContext.notionNode?.rewardsDb || {}))
        }
        else if (name == 'Punishments'){
            setSelectedDb(JSON.stringify(connectionsContext.notionNode?.punishmentsDb || {}))
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
        else if (name == 'Projects'){
            connectionsContext.setNotionNode({...connectionsContext.notionNode,projectsDb:selectedDatabase})
        }
        else if (name == 'Blogs'){
            connectionsContext.setNotionNode({...connectionsContext.notionNode,blogsDb:selectedDatabase})
        }
        else if (name == 'Place Of Work'){
            connectionsContext.setNotionNode({...connectionsContext.notionNode,placeOfWorkDb:selectedDatabase})
        }
        else if (name == 'Books'){
            connectionsContext.setNotionNode({...connectionsContext.notionNode,booksDb:selectedDatabase})
        }
        else if (name == 'Quick Capture'){
            connectionsContext.setNotionNode({...connectionsContext.notionNode,quickCaptureDb:selectedDatabase})
        }
        else if (name == 'Areas'){
            connectionsContext.setNotionNode({...connectionsContext.notionNode,areasDb:selectedDatabase})
        }
        else if (name == 'Archive'){
            connectionsContext.setNotionNode({...connectionsContext.notionNode,archiveDb:selectedDatabase})
        }
        else if (name == 'Interesting'){
            connectionsContext.setNotionNode({...connectionsContext.notionNode,interestingDb:selectedDatabase})
        }
        else if (name == 'Podcasts'){
            connectionsContext.setNotionNode({...connectionsContext.notionNode,podcastsDb:selectedDatabase})
        }
        else if (name == 'Channels'){
            connectionsContext.setNotionNode({...connectionsContext.notionNode,channelsDb:selectedDatabase})
        }
        else if (name == 'Videos'){
            connectionsContext.setNotionNode({...connectionsContext.notionNode,videosDb:selectedDatabase})
        }
        else if (name == 'Skill Trees'){
            connectionsContext.setNotionNode({...connectionsContext.notionNode,skillTreesDb:selectedDatabase})
        }
        else if (name == 'Scheduler'){
            connectionsContext.setNotionNode({...connectionsContext.notionNode,schedulerDb:selectedDatabase})
        }
        else if (name == 'Calendar'){
            connectionsContext.setNotionNode({...connectionsContext.notionNode,calendarDb:selectedDatabase})
        }
        else if (name == 'Eisenhower Matrix'){
            connectionsContext.setNotionNode({...connectionsContext.notionNode,eisenhowerMatrixDb:selectedDatabase})
        }
        else if (name == 'Actions'){
            connectionsContext.setNotionNode({...connectionsContext.notionNode,actionsDb:selectedDatabase})
        }
        else if (name == 'Time Tracking'){
            connectionsContext.setNotionNode({...connectionsContext.notionNode,timeTrackingDb:selectedDatabase})
        }
        else if (name == 'Weekly Planner'){
            connectionsContext.setNotionNode({...connectionsContext.notionNode,weeklyPlannerDb:selectedDatabase})
        }
        else if (name == 'Social Sphere'){
            connectionsContext.setNotionNode({...connectionsContext.notionNode,socialSphereDb:selectedDatabase})
        }
        else if (name == 'Passwords'){
            connectionsContext.setNotionNode({...connectionsContext.notionNode,passwordsDb:selectedDatabase})
        }
        else if (name == 'Journal'){
            connectionsContext.setNotionNode({...connectionsContext.notionNode,journalDb:selectedDatabase})
        }
        else if (name == 'Inventory'){
            connectionsContext.setNotionNode({...connectionsContext.notionNode,inventoryDb:selectedDatabase})
        }
        else if (name == 'Status'){
            connectionsContext.setNotionNode({...connectionsContext.notionNode,statusDb:selectedDatabase})
        }
        else if (name == 'Goals'){
            connectionsContext.setNotionNode({...connectionsContext.notionNode,goalsDb:selectedDatabase})
        }
        else if (name == 'Rewards'){
            connectionsContext.setNotionNode({...connectionsContext.notionNode,rewardsDb:selectedDatabase})
        }
        else if (name == 'Punishments'){
            connectionsContext.setNotionNode({...connectionsContext.notionNode,punishmentsDb:selectedDatabase})
        }
        await updateNotionDatabase(connectionsContext.notionNode?.notionId,fieldName,selectedDatabase)
    }

  return (
    <div className='flex flex-wrap items-center justify-center border-b-2 border-border py-10 gap-4 '>
        <div className='font-bold w-[200px]'> {title}</div>
        <Select value={selectedDb} onValueChange={(value) => setSelectedDb(value)} >
            <SelectTrigger className='w-[380px] py-8'>
                <SelectValue placeholder={`Select ${name} Notion Db`}/>
            </SelectTrigger>
            <SelectContent>
                {databases?.map((database:any) => (
                    <SelectItem key={database.id} value={JSON.stringify({id:database.id, icon: database.icon, 
                    name: database.name, accessToken: database.accessToken})}>
                        <div className='flex items-center justify-center gap-4'>
                            <div>{database.icon|| "⛁"}</div>
                            <div className='flex flex-col items-start justify-center w-[400px]'>
                                <div>{database.name}</div>
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