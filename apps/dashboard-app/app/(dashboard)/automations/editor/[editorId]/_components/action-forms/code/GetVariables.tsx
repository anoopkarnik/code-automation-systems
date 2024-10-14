import React, { useEffect, useState } from 'react'


import { Button } from '@repo/ui/atoms/shadcn/Button';
import { useSession } from 'next-auth/react';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@repo/ui/molecules/shadcn/Accordion';
import { Label } from '@repo/ui/atoms/shadcn/Label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@repo/ui/molecules/shadcn/Select';
import { getDatabases } from '../../../../../../../actions/notion/notion';
import { getNotionConnection } from '../../../../../../../actions/connections/notion-connections';
import SearchableSelect from '@repo/ui/molecules/custom/SearchableSelect';
;
const GetVariables = () => {
    const [notionAccounts, setNotionAccounts] = useState<any>([])
    const [selectedNotionAccount, setSelectedNotionAccount] = useState('')
    const [databases, setDatabases] = useState<any>([])
    const [selectedDatabase, setSelectedDatabase] = useState('')
    const [variable, setVariable] = useState('');
    const session = useSession();
    const userId = session?.data?.user?.id;

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
        <Accordion type="single" collapsible className='w-full'>
            <AccordionItem value="1">
                <AccordionTrigger>Get Notion Variables</AccordionTrigger>
                <AccordionContent>
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
                    <div className='flex gap-2 mt-4 ml-2 items-center'>
                        {selectedNotionAccount && 
                            <Button size="sm" variant="outline"  onClick={() => setVariable(selectedNotionAccount)}>
                                Get Access Token
                            </Button> }
                        {selectedDatabase && 
                            <Button size="sm" variant="outline"  onClick={() => setVariable(JSON.parse(selectedDatabase).id.replaceAll("-",""))}>
                                Get Database ID
                            </Button>}
                    </div>
                        <div className='flex flex-col gap-2 '>
            
                    </div>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
        <input className='p-2 mt-4 w-full' type="text" value={variable} placeholder='Variable Value' />
    </div>
  )
}

export default GetVariables