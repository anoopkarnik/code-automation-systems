'use client'

import { DataTable } from '@repo/ui/molecules/shadcn/DataTable'
import { Button } from '@repo/ui/atoms/shadcn/Button'
import React, {  useContext, useEffect, useState } from 'react'
import { ConnectionsContext } from '../../../../providers/connections-provider'
import { deleteNotionPages, queryNotionDatabaseAction, queryNotionDatabaseProperties } from '../../../actions/notion/notion'
import { ArrowUpDown } from "lucide-react"
import { Checkbox } from '@repo/ui/atoms/shadcn/Checkbox'
import { useRouter } from 'next/navigation'


const NotionTable = ({dbId}:any) => {
    const connectionsContext = useContext(ConnectionsContext)
    const apiToken = connectionsContext?.notionNode?.accessToken
    const [database, setDatabase] = useState<any>([])
    const [databaseKeys, setDatabaseKeys] = useState<any>([])
    const router = useRouter()

    const onDelete = async (row:any) => {
      const ids = row.map((r:any) => r.original.id)
      await deleteNotionPages({apiToken, dbId: dbId, ids})
      router.refresh()
    }

    const onEdit = async (row:any) => {
    }

    useEffect(() => {
        const updateDatabase = async () => {    
            if (!apiToken) return
            const db = await queryNotionDatabaseAction({apiToken ,database_id: dbId})
            const dbProps = await queryNotionDatabaseProperties({apiToken ,database_id: dbId})
            setDatabase(db.results)
            const keys:any = Object.keys(dbProps.properties).map(key => {
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
                    cell: ({row}:any) => {
                      return <div className=' font-medium'>{row.getValue(key)}</div>
                    },
            }})
            
            const filteredKeys = keys.filter((key:any) => key.type != 'unique_id' && key.type != 'relation' )
            const sortedKeys = filteredKeys.sort((a:any, b:any) => {
                if (a.type === 'title') return -1;
                if (b.type === 'title') return 1;
                if (a.type === 'created_time' || a.type === 'last_edited_time') return 1;
                if (b.type === 'created_time' || b.type === 'last_edited_time') return -1;
                return 0;
            });
            sortedKeys.unshift({
                id: "select",
                header: ({ table }:any) => (
                  <Checkbox
                    checked={
                      table.getIsAllPageRowsSelected() ||
                      (table.getIsSomePageRowsSelected() && "indeterminate")
                    }
                    onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value) }
                    aria-label="Select all"
                  />
                ),
                cell: ({ row }:any) => (
                  <Checkbox
                    checked={row.getIsSelected()}
                    onCheckedChange={
                      (value) => {
                        row.toggleSelected(!!value)
                      }
                    }
                    aria-label="Select row"
                  />
                ),
                enableSorting: false,
                enableHiding: false,
              })
            setDatabaseKeys(sortedKeys)
        }
        updateDatabase()        
    },[apiToken, dbId])

  return (
    <>
        <div className="overflow-x-auto w-[85%] ">
            <DataTable columns={databaseKeys} data={database} onDelete={onDelete} onEdit={onEdit}/>
        </div>
    </>
  )
}

export default NotionTable