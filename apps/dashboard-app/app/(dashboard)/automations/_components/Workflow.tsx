'use client'

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@repo/ui/molecules/shadcn/Card'
import { ArrowRightIcon, CircleCheck, CircleCheckIcon, CirclePauseIcon, CircleStopIcon, CircleXIcon, EllipsisVerticalIcon, GripIcon, GripVertical, GripVerticalIcon, TrashIcon } from 'lucide-react'
import DynamicIcon from '../../../../components/DynamicIcon'
import { DropdownMenu, DropdownMenuTrigger } from '@repo/ui/molecules/shadcn/Dropdown'
import WorkflowDropdown from './WorkflowDropdown'

const Workflow = ({workflow}:any) => {

  return (
    <Card className=''>
        <CardHeader className=''>
            <CardTitle className='flex items-start justify-between leading-3 '>
                <div className='flex justify-start items-center flex-wrap gap-2 text-button leading-normal'>
                    {workflow.name}
                    {workflow.publish && <CircleCheckIcon className='w-4 h-4 text-green-400'/>}
                    {!workflow.publish && <CirclePauseIcon className='w-4 h-4 text-red-400'/>}
                </div>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <EllipsisVerticalIcon className='cursor-pointer w-5 h-5'/>
                    </DropdownMenuTrigger>
                    <WorkflowDropdown workflow={workflow}/>
                </DropdownMenu>

            </CardTitle>
            <CardDescription className='text-description text-xs leading-snug mr-4'>{workflow.description}</CardDescription>

        </CardHeader>
        <CardContent className=''>
            <CardDescription>
                <div className='flex items-center justify-start gap-2 flex-wrap mt-2'>
                    {workflow.trigger && <>
                        <DynamicIcon icon={workflow.trigger.type.triggerType.icon}/>
                        <ArrowRightIcon className='w-2 h-2'/>
                    </>
                    }
                    {workflow.actions.map((action:any) => (
                        <><DynamicIcon key={action.id} icon={action.type.actionType.icon}/>
                        </>
                    ))}
                </div>
            </CardDescription>
        </CardContent>
    </Card>
  )
}

export default Workflow