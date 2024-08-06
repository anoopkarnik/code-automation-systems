import { Button } from '@repo/ui/molecules/shadcn/Button';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@repo/ui/molecules/shadcn/Form'
import { Input } from '@repo/ui/molecules/shadcn/Input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@repo/ui/molecules/shadcn/Select'
import { Textarea } from '@repo/ui/molecules/shadcn/TextArea'
import React, { useContext } from 'react'
import {  useForm } from 'react-hook-form';
import { getSession } from 'next-auth/react';
import { useParams } from 'next/navigation';
import { EditorContext } from '../../../../../../../providers/editor-provider';
import { useRouter } from 'next/navigation';

const Schedule = ({type,actionType,subActionType,node}:any) => {
    const form = useForm()
    const { editorId } = useParams()
    const editor =  useContext(EditorContext);
    const router = useRouter();
    if (subActionType == 'Cron'){
        const onSubmit = async (data:any) => {
            const session = await getSession()
            const userId = session?.user?.id
            let name = `${type}-${actionType}-${subActionType}`
            let description = `${type}-${actionType}-${subActionType}`
            let id = node?.id

            
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
                        <FormField key='Cron Expression' control={form.control} name='Cron Expression' render={({field})=>(
                            <FormItem>
                                <FormLabel>Cron Expression</FormLabel>
                                <FormControl>
                                    <Input placeholder='0 0 * * *' {...field} />

                                </FormControl>
                            </FormItem>
                        )}/>
                        <FormField key='Timezone' control={form.control} name='Timezone' render={({field})=>(
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
                        <FormField key='Start Date' control={form.control} name='Start Date' render={({field})=>(
                            <FormItem>
                                <FormLabel>Start Date</FormLabel>
                                <FormControl>
                                    <Input placeholder='Select Start Date' {...field} />

                                </FormControl>
                            </FormItem>
                        )}/>
                        <Button  className='mt-4 ' variant="default" type="submit" > Add Node</Button>
                    </div>
                </form>
            </Form>
  )}
}

export default Schedule