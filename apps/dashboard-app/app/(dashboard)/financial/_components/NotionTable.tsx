'use client'

import { DataTable } from '@repo/ui/molecules/shadcn/DataTable'
import { Button } from '@repo/ui/molecules/shadcn/Button'
import React, { useContext, useEffect, useState } from 'react'
import { ConnectionsContext } from '../../../../providers/connections-provider'
import { queryNotionDatabaseAction, queryNotionDatabaseProperties } from '../_actions/notion'
import { ArrowUpDown } from "lucide-react"

const NotionTable = ({dbId}:any) => {
    const connectionsContext = useContext(ConnectionsContext)
    const apiToken = connectionsContext?.notionNode?.accessToken
    const [database, setDatabase] = useState<any>([])
    const [databaseKeys, setDatabaseKeys] = useState<any>([])

    useEffect(() => {
        const updateDatabase = async () => {    
            const db = await queryNotionDatabaseAction({apiToken ,database_id: dbId})
            const dbProps = await queryNotionDatabaseProperties({apiToken ,database_id: dbId})
            setDatabase(db.results)
            const keys = Object.keys(dbProps.properties).map(key => {
                const property = dbProps.properties[key]
                return {
                    header: ({ column }:any) => {
                        return (
                          <Button
                            variant="ghost"
                            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                          >
                            {key}
                            <ArrowUpDown className="ml-2 h-4 w-4" />
                          </Button>
                        )
                      },
                      
                    accessorKey: key,
                    id: key,
                    type: property?.type,
                    }
            })
            const filteredKeys = keys.filter((key:any) => key.type != 'unique_id' && key.type != 'relation' )
            const sortedKeys = filteredKeys.sort((a:any, b:any) => {
                if (a.type === 'title') return -1;
                if (b.type === 'title') return 1;
                if (a.type === 'created_time' || a.type === 'last_edited_time') return 1;
                if (b.type === 'created_time' || b.type === 'last_edited_time') return -1;
                return 0;
            });
            setDatabaseKeys(sortedKeys)
        }
        updateDatabase()        
    },[apiToken, dbId])

  return (
    <>
        <div className="overflow-x-auto  ">
            <DataTable columns={databaseKeys} data={database} />
        </div>
    </>
  )
}

export default NotionTable