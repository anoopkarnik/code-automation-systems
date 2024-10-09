'use selection'

import React, {  useContext, useEffect, useRef, useState } from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@repo/ui/molecules/shadcn/Select'
import { ConnectionsContext } from '../providers/connections-provider'
import { getDatabases, getNotionInfo } from '../app/actions/notion/notion'
import { Button } from '@repo/ui/atoms/shadcn/Button'
import { updateNotionDatabase } from '../app/actions/notion/notion'
import { useSession } from 'next-auth/react'
import { Input } from '@repo/ui/atoms/shadcn/Input'
import { getDefaultDbFromContext } from '../app/actions/notion/common'
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
        }
        fetchNotionDb()
        // if (connectionsContext) {
        //     const notion_info:any = await getNotionInfo(userId || '')
        //     const defaultDb = getDefaultDbFromContext(name, connectionsContext)
        //     console.log('defaultDb',JSON.stringify(defaultDb || {}))
        //     setSelectedDb(JSON.stringify(defaultDb || {}))
        // }
    }, [userId])


    const updateDatabase = async () => {
        console.log('selectedDb',selectedDb)
        const selectedDatabase = selectedDb ? JSON.parse(selectedDb) : null;
        connectionsContext.setNotionNode({...connectionsContext.notionNode,[fieldName]:selectedDatabase})
        await updateNotionDatabase(connectionsContext.notionNode?.notionId,fieldName,selectedDatabase)
    }

    const handleDatabaseChange = (database: any) => {
        setSelectedDb(database);
    };
  return (
    <div className='flex flex-wrap items-center justify-center py-10 gap-4 '>
        <div className='font-normal '> {title}</div>

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