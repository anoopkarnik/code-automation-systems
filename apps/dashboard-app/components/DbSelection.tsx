'use selection'

import React, {  useContext, useEffect, useRef, useState } from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@repo/ui/molecules/shadcn/Select'
import { ConnectionsContext } from '../providers/connections-provider'
import { getDatabases } from '../actions/notion/notion'
import { Button } from '@repo/ui/atoms/shadcn/Button'
import { updateNotionDatabase } from '../actions/notion/notion'
import { useSession } from 'next-auth/react'
import { Input } from '@repo/ui/atoms/shadcn/Input'
import { getDefaultDbFromContext } from '../actions/notion/common'

const DbSelection = ({title,name,fieldName}:any) => {
    const connectionsContext = useContext(ConnectionsContext)
    const accessToken = connectionsContext.notionNode?.accessToken
    const session = useSession()
    const userId = session?.data?.user?.id
    const [databases, setDatabases] = useState([])
    const [filteredDatabases, setFilteredDatabases] = useState([])
    const [selectedDb, setSelectedDb] =  useState<any>('')
    const [searchQuery, setSearchQuery] = useState('')
    const inputRef = useRef<HTMLInputElement | null>(null)

    useEffect(() => {
        const fetchDatabases = async () => {
            if (!accessToken) return
            const databases = await getDatabases(accessToken)
            setDatabases(databases)
            setFilteredDatabases(databases)
        }
        fetchDatabases()
    },[accessToken,userId])

    const handleSearch = (event: any) => {
        const query = event.target.value.toLowerCase();
        setSearchQuery(query);
    
        const filtered:any = databases?.filter((database: any) => {
            if (database.name == null) return false;
            return database.name.toLowerCase().includes(query);
        });
    
        // Check if the selected database is already in the filtered list
        const selectedDatabase:any = selectedDb ? JSON.parse(selectedDb) : null;
        if (selectedDatabase && !filtered.some((db: any) => db.id === selectedDatabase.id)) {
            // Add the selected database to the filtered list if it isn't already included
            filtered.push(selectedDatabase);
        }
    
        setFilteredDatabases(filtered);
    };
    
    useEffect(() => {
        if (connectionsContext) {
            const defaultDb = getDefaultDbFromContext(name, connectionsContext)
            setSelectedDb(JSON.stringify(defaultDb || {}))
        }
    }, [name, connectionsContext])


    const updateDatabase = async () => {
        const selectedDatabase = selectedDb ? JSON.parse(selectedDb) : null;
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

    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        if (isOpen && inputRef.current) {
            setTimeout(() => {
                inputRef.current?.focus()
            }, 0)
        }
    }, [isOpen])

  return (
    <div className='flex flex-wrap items-center justify-center border-b-2 border-border py-10 gap-4 '>
        <div className='font-bold w-[200px]'> {title}</div>

        <Select value={selectedDb} onValueChange={(value) => setSelectedDb(value)}
          onOpenChange={(isOpen) => setIsOpen(isOpen)}> 
            <SelectTrigger className='w-[380px] py-8'>
                <SelectValue placeholder={`Select ${name} Notion Db`}/>
            </SelectTrigger>
            <SelectContent>
                <Input ref={inputRef} placeholder='Search Database' className='w-full text-black' value={searchQuery} onChange={handleSearch} />
                {filteredDatabases.length> 0 && filteredDatabases?.map((database:any) => (
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
        <Button onClick={updateDatabase} size="lg"> Update Database</Button>
    </div>
  )
}

export default DbSelection