import { Button } from '@repo/ui/atoms/shadcn/Button';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@repo/ui/molecules/shadcn/Form'
import { Input } from '@repo/ui/atoms/shadcn/Input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@repo/ui/molecules/shadcn/Select'
import React, { useContext } from 'react'
import {  useForm } from 'react-hook-form';
import { getSession } from 'next-auth/react';
import { useParams } from 'next/navigation';
import { EditorContext } from '../../../../../../../../providers/editor-provider';
import { useRouter } from 'next/navigation';
import { useToast } from '../../../../../../../../hooks/useToast';
import { createTriggerAction } from '../../../../../../../../actions/workflows/workflow';

const Schedule = ({funcType,nodeType,type,subType,node}:any) => {
    const {toast} = useToast();
    const form = useForm({
        defaultValues: {
            cronExpression: node?.metadata?.cronExpression || '',
            timezone: node?.metadata?.timezone || '',
            startDate: node?.metadata?.startDate || ''
        }
    })
    const params = useParams()
    const editorId = params?.editorId
    const editor =  useContext(EditorContext);
    const router = useRouter();
    if (subType.name == 'Cron'){
        const onSubmit = async (data:any) => {
            const session = await getSession()
            const userId = session?.user?.id
            let metadata = {
                cronExpression: data.cronExpression,
                timezone: data.timezone,
                startDate: data.startDate
            }
            const params = {
                workflowId: editorId,
                triggerId: subType.id,
                metadata
            }
            const res = await createTriggerAction(params)
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
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className='space-y-4 m-4 my-10'>
                        <FormField key='cronExpression' control={form.control} name='cronExpression' render={({field})=>(
                            <FormItem>
                                <FormLabel>Cron Expression</FormLabel>
                                <FormControl>
                                    <Input placeholder='0 0 * * *' {...field} />

                                </FormControl>
                            </FormItem>
                        )}/>
                        <FormField key='timezone' control={form.control} name='timezone' render={({field})=>(
                            <FormItem>
                                <FormLabel>Timezone</FormLabel>
                                <FormControl>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <SelectTrigger>
                                            <SelectValue placeholder='Select Time Zone'/>
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value='Asia/Kolkata'>Asia/Kolkata</SelectItem>
                                            <SelectItem value='Asia/Tokyo'>Asia/Tokyo</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                            </FormItem>
                        )}/>
                        <FormField key='startDate' control={form.control} name='startDate' render={({field})=>(
                            <FormItem>
                                <FormLabel>Start Date</FormLabel>
                                <FormControl>
                                    <Input placeholder='Select Start Date' {...field} />

                                </FormControl>
                            </FormItem>
                        )}/>
                        <Button  size="lg"  variant="default" type="submit" > Add Node</Button>
                    </div>
                </form>
            </Form>
  )}
}

export default Schedule