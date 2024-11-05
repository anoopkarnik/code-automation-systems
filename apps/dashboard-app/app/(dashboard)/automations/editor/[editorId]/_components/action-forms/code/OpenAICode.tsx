import React, { useEffect, useState } from 'react'


import { Button } from '@repo/ui/atoms/shadcn/Button';
import { useSession } from 'next-auth/react';
import { Label } from '@repo/ui/atoms/shadcn/Label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@repo/ui/molecules/shadcn/Select';
import { getOpenAIConnection } from '../../../../../../../actions/connections/openai-connections';
import { getAllModels } from '../../../../../../../actions/openai/openai';
import { Textarea } from '@repo/ui/atoms/shadcn/Textarea';
import { CopyIcon } from 'lucide-react';
import { useToast } from '../../../../../../../../hooks/useToast';

const OpenAICode = () => {
    
    //OpenAI Variables
    const [openAIAccounts, setOpenAIAccounts] = useState<any>([])
    const [selectedOpenAIAccount, setSelectedOpenAIAccount] = useState('')
    const [messages, setMessages] = useState<any>('')
    let responseFormats:any = ["json_object","text"]
    const [models, setModels] = useState<any>([])
    const [selectedModel, setSelectedModel] = useState('gpt-4o')
    const [selectedResponseFormat, setSelectedResponseFormat] = useState('text')
    const [selectedSystemInstructions, setSelectedSystemInstructions] = useState('You are a helpful assistant')
    const [sampleCode, setSampleCode] = useState(''); 

    const [variable, setVariable] = useState<any>('');
    const session = useSession();
    const userId = session?.data?.user?.id;
    const { toast } = useToast();

    useEffect(() => {
        const fetchOpenAIDetails = async () => {
            if (!userId) return;
            const res:any = await getOpenAIConnection(userId);
            console.log(res[0].apiKey)
            setOpenAIAccounts(res);
            const models:any = await getAllModels(res[0].apiKey);
            console.log(models)
            setModels(models?.data)
        }
        fetchOpenAIDetails()
    },[userId,selectedOpenAIAccount])

    const fetchChatCompletionCode = async () => {
        try {
            const response = await fetch('/samplePythonCodes/openai/chatCompletion.txt'); // Assuming the file is in the public folder
            let text = await response.text();
            text = text.replaceAll("{{token}}", selectedOpenAIAccount);
            text = text.replaceAll("{{model}}", selectedModel);
            text = text.replaceAll("{{responseFormat}}", selectedResponseFormat);
            text = text.replaceAll("{{systemInstructions}}", selectedSystemInstructions);
            text = text.replaceAll("{{messages}}", messages);
            setSampleCode(text);

        } catch (error) {
            console.error('Error fetching sample query:', error);
            setSampleCode('// Error fetching the sample query.');
        }
    };

    const copySampleCode = () => {
        navigator.clipboard.writeText(sampleCode).then(() => {
            toast({title: "Copied", description: "Copied Sample Code to clipboard!", variant: 'default'})
        }).catch(err => {
            toast({title: "Error", description: "Failed to copy code.", variant: 'destructive'})
            console.error("Error copying code:", err);
        });
    };


  return (
    <div>
        <div className='flex flex-col gap-4  mt-8 ml-2 w-[80%] text-paragraph'>
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
            {selectedOpenAIAccount && 
                <div className='flex flex-col gap-4 mt-2'>
                    <Label className='ml-2'>Models</Label>
                    <Select onValueChange={(value) => setSelectedModel(value)} defaultValue={selectedModel}>
                        <SelectTrigger>
                            <SelectValue placeholder='Select Model'/>  
                        </SelectTrigger>
                        <SelectContent>
                            {models?.map((model:any) => (
                                <SelectItem key={model.id} value={model.id}>{model.id}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            }
            {selectedOpenAIAccount && 
                <div className='flex flex-col gap-4  mt-2'>
                    <Label className='ml-2'>Response Format</Label>
                    <Select onValueChange={(value) => setSelectedResponseFormat(value)} defaultValue={selectedResponseFormat}>
                        <SelectTrigger>
                            <SelectValue placeholder='Select Response Format'/>  
                        </SelectTrigger>
                        <SelectContent>
                            {responseFormats?.map((responseFormat:any) => (
                                <SelectItem key={responseFormat} value={responseFormat}>{responseFormat}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            }
            {selectedOpenAIAccount && 
                <div className='flex flex-col gap-4  mt-2'>
                    <Label className='ml-2'>System Instructions</Label>
                    <Textarea className='p-2' value={selectedSystemInstructions} onChange={(e) => setSelectedSystemInstructions(e.target.value)} placeholder='System Instructions' />
                </div>}
            {selectedOpenAIAccount && 
                <div className='flex flex-col gap-4  mt-2'>
                    <Label className='ml-2'>Messages</Label>
                    <Textarea className='p-2' value={messages} onChange={(e) => setMessages(e.target.value)} placeholder='Enter the Messages' />
                </div>}
        </div>
        
        <div className='flex gap-2 mt-4 ml-2 items-center'>
            {selectedOpenAIAccount && 
                <Button size="sm" variant="outline"  onClick={() => setVariable(selectedOpenAIAccount)}>
                    Get Access Token
                </Button> }
            {selectedOpenAIAccount && 
                <Button size="sm" variant="outline"  onClick={fetchChatCompletionCode}>
                    Get Chat Completion Code
                </Button> }
        </div>

        {variable && 
            <input className='p-2 mt-4 w-full' type="text" value={variable} placeholder='Variable Value' />
        }
        {sampleCode && 
            <div className='flex flex-col relative'>
                <div className="absolute top-8 right-8 flex gap-2 ">
                    <CopyIcon onClick={copySampleCode} className='w-5 h-5 cursor-pointer ' />
                </div>
                <textarea className='p-2 mt-4 w-full h-96' value={sampleCode} placeholder='Sample Code' />
            </div>
        }
    </div>
  )
}

export default OpenAICode