'use client'

import { Table,TableBody,TableCell,TableHeader,TableRow,} from "@repo/ui/molecules/shadcn/Table"
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from '@repo/ui/molecules/shadcn/Dropdown'
import { Button } from '@repo/ui/molecules/shadcn/Button'
import React, { useContext, useEffect, useState } from 'react'
import { ConnectionsContext } from '../../../../providers/connections-provider'
import { queryNotionDatabaseAction, queryNotionDatabaseProperties } from '../_actions/notion'

const NotionTable = ({showFilters, dbId}:any) => {
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
                return {name: key, checked: true, ...property}
            })
            const filteredKeys = keys.filter((key:any) => key.type != 'unique_id' && key.type != 'relation' )
            const sortedKeys = filteredKeys.sort((a:any, b:any) => {
                if (a.type === 'title') return -1;
                if (b.type === 'title') return 1;
                if (a.type === 'created_time' || a.type === 'last_edited_time') return 1;
                if (b.type === 'created_time' || b.type === 'last_edited_time') return -1;
                return 0;
            });
            console.log('Keys',filteredKeys)
            setDatabaseKeys(sortedKeys)
        }
        updateDatabase()        
    },[apiToken, dbId])

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
    <>
        {showFilters && 
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button className='variant w-[120px] mx-3'>Show Columns</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className='w-56 z-[999999]  '>
                    {databaseKeys?.map((column:any,index:any) => (
                        <DropdownMenuCheckboxItem key={index} checked={column?.checked} onCheckedChange={()=>{handleCheckedChange(column)}} >
                            {column?.name}
                        </DropdownMenuCheckboxItem>
                    ))}
                </DropdownMenuContent>
            </DropdownMenu>
        }
        <Table className='overflow-auto'>
            <TableHeader>
                <TableRow>
                    {databaseKeys.filter((column: any) => column.checked).map((column: any) => (
                        <TableCell className='font-bold text-lg' key={column.name}>
                            {column.name}
                        </TableCell>
                    ))}
                </TableRow>
            </TableHeader>
            <TableBody>
                {database.map((row:any) => (
                    <TableRow key={row.id}>
                        {databaseKeys.filter((column: any) => column.checked).map((column: any) => (
                            <TableCell key={column.name}>
                                {String(row[column.name])}
                            </TableCell>
                        ))}
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    </>
  )
}

export default NotionTable