import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@repo/ui/molecules/shadcn/Sheet'
import React, { useState } from 'react'
import SelectedForm from './SelectedForm'
import { Button } from '@repo/ui/atoms/shadcn/Button'
import { ExpandIcon, ShrinkIcon } from 'lucide-react'
import { set } from 'date-fns'

const NodeSheet = ({funcType,nodeType,type,subType,node}:any) => {
    const [size, setSize] = useState<any>("rightLarge")
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
        <SheetContent className="overflow-y-auto" side={size}>
            <SheetHeader>
                <SheetTitle>
                    <div className='flex items-center justify-start gap-4'>
                        <div>Create a {subType.name}</div>
                        {size=="rightLarge" && <ExpandIcon className='cursor-pointer w-5 h-5' onClick={()=>setSize("rightXLarge")}/>}
                        {size=="rightXLarge" && <ShrinkIcon className='cursor-pointer w-5 h-5' onClick={()=>setSize("rightLarge")}/>}
                    </div>
                    
                </SheetTitle>
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