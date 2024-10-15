import React, { useEffect, useState } from 'react'


import { Button } from '@repo/ui/atoms/shadcn/Button';
import { useSession } from 'next-auth/react';
import { Label } from '@repo/ui/atoms/shadcn/Label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@repo/ui/molecules/shadcn/Select';
import { getOpenAIConnection } from '../../../../../../../actions/connections/openai-connections';

const OpenAICode = () => {
    
    //OpenAI Variables
    const [openAIAccounts, setOpenAIAccounts] = useState<any>([])
    const [selectedOpenAIAccount, setSelectedOpenAIAccount] = useState('')

    const [variable, setVariable] = useState<any>('');
    const session = useSession();
    const userId = session?.data?.user?.id;

    useEffect(() => {
        const fetchOpenAIDetails = async () => {
            if (!userId) return;
            const res:any = await getOpenAIConnection(userId);
            setOpenAIAccounts(res);
            console.log('openaiAccounts',res)
        }
        fetchOpenAIDetails()
    },[userId,selectedOpenAIAccount])
  return (
    <div>
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
        <input className='p-2 mt-4 w-full' type="text" value={variable} placeholder='Variable Value' />
    </div>
  )
}

export default OpenAICode