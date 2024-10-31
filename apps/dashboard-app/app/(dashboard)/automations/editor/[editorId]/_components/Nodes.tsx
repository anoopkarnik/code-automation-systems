'use client'
/* eslint-disable */
import React, {  useContext, useEffect, useState } from 'react'

import 'reactflow/dist/style.css';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { deleteActionAction, deleteTriggerAction, editFlow,  getActionTypesAction,  getTriggerTypesAction,  publishFlow, runWorkflow } from '../../../../../actions/workflows/workflow';
import { EditorContext } from '../../../../../../providers/editor-provider';
import { ArrowBigDownDash, Edit2Icon, TrashIcon } from 'lucide-react';
import { Input } from '@repo/ui/atoms/shadcn/Input';
import { Switch } from '@repo/ui/molecules/shadcn/Switch';
import { Label } from '@repo/ui/atoms/shadcn/Label';
import { getWorkflow } from '../../../../../actions/workflows/workflow';
import NodeModal from './NodeModal';

import NodeCard from './NodeCard';
import { useToast } from '../../../../../../hooks/useToast';
import { Button } from '@repo/ui/atoms/shadcn/Button';
import { Textarea } from '@repo/ui/atoms/shadcn/Textarea';

const Nodes = () => {
    const params = useParams()
    const editorId = params?.editorId
    const editor =  useContext(EditorContext);
    const [showNameEdit,setShowNameEdit] = useState(false);
    const [showDescriptionEdit,setShowDescriptionEdit] = useState(false);
    const [name, setName] = useState(editor.name);
    const [description, setDescription] = useState(editor.description);
    const [toggle,setToggle] = useState(editor.publish || false)
    const router = useRouter();
    const [loading,setLoading] = useState(false)
    const {toast} = useToast();

    const onToggle = async () =>{
        setToggle(!toggle)
        await publishFlow(editorId as string,!toggle)
    }

    useEffect(() => {
        const refreshNodes = async () => {
            setLoading(true);
            const res = await getWorkflow(editorId as string);
            setLoading(false);
            editor.setTrigger(res?.trigger);
            editor.setActions(res?.actions);
            editor.setPublish(res?.publish || false);
            editor.setName(res?.name || 'Add Name Here');
            editor.setDescription(res?.description || 'Add Description Here');
        }
        refreshNodes();
    },[editorId] )

    const handleEditName = async () =>{
        if (showNameEdit) {
            editor.setName(name)
            await editFlow(editorId as string,name,editor.description);
        }
        setShowNameEdit(!showNameEdit);
        // router.refresh();
    }

    const handleEditDescription = async () =>{
        if (showDescriptionEdit){
            editor.setDescription(description)
            await editFlow(editorId as string,editor.name,description);
        }
        setShowDescriptionEdit(!showDescriptionEdit);
    }


    const handleDelete = async (id:string,type:string) => {
        if (type === 'Trigger') {
            const res = await deleteTriggerAction(id);
            if (res.success){
                toast({title: "Success", description: res?.success, variant: 'default'})
                router.refresh()
            }
            else if (res.error){
                toast({title: "Error", description: res?.error, variant: 'destructive'})
            }
        }
        else {
            const res = await deleteActionAction(id);
            if (res.success){
                toast({title: "Success", description: res?.success, variant: 'default'})
                router.refresh()
            }
            else if (res.error){
                toast({title: "Error", description: res?.error, variant: 'destructive'})
            }
        }
    }

  if (loading) return (<div>Loading...</div>)

    const handleRun = async () => {
        toast({title: "Running", description: "Workflow has started", variant: 'default'})
        const res = await runWorkflow(editorId as string);
        if (res.success){
            toast({title: "Success", description: res?.success, variant: 'default'})
        }
        else if (res.error){
            toast({title: "Error", description: res?.error, variant: 'destructive'})
        }
    }

  return (
    <>
        <div className='text-4xl flex flex-col items-center gap-4 w-full justify-between px-10'>
            <div className='flex items-center gap-2 text-right '>
                <Label htmlFor='airplane-mode'>
                    {toggle? 'Off': 'On'}
                </Label>
                <Switch id='airplane-mode' onClick={onToggle} defaultChecked={editor.publish!} />
            </div>
            <div className='flex items-center gap-2 w-full justify-center'>
                {showNameEdit ? (
                    <Input
                        className='w-full'
                        placeholder={name}
                        onChange={(e: any) => setName(e.target.value)}
                        onBlur={handleEditName} // Exit edit mode when clicking outside the input
                        autoFocus // Automatically focus the input when entering edit mode
                    />
                ) : (
                    // Add onDoubleClick to enable editing on double click
                    <div onDoubleClick={handleEditName}>
                        {editor.name}
                    </div>
                )}
            </div>
            <div className='flex items-center justify-center gap-2 text-sm text-description w-full '>
                {showDescriptionEdit ? (
                    <Textarea
                        placeholder={editor.description}
                        onChange={(e: any) => setDescription(e.target.value)}
                        onBlur={handleEditDescription} // Exit edit mode when clicking outside the input
                        autoFocus // Automatically focus the input when entering edit mode
                        className='w-full'
                    />
                ) : (
                    // Add onDoubleClick to enable editing on double click
                    <div onDoubleClick={handleEditDescription}>
                        {editor.description || 'Add Description Here'}
                    </div>
                )}
            </div>
            <div className='w-[40%]'>
                <Button className='w-full' onClick={handleRun} >Run</Button>
            </div>

        </div>
        {editor.trigger ? (
                <NodeCard funcType='edit' nodeType='Trigger' node={editor.trigger}
                 type={editor.trigger.type.triggerType} subType={editor.trigger.type} handleDelete={handleDelete}/>
              ):(
            <NodeModal node={[]} type='Trigger'/>
        )}
        <ArrowBigDownDash/>
        {editor.actions.length > 0 && editor.actions?.map((action:any) => (
            <>
                <NodeCard key={action?.id} funcType='edit' nodeType='Action' node={action}
                 type={action?.type?.actionType} subType={action?.type} handleDelete={handleDelete}/>
                <ArrowBigDownDash/>
            </>
        ))}
        <NodeModal node={[]} type='Action'/>
    </>
  )
}

export default Nodes