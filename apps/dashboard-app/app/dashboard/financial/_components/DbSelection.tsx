import React, { useContext, useEffect, useState } from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@repo/ui/molecules/shadcn/Select'
import { ConnectionsContext } from '../../../../providers/connections-provider'
import { getDatabases } from '../_actions/notion'
import { Button } from '@repo/ui/molecules/shadcn/Button'

const DbSelection = ({title,updateDb,name}:any) => {
    const connectionsContext = useContext(ConnectionsContext)
    const [databases, setDatabases] = useState([])
    const [selectedDb, setSelectedDb] =  useState<any>(JSON.stringify(connectionsContext.notionNode?.accountsDb || {}))

    useEffect(() => {
        const fetchDatabases = async () => {
            const databases = await getDatabases(connectionsContext.notionNode?.accessToken)
            setDatabases(databases)
        }
        fetchDatabases()
    },[connectionsContext])

    const updateDatabase = async () => {
        const selectedDatabase = selectedDb ? JSON.parse(selectedDb) : null;
        if ( name == 'Accounts'){

            console.log('Updating Accounts Db',selectedDb)
            connectionsContext.setNotionNode({...connectionsContext.notionNode,accountsDb:selectedDatabase})
            await updateDb()
        }
        await updateDb(connectionsContext.notionNode?.notionId,selectedDatabase)
    }

  return (
    <div className='flex items-center gap-4 '>
        <div className='font-bold'> {title}</div>
        <Select value={selectedDb} onValueChange={(value) => setSelectedDb(value)} >
            <SelectTrigger className='w-[380px] p-5'>
                <SelectValue placeholder="Select Accouts Notion Db"/>
            </SelectTrigger>
            <SelectContent>
                {databases?.map((database:any) => (
                    <SelectItem key={database.id} value={JSON.stringify({id:database.id, icon: database.icon?.emoji, 
                    name: database.title[0]?.text?.content})}>
                        <div className='flex items-center justify-center gap-4'>
                            <div>{database.icon?.emoji || "⛁"}</div>
                            <div className='flex flex-col items-start justify-center'>
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