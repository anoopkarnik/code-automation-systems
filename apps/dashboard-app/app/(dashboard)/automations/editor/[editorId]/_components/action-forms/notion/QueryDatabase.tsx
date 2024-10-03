'use client'
import React, { useContext, useEffect, useState } from 'react'
import { useToast } from '../../../../../../../../hooks/useToast'
import { useParams, useRouter } from 'next/navigation';
import { EditorContext } from '../../../../../../../../providers/editor-provider';
import {  useSession } from 'next-auth/react';
import { Button } from '@repo/ui/atoms/shadcn/Button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@repo/ui/molecules/shadcn/Select';
import { getNotionConnection } from '../../../../../../../actions/connections/notion-connections';
import { Label } from '@repo/ui/atoms/shadcn/Label';
import { getDatabases, queryNotionDatabaseAction, queryNotionDatabaseProperties } from '../../../../../../../actions/notion/notion';
import { Input } from '@repo/ui/atoms/shadcn/Input';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@repo/ui/molecules/shadcn/Accordion';
import { DeleteIcon } from 'lucide-react';
import { createActionAction, updateActionAction } from '../../../../../../../actions/workflows/workflow';
import SearchableSelect from '@repo/ui/molecules/custom/SearchableSelect';
import {FancyMultiSelect} from "@repo/ui/molecules/custom/FancyMultiSelect";

const QueryDatabase = ({funcType,nodeType,type,subType,node}:any) => {
    const  [ notionAccounts, setNotionAccounts ] = useState([]);
    const  [ databases, setDatabases ] = useState([]);
    const [filteredDatabases, setFilteredDatabases] = useState([])
    const [selectedDb, setSelectedDb] =  useState<any>('')
    const  [ properties, setProperties ] = useState([]);
    const [currentPropertyName, setCurrentPropertyName] = useState('');
    const [currentPropertyType, setCurrentPropertyType] = useState('');
    const [currentPropertyCondition, setCurrentPropertyCondition] = useState('');
    const [currentPropertyValue, setCurrentPropertyValue] = useState<any>('');
    const [selectedNotionAccount, setSelectedNotionAccount] = useState(node?.metadata?.notionAccountId || '');
    const [selectedFilters, setSelectedFilters] = useState(node?.metadata?.filters || []);
    const [selectedSorts, setSelectedSorts] = useState(node?.metadata?.sorts || []);
    const [testResults, setTestResults] = useState([]);
    const [selectedProperties, setSelectedProperties] = useState<any[]>(node?.metadata?.properties || []);
    const session = useSession()
    const userId = session?.data?.user?.id;
    
    const {toast} = useToast();

    const params = useParams()
    const editorId = params?.editorId
    const editor = useContext(EditorContext);
    const router = useRouter();
    const onSubmit = async () => {
        let metadata = {
            notionAccountId: selectedNotionAccount,
            databaseId: JSON.parse(selectedDb).id,
            filters: selectedFilters,
            sorts: selectedSorts,
            properties: selectedProperties
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
            if (!node?.metadata?.databaseId) return;
            const currentDb = databases.find((db:any) => db.id == node?.metadata?.databaseId);
            if (!currentDb) return;
            setSelectedDb(JSON.stringify({id:currentDb.id, icon: currentDb.icon, name: currentDb.name, accessToken: currentDb.accessToken}))
            const res2:any = await queryNotionDatabaseProperties({apiToken: selectedNotionAccount, database_id:currentDb.id});
            setProperties(res2.properties)

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
            {selectedNotionAccount && <div className='flex flex-col gap-2 w-full '>
                <Label className='ml-2'>Notion Databases</Label>
                <SearchableSelect
                    name="Database"
                    options={databases || []}
                    selectedOption={selectedDb }
                    onChange={fetchDatabaseProperties}
                />
                
            </div>}
            {/* {selectedDb && 
                <div className='flex flex-col gap-2 w-full '>
                    <Label className='ml-2'>Properties</Label>
                    <FancyMultiSelect
                        placeholder="Select properties to return"
                        options={Object.keys(properties).map(prop => ({label: prop, value: prop}))}
                        selected={selectedProperties}
                        setSelected={setSelectedProperties}
                    />
                </div>
                  } */}
            {selectedDb && <div className='flex flex-col gap-2 mt-4'>
                <div className='flex items-center justify-between '>
                    <Label className='ml-2 text-xl mb-4'>Filters</Label>
                    <Button size="lg" variant='secondary' onClick={addFilter}>Add This Filter</Button>
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
                                {properties && Object.keys(properties)?.map((prop:any) => (
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
                <Button  size="lg" variant="default" type="submit" onClick={onSubmit}> Add Action</Button>
                <Button  size="lg" variant="default" type="submit" onClick={getTestResults}> Test</Button>
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