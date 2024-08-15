'use client'
import { Button } from '@repo/ui/molecules/shadcn/Button';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@repo/ui/molecules/shadcn/Form'
import { Textarea } from '@repo/ui/molecules/shadcn/TextArea'
import React, { useContext } from 'react'
import {  useForm } from 'react-hook-form';
import { getSession } from 'next-auth/react';
import { useParams } from 'next/navigation';
import { EditorContext } from '../../../../../../../../providers/editor-provider';
import { useRouter } from 'next/navigation';
import { createActionAction, createTriggerAction, updateActionAction } from '../../../../../../../../actions/workflows/workflow';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@repo/ui/molecules/shadcn/Select';
import { Input } from '@repo/ui/molecules/shadcn/Input';
import { useToast } from '../../../../../../../../hooks/useToast';

const WebhookAction = ({funcType,nodeType,type,subType,node}:any) => {
    const {toast} = useToast();
    const form = useForm({
        defaultValues: {
            url: node?.metadata?.url || '',
            method: node?.metadata?.method || 'POST',
            body:  JSON.stringify(node?.metadata?.body) || JSON.stringify({}),
            headers:  JSON.stringify(node?.metadata?.headers) || JSON.stringify({"Content-Type": "application/json"})
        }
    })
    const { editorId } = useParams()
    const editor =  useContext(EditorContext);
    const router = useRouter();
    if (subType.name == 'External Webhook'){
        const onSubmit = async (data:any) => {
            const session = await getSession()
            const userId = session?.user?.id
            let metadata = {
                url: data.url,
                method: data.method,
                body: JSON.parse(data.body),
                headers: JSON.parse(data.headers)
            }
            const params = {
                workflowId: editorId,
                actionId: subType.id,
                metadata,
                sortingOrder: editor.actions.length
            }
            let res;
            if (funcType == 'create'){
                res = await createActionAction(params)
            }
            else{
                res = await updateActionAction({id:node.id, actionId:node.actionId, metadata:metadata })
            }
            if (res.success){
                toast({title: "Success", description: res?.success, variant: 'default'})
                router.refresh()
                router.push(`/workflows/editor/${editorId}`)
            }
            else if (res.error){
                toast({title: "Error", description: res?.error, variant: 'destructive'})
            }

        }
        return (
            <div className='mt-10'>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <div className='space-y-4 m-4 my-10'>
                        <FormField key='url' control={form.control} name='url' render={({field})=>(
                            <FormItem>
                                <FormLabel>Request Url</FormLabel>
                                <FormControl>
                                    <Input placeholder='https://example.com/webhook' {...field} />

                                </FormControl>
                            </FormItem>
                        )}/>
                        <FormField key='method' control={form.control} name='method' render={({field})=>(
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
                        <FormField key='body' control={form.control} name='body' render={({field})=>(
                            <FormItem>
                                <FormLabel>Request Body</FormLabel>
                                <FormControl>
                                    <Textarea placeholder='Enter JSON data' {...field} />

                                </FormControl>
                            </FormItem>
                        )}/>
                        <FormField key='headers' control={form.control} name='headers' render={({field})=>(
                            <FormItem>
                                <FormLabel>Request Headers</FormLabel>
                                <FormControl>
                                    <Textarea placeholder='Enter JSON data' {...field} />

                                </FormControl>
                            </FormItem>
                        )}/>
                            <Button  className='mt-4 ' variant="default" type="submit" > Add Action</Button>
                        </div>
                    </form>
                </Form>
            </div>
  )}
}

export default WebhookAction