'use client'
/* eslint-disable */
import React, {  useContext, useEffect, useState } from 'react'

import 'reactflow/dist/style.css';
import { Card,CardHeader,CardTitle,CardFooter,CardDescription,CardContent } from '@repo/ui/molecules/shadcn/Card';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { deleteActionAction, deleteTriggerAction, editFlow,  getActionTypesAction,  getTriggerTypesAction,  publishFlow, runWorkflow } from '../../../../../../actions/workflows/workflow';
import { EditorContext } from '../../../../../../providers/editor-provider';
import { ArrowBigDownDash, Edit2Icon, TrashIcon } from 'lucide-react';
import { Input } from '@repo/ui/molecules/shadcn/Input';
import { Switch } from '@repo/ui/molecules/shadcn/Switch';
import { Label } from '@repo/ui/molecules/shadcn/Label';
import ConfirmDialog from '@repo/ui/molecules/common/ConfirmDialog';
import { getWorkflow } from '../../../../../../actions/workflows/workflow';
import NodeModal from './NodeModal';
import DynamicIcon from '../../../../../../components/DynamicIcon';
import NodeSheet from './NodeSheet';
import NodeCard from './NodeCard';
import { useToast } from '../../../../../../hooks/useToast';
import { Button } from '@repo/ui/molecules/shadcn/Button';
import { useSearchParam } from 'react-use';

const Nodes = () => {
    const params = useParams()
    const editorId = params?.editorId
    const editor =  useContext(EditorContext);
    const [showEdit,setShowEdit] = useState(false);
    const [name, setName] = useState(editor.name);
    const [toggle,setToggle] = useState(editor.publish || false)
    const router = useRouter();
    const [loading,setLoading] = useState(false)
    const [workflow,setWorkflow] = useState({});

    const [triggerTypes, setTriggerTypes] = useState([]);
    const [actionTypes, setActionTypes] = useState([]);
    const {toast} = useToast();

    const onToggle = async () =>{
        setToggle(!toggle)
        await publishFlow(editorId as string,!toggle)
    }

    useEffect(() => { 
        const fetchTypes = async () => {
            const triggerTypes:any = await getTriggerTypesAction();
            setTriggerTypes(triggerTypes);
            const actionTypes:any = await getActionTypesAction();
            setActionTypes(actionTypes);
        }
        fetchTypes();
    },[])

    useEffect(() => {
        const refreshNodes = async () => {
            setLoading(true);
            const res = await getWorkflow(editorId as string);
            setLoading(false);
            editor.setTrigger(res?.trigger);
            editor.setActions(res?.actions);
            editor.setPublish(res?.publish || false);
            editor.setName(res?.name || '');
            editor.setDescription(res?.description || '');
        }
        refreshNodes();
    },[editorId] )

    const handleEdit = async () =>{
        if (showEdit) {
            editor.setName(name);
            await editFlow(editorId as string,name,editor.description);
        }
        setShowEdit(!showEdit);
        router.refresh();
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
        <div className='text-4xl flex items-center gap-4 w-full justify-between px-10'>
            <div></div>
            <div className='flex items-center justify-between gap-2'>
                {showEdit ? 
                    <Input placeholder={editor.name} onChange={(e:any) => setName(e.target.value)}/>:
                    <div>{editor.name}</div>
                }
                <Edit2Icon onClick={handleEdit}/>
                <Button onClick={handleRun} >Run</Button>
            </div>
            <div className='flex items-center gap-2 text-right '>
                <Label htmlFor='airplane-mode'>
                    {toggle? 'Off': 'On'}
                </Label>
                <Switch id='airplane-mode' onClick={onToggle} defaultChecked={editor.publish!} />
            </div>
        </div>
        {editor.trigger ? (
                <NodeCard funcType='edit' nodeType='Trigger' node={editor.trigger}
                 type={editor.trigger.type.triggerType} subType={editor.trigger.type} handleDelete={handleDelete}/>
              ):(
            <NodeModal node={[]} type='Trigger' types={triggerTypes}/>
        )}
        <ArrowBigDownDash/>
        {editor.actions.length > 0 && editor.actions?.map((action:any) => (
            <>
                <NodeCard key={action?.id} funcType='edit' nodeType='Action' node={action}
                 type={action?.type?.actionType} subType={action?.type} handleDelete={handleDelete}/>
                <ArrowBigDownDash/>
            </>
        ))}
        <NodeModal node={[]} type='Action' types={actionTypes}/>
    </>
  )
}

export default Nodes