import React, { useEffect, useState } from 'react'


import { Button } from '@repo/ui/atoms/shadcn/Button';
import { useSession } from 'next-auth/react';
import { Label } from '@repo/ui/atoms/shadcn/Label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@repo/ui/molecules/shadcn/Select';
import { getDatabases } from '../../../../../../../actions/notion/notion';
import { getNotionConnection } from '../../../../../../../actions/connections/notion-connections';
import SearchableSelect from '@repo/ui/molecules/custom/SearchableSelect';
import NotionFilterComponent from './NotionFilterComponent';


const NotionCode = () => {
    
    //Notion Variables
    const [notionAccounts, setNotionAccounts] = useState<any>([])
    const [selectedNotionAccount, setSelectedNotionAccount] = useState('')
    const [databases, setDatabases] = useState<any>([])
    const [selectedDatabase, setSelectedDatabase] = useState('')
    const [filterBody, setFilterBody] = useState<any>({})
    const [properties, setProperties] = useState<any>({})

    const [sampleCode, setSampleCode] = useState('');

    const [variable, setVariable] = useState<any>('');
    const session = useSession();
    const userId = session?.data?.user?.id;


    const fetchSampleQueryDatabaseCode = async () => {
        try {
            const response = await fetch('/samplePythonCodes/queryNotionDatabase.txt'); // Assuming the file is in the public folder
            let text = await response.text();
            text = text.replaceAll("{{token}}", selectedNotionAccount);
            text = text.replaceAll("{{db_id}}", JSON.parse(selectedDatabase).id.replaceAll("-",""));
            text = text.replaceAll("{{filter_body}}", JSON.stringify(filterBody));
            setSampleCode(text);

        } catch (error) {
            console.error('Error fetching sample query:', error);
            setSampleCode('// Error fetching the sample query.');
        }
    };

    const fetchSampleCreatePageCode = async () => {
        try {
            const response = await fetch('/samplePythonCodes/createNotionPage.txt'); // Assuming the file is in the public folder
            let text = await response.text();
            text = text.replaceAll("{{token}}", selectedNotionAccount);
            text = text.replaceAll("{{db_id}}", JSON.parse(selectedDatabase).id.replaceAll("-",""));
            text = text.replaceAll("{{properties}}", JSON.stringify(properties));
            setSampleCode(text);

        } catch (error) {
            console.error('Error fetching sample query:', error);
            setSampleCode('// Error fetching the sample query.');
        }
    };

    const fetchSampleUpdatePageCode = async () => {
        try {
            const response = await fetch('/samplePythonCodes/updateNotionPage.txt'); // Assuming the file is in the public folder
            let text = await response.text();
            text = text.replaceAll("{{token}}", selectedNotionAccount);
            text = text.replaceAll("{{properties}}", JSON.stringify(properties));
            setSampleCode(text);

        } catch (error) {
            console.error('Error fetching sample query:', error);
            setSampleCode('// Error fetching the sample query.');
        }
    };

    const modifyFilterBody = (groupCondition:any,filterGroup:any) => {
        let filterBody:any = {}
        filterBody['filter'] = {}
        filterBody['filter'][groupCondition] = []
        filterGroup.forEach((group:any) => {
            let groupBody:any = {}
            groupBody[group.logic] = []
            group.rules.forEach((rule:any) => {
                let ruleBody:any = {}
                ruleBody['property'] = rule.name
                ruleBody[rule.type] = {}
                ruleBody[rule.type][rule.condition] = rule.value
                groupBody[group.logic].push(ruleBody)
            })
            filterBody['filter'][groupCondition].push(groupBody)
        })
        setFilterBody(filterBody)

    }

    useEffect(() => {
        const fetchNotionDetails = async () => {
            if (!userId) return;
            const res:any = await getNotionConnection(userId);
            setNotionAccounts(res);
            if(!selectedNotionAccount) return;
            const databases:any = await getDatabases(selectedNotionAccount);
            setDatabases(databases);
        }

        fetchNotionDetails()
    },[userId, selectedNotionAccount,selectedDatabase])
  return (
    <div>
        <div className='flex flex-col gap-4  mt-4 ml-2 w-[80%]'>
            <Label className='ml-2'>Notion Account</Label>
            <Select onValueChange={(value) => setSelectedNotionAccount(value)} defaultValue={selectedNotionAccount}>
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
        {selectedNotionAccount && 
            <div className='flex flex-col gap-4  mt-4 ml-2 w-[80%] '>
                <Label className='ml-2'>Notion Databases</Label>
                <SearchableSelect
                    name="Database"
                    options={databases || []}
                    selectedOption={selectedDatabase }
                    onChange={(value:any)=>{setSelectedDatabase(value)}}/>
                </div>}
        {selectedDatabase &&
            <div className='flex flex-col gap-4  mt-4 ml-2 w-[80%] '> 
                <Label className='ml-2'>Notion Filters</Label>
                <NotionFilterComponent dbId={JSON.parse(selectedDatabase).id.replaceAll("-","")}
                 access_token={selectedNotionAccount}
                 modifyFilterBody={modifyFilterBody}/>
            </div>}
        <div className='flex gap-2 mt-4 ml-2 items-center'>
            {selectedNotionAccount && 
                <Button size="sm" variant="outline"  onClick={() => setVariable(selectedNotionAccount)}>
                    Get Access Token
                </Button> }
            {selectedDatabase && 
                <Button size="sm" variant="outline"  onClick={() => setVariable(JSON.parse(selectedDatabase).id.replaceAll("-",""))}>
                    Get Database ID
                </Button>}
            {selectedDatabase && 
                <Button size="sm" variant="outline"  onClick={fetchSampleQueryDatabaseCode}>
                    Query Database Sample Code
                </Button>}
        </div>
        {variable && <input className='p-2 mt-4 w-full' type="text" value={variable} placeholder='Variable Value' />}
        {sampleCode && <textarea className='p-2 mt-4 w-full h-96' value={sampleCode} placeholder='Sample Code' />}
        
    </div>
  )
}

export default NotionCode