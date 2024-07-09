'use client'

import React from 'react'
import { Table,TableBody,TableCell,TableHeader,TableRow,} from "@repo/ui/molecules/shadcn/Table"
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from '@repo/ui/molecules/shadcn/Dropdown'
import { Button } from '@repo/ui/molecules/shadcn/Button'

const NotionTable = ({databaseKeys,handleCheckedChange,database}:any) => {
  return (
    <>
    <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button className='variant w-[100px] mx-3'>Columns</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='w-56 z-[999999]  '>
                {databaseKeys?.map((column:any,index:any) => (
                    <DropdownMenuCheckboxItem key={index} checked={column?.checked} onCheckedChange={()=>{handleCheckedChange(column)}} >
                        {column?.name}
                    </DropdownMenuCheckboxItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
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
                                {row[column.name]}
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