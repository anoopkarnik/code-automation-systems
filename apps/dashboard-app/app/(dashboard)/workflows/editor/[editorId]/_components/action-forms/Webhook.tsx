import { Button } from '@repo/ui/molecules/shadcn/Button';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@repo/ui/molecules/shadcn/Form'
import { Input } from '@repo/ui/molecules/shadcn/Input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@repo/ui/molecules/shadcn/Select'
import { Textarea } from '@repo/ui/molecules/shadcn/TextArea'
import React, { useContext } from 'react'
import {  useForm } from 'react-hook-form';
import { addNodeToWorkflow, editNodeInWorkflow } from '../../../../../../../actions/workflows/workflow';
import { getSession } from 'next-auth/react';
import { useParams } from 'next/navigation';
import { EditorContext } from '../../../../../../../providers/editor-provider';
import { useRouter } from 'next/navigation';

const Webhook = ({type,actionType,subActionType,node}:any) => {
    const form = useForm()
    const { editorId } = useParams()
    const editor =  useContext(EditorContext);
    const router = useRouter();
    if (subActionType == 'Internal Webhook'){
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
            
            if (type === 'Trigger') {
                editor.setTrigger(node)
            }
            else {
                editor.setActions([...editor.actions,node])
            }
            router.push(`/workflows/editor/${editorId}`)
        }
        return (
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className='space-y-4 m-4 my-10'>
                        <FormField key='Request Url' control={form.control} name='Request Url' render={({field})=>(
                            <FormItem>
                                <FormLabel>Request Url</FormLabel>
                                <FormControl>
                                    <Input placeholder='https://example.com/webhook' {...field} />

                                </FormControl>
                            </FormItem>
                        )}/>
                        <FormField key='Request Method' control={form.control} name='Request Method' render={({field})=>(
                            <FormItem>
                                <FormLabel>Request Method</FormLabel>
                                <FormControl>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <SelectTrigger>
                                            <SelectValue placeholder='POST'/>
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value='GET'>GET</SelectItem>
                                            <SelectItem value='POST'>POST</SelectItem>
                                            <SelectItem value='PUT'>PUT</SelectItem>
                                            <SelectItem value='DELETE'>DELETE</SelectItem>
                                            <SelectItem value='PATCH'>PATCH</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                            </FormItem>
                        )}/>
                        <FormField key='Request Body' control={form.control} name='Request Body' render={({field})=>(
                            <FormItem>
                                <FormLabel>Request Body</FormLabel>
                                <FormControl>
                                    <Textarea placeholder='Enter JSON data' {...field} />

                                </FormControl>
                            </FormItem>
                        )}/>
                        <FormField key='Request Headers' control={form.control} name='Request Headers' render={({field})=>(
                            <FormItem>
                                <FormLabel>Request Headers</FormLabel>
                                <FormControl>
                                    <Textarea placeholder='Enter JSON data' {...field} />

                                </FormControl>
                            </FormItem>
                        )}/>
                        <Button  className='mt-4 ' variant="default" type="submit" > Add Node</Button>
                    </div>
                </form>
            </Form>
  )}
}

export default Webhook