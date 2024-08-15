'use client'
import React, { useContext, useEffect, useState } from 'react'
import { useToast } from '../../../../../../../../hooks/useToast'
import { useParams, useRouter } from 'next/navigation';
import { EditorContext } from '../../../../../../../../providers/editor-provider';
import {  useSession } from 'next-auth/react';
import { Button } from '@repo/ui/molecules/shadcn/Button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@repo/ui/molecules/shadcn/Select';
import { getNotionConnection } from '../../../../../../../../actions/connections/notion-connections';
import { Label } from '@repo/ui/molecules/shadcn/Label';
import { getDatabases} from '../../../../../../../../actions/notion/notion';
import { createActionAction, updateActionAction } from '../../../../../../../../actions/workflows/workflow';
import { Textarea } from '@repo/ui/molecules/shadcn/TextArea';

const CreatePage = ({funcType,nodeType,type,subType,node}:any) => {
    const  [ notionAccounts, setNotionAccounts ] = useState([]);
    const  [ databases, setDatabases ] = useState([]);
    const [filteredDatabases, setFilteredDatabases] = useState([])
    const [selectedDb, setSelectedDb] =  useState<any>('');
    const [selectedNotionAccount, setSelectedNotionAccount] = useState(node?.metadata?.notionAccountId || '');
    const [testResults, setTestResults] = useState([]);
    const [allProperties, setAllProperties] = useState<any>(undefined);
    const session = useSession()
    const userId = session?.data?.user?.id;
    

    const {toast} = useToast();

    const { editorId } = useParams()
    const editor = useContext(EditorContext);
    const router = useRouter();
    const onSubmit = async () => {
        console.log(selectedNotionAccount)
        let metadata = {
            notionAccountId: selectedNotionAccount,
            databaseId: JSON.parse(selectedDb).id,
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
            if(!selectedNotionAccount) return;
            const databases:any = await getDatabases(selectedNotionAccount);
            setDatabases(databases);
            setFilteredDatabases(databases);

        }
        fetchOptions();
    },[userId])

    const fetchDatabases = async (value:string) => {
        setSelectedNotionAccount(value);
        const databases:any = await getDatabases(value);
        setDatabases(databases);
        setFilteredDatabases(databases);
    }

  return (
    <div className='mt-10'>
        <div className='space-y-4 m-4 my-10'>
            <div className='flex flex-col gap-2 '>
                <Label className='ml-2'>Notion Account</Label>
                <Select onValueChange={(value) => fetchDatabases(value)} defaultValue={selectedNotionAccount}>
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
            {<div className='flex flex-col gap-2 '>
                <Label className='ml-2'>Notion Databases</Label>
                <Select value={selectedDb} onValueChange={(value) =>setSelectedDb(value)}>
                    <SelectTrigger className='py-8'>
                        <SelectValue placeholder={`Select Notion Database`}/>
                    </SelectTrigger>
                    <SelectContent>   
                        {filteredDatabases.length> 0 && filteredDatabases?.map((database:any) => (
                            <SelectItem key={database.id} value={JSON.stringify({id:database.id, icon: database.icon, 
                            name: database.name, accessToken: database.accessToken})}>
                                <div className='flex items-center justify-center gap-4'>
                                    <div>{database.icon|| "⛁"}</div>
                                    <div className='flex flex-col items-start justify-center w-[400px]'>
                                        <div>{database.name}</div>
                                        <div>{database.id}</div>
                                    </div>
                                </div>
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>}
            {selectedDb && 
            <div className='flex flex-col gap-2 '>
                <Label className='ml-2'>All Properties</Label>
                <Textarea className='' placeholder='List of properties for all pages in this format [[{},{}]]'
                 value={allProperties} onChange={(e)=>setAllProperties(e.target.value)}/>
          
            </div>}
            {selectedDb && <div className='flex w-full items-center justify-between gap-4'>
                <Button  className='mt-4 ' variant="default" type="submit" onClick={onSubmit}> Add Action</Button>
            </div>}
        </div>
    </div>
  )
}

export default CreatePage