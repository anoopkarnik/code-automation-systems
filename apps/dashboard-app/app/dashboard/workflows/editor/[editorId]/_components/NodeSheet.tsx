'use client'
import { Button } from '@repo/ui/molecules/shadcn/Button';
import React, {  useContext, useEffect } from 'react'
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@repo/ui/molecules/shadcn/Sheet'

import 'reactflow/dist/style.css';
import ActionSelect from '../_components/ActionSelect';

const NodeSheet = ({node,type,actionTypes}:any) => {
  return (
    <>
        <Sheet>
            <SheetTrigger asChild>
                <Button className='text-2xl font-medium mt-6'>
                    {node.length===0 ? "Create" : "Edit"} {type}
                </Button>
            </SheetTrigger>
            <SheetContent side='rightLarge'>
                <SheetHeader>
                    <SheetTitle>Create a {type} </SheetTitle>
                    <SheetDescription>
                        Give details of the trigger used
                    </SheetDescription>
                </SheetHeader>
                <ActionSelect type={type} options={actionTypes} node={node}/>
                <SheetFooter >
                </SheetFooter>
            </SheetContent>
        </Sheet>  
    </>
  )
}

export default NodeSheet