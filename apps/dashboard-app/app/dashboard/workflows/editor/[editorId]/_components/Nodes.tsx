'use client'
/* eslint-disable */
import React, {  useContext, useEffect, useState } from 'react'
import { TRIGGER_TYPES, ACTION_TYPES } from '../../../../../../lib/constant';

import 'reactflow/dist/style.css';
import { Card,CardHeader,CardTitle,CardFooter,CardDescription,CardContent } from '@repo/ui/molecules/shadcn/Card';
import { useParams, useRouter } from 'next/navigation';
import { deleteNodeInWorkflow, editFlow, getNodes, publishFlow } from '../../../../../../actions/workflows/workflow';
import { EditorContext } from '../../../../../../providers/editor-provider';
import { ArrowBigDownDash, Edit2Icon, RecycleIcon, TrashIcon } from 'lucide-react';
import NodeSheet from './NodeSheet';
import { Input } from '@repo/ui/molecules/shadcn/Input';
import { Switch } from '@repo/ui/molecules/shadcn/Switch';
import { Label } from '@repo/ui/molecules/shadcn/Label';

const Nodes = () => {
  const { editorId } = useParams()
  const editor =  useContext(EditorContext);
  const [showEdit,setShowEdit] = useState(false);
  const [name, setName] = useState(editor.name);
  const [toggle,setToggle] = useState(editor.publish)
  const router = useRouter();
  const [loading,setLoading] = useState(false)

  const onToggle = async () =>{
      setToggle(!toggle)
      await publishFlow(editorId as string,!toggle)
  }


  useEffect(() => {
    const refreshNodes = async () => {
        setLoading(true);
        const {name,description,publish,trigger,actions} = await getNodes(editorId as string);
        setLoading(false);
        console.log('Setting nodes',name,description,publish,trigger,actions);
        editor.setActions(actions);
        editor.setTrigger(trigger);
        editor.setName(name);
        editor.setDescription(description);
        editor.setPublish(publish);
    }
    refreshNodes();
  },[] )

  const handleEdit = async () =>{
    if (showEdit) {
        console.log('Saving name',name);
        editor.setName(name);
        await editFlow(editorId as string,name,editor.description);
    }
    setShowEdit(!showEdit);
    router.refresh();
  }

  if (loading) return (<div>Loading...</div>)

  return (
    <>
        <div className='text-4xl flex items-center gap-4'>

            {showEdit ? 
                <Input placeholder={editor.name} onChange={(e:any) => setName(e.target.value)}/>:
                <div>{editor.name}</div>
            }
            <Edit2Icon onClick={handleEdit}/> 
            <div className='flex items-center gap-2 '>
                <Label htmlFor='airplane-mode'>
                    {toggle? 'On': 'Off'}
                </Label>
                <Switch id='airplane-mode' onClick={onToggle} defaultChecked={editor.publish!} />
            </div>
        </div>
        {editor.trigger ? (
                <Card className='min-w-[40%] flex flex-col items-start justify-center'>
                    <CardHeader className='w-full'>
                        <CardTitle className='flex items-center justify-between'>
                            {editor.trigger.name} 
                            <TrashIcon onClick={()=> {deleteNodeInWorkflow(editor.trigger.id);router.refresh()}}/> 
                        </CardTitle>
                        <CardDescription>{editor.trigger.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {
                            Object.keys(JSON.parse(editor.trigger.actionData)).map((key:any) => (
                                <div className='flex items-center gap-4'>
                                    <div className='font-black'>{key}:</div>
                                    <div className='italic font-light '>{JSON.parse(editor.trigger.actionData)[key]}</div>
                                </div>
                            ))  
                        }
                        <NodeSheet node={editor.trigger} type='Trigger' actionTypes={TRIGGER_TYPES}/>
                    </CardContent>
                </Card>
              ):(
            <NodeSheet node={[]} type='Trigger' actionTypes={TRIGGER_TYPES}/>
        )}
        <ArrowBigDownDash/>
        {editor.actions.map((action:any) => (
            <>
                <Card className='min-w-[40%] flex flex-col items-start justify-start'>
                <CardHeader className='w-full'>
                        <CardTitle className='flex items-center justify-between'>
                            {action.name} 
                            <TrashIcon onClick={()=> {deleteNodeInWorkflow(action.id);router.refresh()}}/> 
                        </CardTitle>
                        <CardDescription>{action.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {
                            Object.keys(JSON.parse(action.actionData)).map((key:any) => (
                                <div className='flex items-center gap-4'>
                                    <div className='font-black'>{key}:</div>
                                    <div className='italic font-light '>{JSON.parse(action.actionData)[key]}</div>
                                </div>
                            ))  
                        }
                        <NodeSheet node={action} type='Action' actionTypes={ACTION_TYPES}/>
                    </CardContent>
                </Card>
                <ArrowBigDownDash/>
                </>
        ))}

        <NodeSheet node={[]} type='Action' actionTypes={ACTION_TYPES}/>
    </>
  )
}

export default Nodes