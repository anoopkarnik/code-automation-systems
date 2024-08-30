'use client'
import { Button } from '@repo/ui/atoms/shadcn/Button';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@repo/ui/molecules/shadcn/Form'
import { Textarea } from '@repo/ui/atoms/shadcn/Textarea'
import React, { useContext } from 'react'
import {  useForm } from 'react-hook-form';
import { getSession } from 'next-auth/react';
import { useParams } from 'next/navigation';
import { EditorContext } from '../../../../../../../../providers/editor-provider';
import { useRouter } from 'next/navigation';
import { createTriggerAction } from '../../../../../../../../actions/workflows/workflow';
import { useToast } from '../../../../../../../../hooks/useToast';

const WebhookTrigger = ({funcType,nodeType,type,subType,node}:any) => {
    const {toast} = useToast();

    const form = useForm({
        defaultValues: {
            body: node?.metadata?.body || {}
        }
    })
    const params = useParams()
    const editorId = params?.editorId
    const editor =  useContext(EditorContext);
    const router = useRouter();
    if (subType.name == 'Internal Webhook'){
        const onSubmit = async (data:any) => {
            const session = await getSession()
            const userId = session?.user?.id
            let metadata:any = {
                body: JSON.parse(data.body),
                url: `https://bsamaritan.com/api/hooks/catch/${editorId}`,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            const node = {
                workflowId: editorId,
                triggerId: subType.id,
                metadata
            }
            const res = await createTriggerAction(node)
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
                <div>Internal Webhook</div>
                <div className='italic text-blue-500'>https://bsamaritan.com/api/hooks/catch/{editorId}</div>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <div className='space-y-4 m-4 my-10'>
                            <FormField key='body' control={form.control} name='body' render={({field})=>(
                                <FormItem>
                                    <FormLabel>Body</FormLabel> 
                                    <FormControl>
                                        <Textarea placeholder='Enter JSON data' {...field} />
                                    </FormControl>
                                </FormItem>
                            )}/>
                            <Button  size="lg" variant="default" type="submit" > Add Trigger</Button>
                        </div>
                    </form>
                </Form>
            </div>
  )}
}

export default WebhookTrigger 