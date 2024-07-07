'use client'
import React, { useContext, useState } from 'react';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@repo/ui/molecules/shadcn/Select';
import { Input } from '@repo/ui/molecules/shadcn/Input';
import {  useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormLabel, FormItem, 
 } from '@repo/ui/molecules/shadcn/Form';
import { Button } from '@repo/ui/molecules/shadcn/Button';
import { Textarea } from '@repo/ui/molecules/shadcn/TextArea';
import { addNodeToWorkflow, editNodeInWorkflow} from '../../../../../../actions/workflows/workflow';
import { useParams } from 'next/navigation';
import { getSession } from 'next-auth/react';
import { EditorContext } from '../../../../../../providers/editor-provider';

const ActionForm = ({type,actionType,subActionType,params,node}:any) => {

    const form = useForm()
    const { editorId } = useParams()
    const editor =  useContext(EditorContext);

    const onSubmit = async (data:any) => {
        const session = await getSession()
        const userId = session?.user?.id
        let name = `${type}-${actionType}-${subActionType}`
        let description = `${type}-${actionType}-${subActionType}`
        let id = node?.id
        if (node.length ==0){
            const node = await addNodeToWorkflow({name,description,workflowId: editorId,type,userId,actionType,subActionType,actionData:JSON.stringify(data)})
        }
        else{
            const node = await editNodeInWorkflow({id,name,description,workflowId: editorId,type,userId,actionType,subActionType,actionData:JSON.stringify(data)})
        }
        
        if (type === 'trigger') {
            editor.setTrigger(node)
        }
        else {
            editor.setActions([...editor.actions,node])
        }
    }

  return (
    <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className='space-y-4 m-4 my-10'>
                {
                    params?.map((param:any) => (
                        <FormField control={form.control} name={param.name} render={({field})=>(
                            <FormItem>
                                <FormLabel>{param.name}</FormLabel>
                                <FormControl>
                                    {param.type === "text" ?(
                                        <Input placeholder={param.placeholder} {...field} />):
                                    param.type === "options" ?(
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <SelectTrigger>
                                            <SelectValue placeholder={param.placeholder}/>
                                        </SelectTrigger>
                                        <SelectContent>
                                            {
                                                param.options.map((option:any) => (   
                                                    <SelectItem value={option}>{option}</SelectItem>
                                                ))
                                            }
                                        </SelectContent>
                                    </Select>
                                    ):
                                    param.type === 'json' ? (
                                        <Textarea placeholder={param.placeholder} {...field} />
                                    ): null
                                    }
                                </FormControl>
                            </FormItem>
                        )}/>
                    ))
                }
                {params.length>0 && <Button  className='mt-4 ' variant="default" type="submit" > Add Node</Button>}
            </div>
        </form>
    </Form>
);};


export default ActionForm;