'use client'

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@repo/ui/molecules/shadcn/Card'
import { Label } from '@repo/ui/molecules/shadcn/Label'
import { Switch } from '@repo/ui/molecules/shadcn/Switch'
import React, { useState } from 'react'
import { deleteFlow, publishFlow } from '../../../../actions/workflows/workflow'
import ConfirmDialog from '@repo/ui/molecules/common/ConfirmDialog'
import { ArrowRightIcon, TrashIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Button } from '@repo/ui/molecules/shadcn/Button'
import DynamicIcon from '../../../../components/DynamicIcon'
import { useToast } from '../../../../hooks/useToast'

const Workflow = ({workflow}:any) => {

    const [toggle,setToggle] = useState(workflow.publish)
    const router = useRouter();
    const {toast} = useToast();

    const onToggle = async () =>{
        setToggle(!toggle)
        await publishFlow(workflow.id,!toggle)
    }

    const handleDelete = async (id:string) => {
        const res = await deleteFlow(id);
        if (res.success){
            toast({title: "Success", description: res?.success, variant: 'default'})
            router.refresh()
        }
        else if (res.error){
            toast({title: "Error", description: res?.error, variant: 'destructive'})
        }
    }

  return (
    <Card className=''>
        <CardHeader className='t'>
            <CardTitle className='flex items-center justify-between leading-3 '>
                <div className='flex items-center justify-start gap-2 text-lg'>
                    {workflow.name}
                </div>
                <ConfirmDialog 
                    alertActionFunction={()=>handleDelete(workflow.id)} 
                    alertTitle='Delete Workflow' 
                    alertDescription='Are you sure you want to delete this workflow?'
                    buttonDiv={<TrashIcon className='cursor-pointer w-5 h-5'/>}
                    alertActionText='Delete'
                    /> 
            </CardTitle>
            <CardDescription className='text-sm leading-3'>{workflow.description}</CardDescription>
            <CardDescription>
                <div className='flex items-center justify-start gap-2 flex-wrap'>
                    {workflow.trigger && <>
                        <DynamicIcon icon={workflow.trigger.type.triggerType.icon}/>
                        <ArrowRightIcon className='w-2 h-2'/>
                    </>
                    }
                    {workflow.actions.map((action:any) => (
                        <><DynamicIcon key={action.id} icon={action.type.actionType.icon}/>
                            <ArrowRightIcon className='w-2 h-2'/>
                        </>
                    ))}
                </div>
            </CardDescription>

        </CardHeader>
        <CardContent className=''>
            
        </CardContent>
        <CardFooter>
            <div className='w-full flex items-center justify-between'>
                <div className='flex items-center gap-2'>
                    <Label htmlFor='airplane-mode'>
                        {toggle? 'On': 'Off'}
                    </Label>
                    <Switch id='airplane-mode' onClick={onToggle} defaultChecked={workflow.publish!} />
                </div>
                <Button className='text-lg px-6 ' onClick={()=>router.push(`/workflows/editor/${workflow.id}`)}>Edit</Button>
            </div>
        </CardFooter>
    </Card>
  )
}

export default Workflow