import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@repo/ui/molecules/shadcn/Sheet'
import React from 'react'
import SelectedForm from './SelectedForm'
import { Button } from '@repo/ui/molecules/shadcn/Button'

const NodeSheet = ({funcType,type,subType,node}:any) => {
  return (
    <Sheet>
        <SheetTrigger asChild>
            {funcType === 'create' ? 
            <div className='flex justify-start items-center gap-2 p-2 mr-4 hover:bg-destructive/10 cursor-pointer'>
                <div>{subType.name}</div>
                <div>{subType.description}</div>
            </div>: 
            <Button className='text-lg font-medium mt-2'>
                Edit Node
            </Button>}
        </SheetTrigger>
        <SheetContent side='rightLarge'>
            <SheetHeader>
                <SheetTitle>Create a {subType.name} </SheetTitle>
                <SheetDescription>
                    {subType.description}
                </SheetDescription>
            </SheetHeader>
            <SelectedForm type={type} subType={subType} node={node}/>
            <SheetFooter >
            </SheetFooter>
        </SheetContent>
    </Sheet> 
  )
}

export default NodeSheet