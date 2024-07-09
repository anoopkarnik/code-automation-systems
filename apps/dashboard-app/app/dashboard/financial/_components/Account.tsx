'use client'

import React, { useContext, useEffect, useState } from 'react'
import { ConnectionsContext } from '../../../../providers/connections-provider'
import { queryNotionDatabaseAction } from '../_actions/notion'
import NotionTable from './NotionTable'

const Account = () => {
    const connectionsContext = useContext(ConnectionsContext)
    const accountDbId = connectionsContext?.notionNode?.accountsDb?.id
    const apiToken = connectionsContext?.notionNode?.accessToken
    const [database, setDatabase] = useState<any>([])
    const [databaseKeys, setDatabaseKeys] = useState<any>([])

    useEffect(() => {
        const updateDatabase = async () => {    
            const db = await queryNotionDatabaseAction({apiToken ,database_id: accountDbId})
            setDatabase(db.results)
            setDatabaseKeys(Object.keys(db.results[0]).map(key => ({name:key, checked: true})))
        }
        updateDatabase()        
    },[apiToken, accountDbId])

    const handleCheckedChange = (column:any) => {
        const updatedColumns = databaseKeys.map((col:any) => {
            if (col.name === column.name) {
                return {...col, checked: !col.checked}
            }
            return col
        })
        setDatabaseKeys(updatedColumns)
    }
  return (
    <div className='flex flex-col  '>
        <NotionTable databaseKeys={databaseKeys} handleCheckedChange={handleCheckedChange} database={database}/>
    </div>
  )
}

export default Account