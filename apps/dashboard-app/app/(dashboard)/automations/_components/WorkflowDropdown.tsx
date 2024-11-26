import ConfirmDialog from '@repo/ui/molecules/custom/ConfirmDialog'
import { DropdownMenuContent, DropdownMenuItem } from '@repo/ui/molecules/shadcn/Dropdown'
import {  CopyIcon, Edit2Icon, TrashIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { useToast } from '../../../../hooks/useToast'
import { createTemplate, deleteFlow, duplicateWorkflow, makeFlowPublic, publishFlow } from '../../../actions/workflows/workflow'
import { Checkbox } from '@repo/ui/atoms/shadcn/Checkbox'
import {  useSession } from 'next-auth/react'

const WorkflowDropdown = ({workflow}:any) => {

    const [publish,setPublish] = useState(workflow.publish)
    const [publicWorkflow,setPublicWorkflow] = useState(workflow.shared)
    const router = useRouter();
    const session = useSession();
    const userId = session.data?.user?.id;

    const {toast} = useToast();

    const onPublish = async () =>{
        setPublish(!publish)
        await publishFlow(workflow.id,!publish)
    }

    const onPublic = async () =>{
        await makeFlowPublic(workflow.id,!publicWorkflow)
        setPublicWorkflow(!publicWorkflow)
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

    const onDuplication = async () => {
        const res = await duplicateWorkflow(workflow.id,userId)
        if (res.success){
            toast({title: "Success", description: res?.success, variant: 'default'})
            router.refresh()
        }
        else if (res.error){
            toast({title: "Error", description: res?.error, variant: 'destructive'})
        }
    }

    const onTemplateCreation = async () => {
        const res = await createTemplate(workflow.id,userId)
        if (res.success){
            toast({title: "Success", description: res?.success, variant: 'default'})
            router.refresh()
        }
        else if (res.error){
            toast({title: "Error", description: res?.error, variant: 'destructive'})
        }
    }
  return (
    <DropdownMenuContent>
        <DropdownMenuItem className='cursor-pointer' onClick={()=>router.push(`/automations/editor/${workflow.id}`)}>
            <div className='flex items-center gap-2'>
                <Edit2Icon className=' w-4 h-4'/>
                <div>Edit</div>
            </div>
        </DropdownMenuItem>
        <DropdownMenuItem className='cursor-pointer' onClick={onDuplication}>
            <div className='flex items-center gap-2'>
                <CopyIcon className=' w-4 h-4'/>
                <div>Duplicate</div>
            </div>
        </DropdownMenuItem>
        <DropdownMenuItem className='cursor-pointer' onClick={onTemplateCreation}>
            <div className='flex items-center gap-2'>
                <CopyIcon className=' w-4 h-4'/>
                <div>Create Template</div>
            </div>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onPublish} className='cursor-pointer flex gap-2 items-center'>
            <Checkbox checked={publish}/>
            {!publish && <div >Publish</div>}
            {publish && <div >Unpublish</div>}
        </DropdownMenuItem>
        {/* <DropdownMenuItem onClick={onPublic} className='cursor-pointer flex gap-2 items-center'>
            <Checkbox checked={publicWorkflow}/>
            {!publicWorkflow && <div>Make Public</div>}
            {publicWorkflow && <div>Make Private</div>}
        </DropdownMenuItem> */}
        <DropdownMenuItem>
            <div className='flex items-center gap-2 cursor-pointer' onClick={()=>handleDelete(workflow.id)}>
                <TrashIcon className='cursor-pointer w-4 h-4'/> 
                <div>Delete</div>
            </div>
        </DropdownMenuItem>
    
    </DropdownMenuContent>
  )
}

export default WorkflowDropdown