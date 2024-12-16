'use selection'

import React, {  useContext, useEffect, useState } from 'react'
import { ConnectionsContext } from '../../../../providers/connections-provider'
import { getDatabases, getNotionInfo } from '../../../actions/notion/notion'
import { Button } from '@repo/ui/atoms/shadcn/Button'
import { updateNotionDatabase } from '../../../actions/notion/notion'
import { useSession } from 'next-auth/react'
import SearchableSelect from '@repo/ui/molecules/custom/SearchableSelect'

const   DbSelection = ({title,name,fieldName}:any) => {
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
        const fetchNotionDb = async() =>{
            if (!userId) return
            const notion_info:any = await getNotionInfo(userId)
            setSelectedDb(JSON.stringify(notion_info.notionDb?.[fieldName] || {}))
            connectionsContext.setNotionNode({...connectionsContext.notionNode,[fieldName]:notion_info.notionDb?.[fieldName] || {}})
        }
        fetchNotionDb()
    }, [userId,fieldName])


    const updateDatabase = async () => {
        const selectedDatabase = selectedDb ? JSON.parse(selectedDb) : null;
        connectionsContext.setNotionNode({...connectionsContext.notionNode,[fieldName]:selectedDatabase})
        await updateNotionDatabase(connectionsContext.notionNode?.notionId,fieldName,selectedDatabase)
    }

    const handleDatabaseChange = (database: any) => {
        setSelectedDb(database);
    };
  return (
    <div className='flex flex-wrap items-center justify-center py-10 gap-4 '>
        <div className='text-button'> {title}</div>

        <SearchableSelect
            name="Database"
            options={databases || []}
            selectedOption={selectedDb}
            onChange={handleDatabaseChange}
        />
        <Button onClick={updateDatabase} size="lg"> Update Database</Button>
    </div>
  )
}

export default DbSelection