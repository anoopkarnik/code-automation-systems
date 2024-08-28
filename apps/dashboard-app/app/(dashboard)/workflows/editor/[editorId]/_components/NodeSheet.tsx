import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@repo/ui/molecules/shadcn/Sheet'
import React from 'react'
import SelectedForm from './SelectedForm'
import { Button } from '@repo/ui/molecules/shadcn/Button'

const NodeSheet = ({funcType,nodeType,type,subType,node}:any) => {
  return (
    <Sheet>
        <SheetTrigger asChild>
            {funcType === 'create' ? 
            <div className='flex justify-start items-center gap-2 p-2 mr-4 hover:bg-destructive/10 cursor-pointer'>
                <div>{subType.name}</div>
                <div>{subType.description}</div>
            </div>: 
            <div className='w-full flex mt-2 '>
                <Button size="lg" className='w-full'>
                    Edit Node
                </Button>
            </div>}
        </SheetTrigger>
        <SheetContent side='rightLarge'>
            <SheetHeader>
                <SheetTitle>Create a {subType.name} </SheetTitle>
                <SheetDescription>
                    {subType.description}
                </SheetDescription>
            </SheetHeader>
            <SelectedForm funcType={funcType} nodeType={nodeType} type={type} subType={subType} node={node}/>
            <SheetFooter >
            </SheetFooter>
        </SheetContent>
    </Sheet> 
  )
}

export default NodeSheet