'use client'

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@repo/ui/molecules/shadcn/Card'
import { Label } from '@repo/ui/molecules/shadcn/Label'
import { Switch } from '@repo/ui/molecules/shadcn/Switch'
import React, { useState } from 'react'
import { deleteFlow, publishFlow } from '../../../../actions/workflows/workflow'
import ConfirmDialog from '@repo/ui/molecules/common/ConfirmDialog'
import { TrashIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Button } from '@repo/ui/molecules/shadcn/Button'

const Workflow = ({workflow}:any) => {

    const [toggle,setToggle] = useState(workflow.publish)
    const router = useRouter();

    const onToggle = async () =>{
        setToggle(!toggle)
        await publishFlow(workflow.id,!toggle)
    }

    const handleDelete = async (id:string) => {
        await deleteFlow(id);
        router.refresh();
    }

  return (
    <Card className=''>
            <CardHeader className=''>
                <CardTitle className='flex items-center justify-between'>
                    <div>{workflow.name}</div>
                    <ConfirmDialog 
                        alertActionFunction={()=>handleDelete(workflow.id)} 
                        alertTitle='Delete Workflow' 
                        alertDescription='Are you sure you want to delete this workflow?'
                        buttonDiv={<TrashIcon className='cursor-pointer'/>}
                        alertActionText='Delete'
                        /> 
                </CardTitle>
                <CardDescription>{workflow.description}</CardDescription>
            </CardHeader>
            <CardContent className=''>
                
            </CardContent>
        <CardFooter>
            <div className='w-full flex items-center justify-between'>
                <div className='flex items-center'>
                    <Label htmlFor='airplane-mode'>
                        {toggle? 'On': 'Off'}
                    </Label>
                    <Switch id='airplane-mode' onClick={onToggle} defaultChecked={workflow.publish!} />
                </div>
                <Button className='text-xl px-10 ' onClick={()=>router.push(`/workflows/editor/${workflow.id}`)}>Edit</Button>
                <div></div>
            </div>
        </CardFooter>
    </Card>
  )
}

export default Workflow