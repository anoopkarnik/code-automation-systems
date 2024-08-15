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
import { getDatabases, queryNotionDatabaseAction, queryNotionDatabaseProperties } from '../../../../../../../../actions/notion/notion';
import { Input } from '@repo/ui/molecules/shadcn/Input';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@repo/ui/molecules/shadcn/Accordion';
import { DeleteIcon } from 'lucide-react';
import { createActionAction, updateActionAction } from '../../../../../../../../actions/workflows/workflow';

const QueryDatabase = ({funcType,nodeType,type,subType,node}:any) => {
    const  [ notionAccounts, setNotionAccounts ] = useState([]);
    const  [ databases, setDatabases ] = useState([]);
    const [filteredDatabases, setFilteredDatabases] = useState([])
    const [selectedDb, setSelectedDb] =  useState<any>(node?.metadata?.databaseId || '');
    const  [ properties, setProperties ] = useState([]);
    const [currentPropertyName, setCurrentPropertyName] = useState('');
    const [currentPropertyType, setCurrentPropertyType] = useState('');
    const [currentPropertyCondition, setCurrentPropertyCondition] = useState('');
    const [currentPropertyValue, setCurrentPropertyValue] = useState<any>('');
    const [selectedNotionAccount, setSelectedNotionAccount] = useState(node?.metadata?.notionAccountId || '');
    const [selectedFilters, setSelectedFilters] = useState(node?.metadata?.filters || []);
    const [selectedSorts, setSelectedSorts] = useState(node?.metadata?.sorts || []);
    const [testResults, setTestResults] = useState([]);
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
            filters: selectedFilters,
            sorts: selectedSorts,
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
    },[userId,selectedNotionAccount])

    const fetchDatabases = async (value:string) => {
        setSelectedNotionAccount(value);
        const databases:any = await getDatabases(value);
        setDatabases(databases);
        setFilteredDatabases(databases);
    }

    const fetchDatabaseProperties = async (value:any) => {
        setSelectedDb(value);
        const res:any = await queryNotionDatabaseProperties({apiToken: selectedNotionAccount, database_id:JSON.parse(value).id});
        setProperties(res.properties)
    }

    const handlePropertyChange = (value:any) => {
        setCurrentPropertyName(value);
        const property:any =  Object.values(properties).find((prop:any) => prop.name == value);
        setCurrentPropertyType(property.type);
    }

    const addFilter = () =>{
        setCurrentPropertyName('');
        setCurrentPropertyCondition('');
        setCurrentPropertyValue('');
        setCurrentPropertyType('');

        setSelectedFilters([...selectedFilters, {name: currentPropertyName, type: currentPropertyType,
             condition: currentPropertyCondition, value: currentPropertyValue}])

    }

    const getTestResults = async () => {
        const res = await queryNotionDatabaseAction({apiToken: selectedNotionAccount,
             database_id: JSON.parse(selectedDb).id, filters: selectedFilters, sorts: selectedSorts})
        console.log(res.results)
        setTestResults(res.results)
    }

    const removeFilter = (index:number) => {
        const newFilters = selectedFilters.filter((filter:any, i:number) => i !== index)
        setSelectedFilters(newFilters)
    }

    const handlePropertyValue = (event:any) => {
        const inputValue = event.target.value;

        // Check if the input is a boolean value (case-insensitive)
        if (inputValue.toLowerCase() === 'true') {
            setCurrentPropertyValue(true);
        } else if (inputValue.toLowerCase() === 'false') {
            setCurrentPropertyValue(false);
        } else {
            // Otherwise, treat it as a string
            setCurrentPropertyValue(inputValue);
        }

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
            {selectedNotionAccount && <div className='flex flex-col gap-2 '>
                <Label className='ml-2'>Notion Databases</Label>
                <Select value={selectedDb} onValueChange={(value) => fetchDatabaseProperties(value)} >
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
            {selectedDb && <div className='flex flex-col gap-2 mt-4'>
                <div className='flex items-center justify-between '>
                    <Label className='ml-2 text-xl mb-4'>Filters</Label>
                    <Button className='' variant='secondary' onClick={addFilter}>Add This Filter</Button>
                </div>
                {selectedFilters.length > 0 && selectedFilters.map((filter:any, index:number) => (
                    <div key={index} className='flex items-center justify-start gap-4'>
                        <div className=''>{index+1}.</div>
                        <div className=''>{filter.name}</div>
                        <div className=''>{filter.type}</div>
                        <div className=''>{filter.condition}</div>
                        <div className=''>{filter.value}</div>
                        <DeleteIcon className='w-6 h-6 cursor-pointer' onClick={() => removeFilter(index)}/>
                    </div>
                ))}
                <div className='flex flex-col '>
                    <div className='flex items-center justify-start gap-4'>
                        <div className=''>{selectedFilters.length+1}.</div>
                        <Select onValueChange={(value) => handlePropertyChange(value)} defaultValue={currentPropertyName}>
                            <SelectTrigger className="" >
                                <SelectValue placeholder='Select Notion Property Name'/>  
                            </SelectTrigger>
                            <SelectContent>
                                {Object.keys(properties)?.map((prop:any) => (
                                    <SelectItem key={prop} value={prop}>{prop}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className='flex items-center justify-between gap-4 m-4'>

                        {currentPropertyName && <div className="" >{currentPropertyType}</div>}
                        {currentPropertyName && <Input className=""  placeholder='Condition' value={currentPropertyCondition} onChange={(e) => setCurrentPropertyCondition(e.target.value)}/>}
                        {currentPropertyName && <Input className=""  placeholder='Value' value={currentPropertyValue} onChange={handlePropertyValue}/>}
                    </div>

                </div>
                
            </div>}
            {selectedDb && <div className='flex w-full items-center justify-between gap-4'>
                <Button  className='mt-4 ' variant="default" type="submit" onClick={onSubmit}> Add Action</Button>
                <Button  className='mt-4 ' variant="default" type="submit" onClick={getTestResults}> Test</Button>
            </div>}
            <Accordion type='single' collapsible className='w-full'>
                <AccordionItem value='item-1'>
                    <AccordionTrigger>
                        <div> Show Test Results</div>
                    </AccordionTrigger>
                    <AccordionContent>
                        {testResults.length > 0 && testResults.map((result:any,index:any) => (
                            <div key={index} className='flex items-center justify-start gap-4'>
                                <div className=''>{result.name}</div>
                                <div className=''>{result.type}</div>
                                <div className=''>{result.value}</div>
                            </div>
                        ))}
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
    </div>
  )
}

export default QueryDatabase