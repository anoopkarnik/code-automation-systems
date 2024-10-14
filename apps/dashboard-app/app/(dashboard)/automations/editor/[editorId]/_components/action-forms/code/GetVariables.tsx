import React, { useEffect, useState } from 'react'


import { Button } from '@repo/ui/atoms/shadcn/Button';
import { useSession } from 'next-auth/react';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@repo/ui/molecules/shadcn/Accordion';
import { Label } from '@repo/ui/atoms/shadcn/Label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@repo/ui/molecules/shadcn/Select';
import { getDatabases } from '../../../../../../../actions/notion/notion';
import { getNotionConnection } from '../../../../../../../actions/connections/notion-connections';
import SearchableSelect from '@repo/ui/molecules/custom/SearchableSelect';
import { getYoutubeConnection } from '../../../../../../../actions/connections/youtube-connections';
import { getOpenAIConnection } from '../../../../../../../actions/connections/openai-connections';
;
const GetVariables = () => {
    
    //Notion Variables
    const [notionAccounts, setNotionAccounts] = useState<any>([])
    const [selectedNotionAccount, setSelectedNotionAccount] = useState('')
    const [databases, setDatabases] = useState<any>([])
    const [selectedDatabase, setSelectedDatabase] = useState('')

    //Youtube Variables
    const [youtubeAccounts, setYoutubeAccounts] = useState<any>([])
    const [selectedYoutubeAccount, setSelectedYoutubeAccount] = useState('')
    const youtubeClientId:any = process.env.NEXT_PUBLIC_YOUTUBE_CLIENT_ID;
    const youtubeClientSecret:any = process.env.NEXT_PUBLIC_YOUTUBE_CLIENT_SECRET;

    //OpenAI Variables
    const [openAIAccounts, setOpenAIAccounts] = useState<any>([])
    const [selectedOpenAIAccount, setSelectedOpenAIAccount] = useState('')

    const [variable, setVariable] = useState<any>('');
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
        const fetchYoutubeDetails = async () => {
            if (!userId) return;
            const res:any = await getYoutubeConnection(userId);
            const youtubeClientId = 
            setYoutubeAccounts(res);
        }
        const fetchOpenAIDetails = async () => {
            if (!userId) return;
            const res:any = await getOpenAIConnection(userId);
            setOpenAIAccounts(res);
            console.log('openaiAccounts',res)
        }
        fetchNotionDetails()
        fetchYoutubeDetails()
        fetchOpenAIDetails()
    },[userId, selectedNotionAccount,selectedDatabase,selectedYoutubeAccount,selectedOpenAIAccount])
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
            <AccordionItem value="2">
                <AccordionTrigger>Get Youtube Variables</AccordionTrigger>
                <AccordionContent>
                    <div className='flex flex-col gap-4  mt-4 ml-2 w-[80%]'>
                        <Label className='ml-2'>Youtube Account</Label>
                        <Select onValueChange={(value) => setSelectedYoutubeAccount(value)} defaultValue={selectedYoutubeAccount}>
                            <SelectTrigger>
                                <SelectValue placeholder='Select Youtube Account'/>  
                            </SelectTrigger>
                            <SelectContent>
                                {youtubeAccounts?.map((account:any) => (
                                    <SelectItem key={account.id} value={account.access_token}>{account.name}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    
                    <div className='flex gap-2 mt-4 ml-2 items-center flex-wrap'>
                        {selectedYoutubeAccount && 
                            <Button size="sm" variant="outline"  onClick={() => setVariable(selectedYoutubeAccount)}>
                                Get Refresh Token
                            </Button> }
                        <Button size="sm" variant="outline"  onClick={() => setVariable(youtubeClientId)}>
                            Get Youtube Client ID
                        </Button>
                        <Button size="sm" variant="outline"  onClick={() => setVariable(youtubeClientSecret)}>
                            Get Youtube Client Secret
                        </Button>
                    </div>
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="3">
                <AccordionTrigger>Get OpenAI Variables</AccordionTrigger>
                <AccordionContent>
                    <div className='flex flex-col gap-4  mt-4 ml-2 w-[80%]'>
                        <Label className='ml-2'>OpenAI Account</Label>
                        <Select onValueChange={(value) => setSelectedOpenAIAccount(value)} defaultValue={selectedOpenAIAccount}>
                            <SelectTrigger>
                                <SelectValue placeholder='Select OpenAI Account'/>  
                            </SelectTrigger>
                            <SelectContent>
                                {openAIAccounts?.map((account:any) => (
                                    <SelectItem key={account.id} value={account.apiKey}>{account.name}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    
                    <div className='flex gap-2 mt-4 ml-2 items-center'>
                        {selectedOpenAIAccount && 
                            <Button size="sm" variant="outline"  onClick={() => setVariable(selectedOpenAIAccount)}>
                                Get Access Token
                            </Button> }
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