'use client'
import { Select, SelectContent, SelectItem, SelectTrigger } from '@repo/ui/molecules/shadcn/Select'
import React, { useContext, useState } from 'react'
import NotionTable from './NotionTable'
import { ConnectionsContext } from '../../../../providers/connections-provider'
import { getNotionInfo } from '../../../actions/notion/notion'

const NotionTables = ({tables}:any) => {
    const [selectedValue, setSelectedValue] = useState("Select Table")
    const connectionsContext:any = useContext(ConnectionsContext);
    const [dbId, setDbId] = useState('')
    
    const handleSelect = async (value:any) => { 
        const notionInfo:any = await getNotionInfo(connectionsContext?.notionNode?.userId) 
        setDbId(notionInfo?.notionDb?.[tables[value]]?.id)
        setSelectedValue(value)
    }

  return (
    <div className='flex flex-col items-center w-full'>
        <Select onValueChange={handleSelect}>
            <SelectTrigger className='mx-8 w-[200px]'>
                <div>{selectedValue}</div>
            </SelectTrigger>
            <SelectContent className='w-[200px]'>

            {Object.keys(tables).map((table:any) => (
                <SelectItem key={table} value={table}>
                    <div className='flex items-center justify-start gap-4 w-[200px]'>
                        <div>{table}</div>
                    </div>
                </SelectItem>
            ))}
            </SelectContent>
        </Select>
        {selectedValue!="Select Table" && <NotionTable dbId={dbId}/>}
    </div>
  )
}

export default NotionTables