'use client'
import React, { useContext, useEffect, useState } from 'react'
import { useToast } from '../../../../../../../../hooks/useToast'
import { useParams, useRouter } from 'next/navigation';
import { EditorContext } from '../../../../../../../../providers/editor-provider';
import {  useSession } from 'next-auth/react';
import { Button } from '@repo/ui/atoms/shadcn/Button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@repo/ui/molecules/shadcn/Select';
import { getNotionConnection } from '../../../../../../../../actions/connections/notion-connections';
import { Label } from '@repo/ui/atoms/shadcn/Label';
import { getDatabases } from '../../../../../../../../actions/notion/notion';
import { createActionAction, updateActionAction } from '../../../../../../../../actions/workflows/workflow';
import { Textarea } from '@repo/ui/atoms/shadcn/Textarea';

const UpdatePage = ({funcType,nodeType,type,subType,node}:any) => {
    const  [ notionAccounts, setNotionAccounts ] = useState([]);
    const [selectedNotionAccount, setSelectedNotionAccount] = useState(node?.metadata?.notionAccountId || '');
    const [pageIds, setPageIds] = useState(node?.metadata?.pageIds || undefined);
    const [allProperties, setAllProperties] = useState<any>(node?.metadata?.allProperties || undefined);
    const session = useSession()
    const userId = session?.data?.user?.id;
    

    const {toast} = useToast();

    const prams = useParams()
    const editorId = prams?.editorId
    const editor = useContext(EditorContext);
    const router = useRouter();
    const onSubmit = async () => {
        let metadata = {
            notionAccountId: selectedNotionAccount,
            pageIds: pageIds,
            allProperties: allProperties
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

    useEffect(() =>{
        const fetchOptions = async () => {
            if (!userId) return;
            const res:any = await getNotionConnection(userId);
            setNotionAccounts(res);
        }
        fetchOptions();
    },[userId])


    const fetchDatabases = async (value:string) => {
      setSelectedNotionAccount(value);
  }

  return (
    <div className='mt-10'>
        <div className='space-y-4 m-4 my-10'>
            <div className='flex flex-col gap-2 '>
                <Label className='ml-2'>Notion Account</Label>
                <Select onValueChange={(value:string) => fetchDatabases(value)} defaultValue={selectedNotionAccount}>
                    <SelectTrigger>
                        <SelectValue placeholder='Select Notion Account'/>  
                    </SelectTrigger>
                    <SelectContent>
                        {notionAccounts?.map((account:any) => (
                            <SelectItem key={account.id} value={account.accessToken}>{account.name}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
            <div className='flex flex-col gap-2 '>
                <Label className='ml-2'>All PageIds </Label>
                <Textarea className='' placeholder='List of pageIds'
                 value={pageIds} onChange={(e)=>setPageIds(e.target.value)}/>
          
            </div>
            <div className='flex flex-col gap-2 '>
                <Label className='ml-2'>All Properties</Label>
                <Textarea className='' placeholder='List of properties for all pages in this format [[{},{}]]'
                 value={allProperties} onChange={(e)=>setAllProperties(e.target.value)}/>
          
            </div>
            <div className='flex w-full items-center justify-between gap-4'>
                <Button  size="lg" variant="default" type="submit" onClick={onSubmit}> Add Action</Button>
            </div>
        </div>
    </div>
  )
}

export default UpdatePage