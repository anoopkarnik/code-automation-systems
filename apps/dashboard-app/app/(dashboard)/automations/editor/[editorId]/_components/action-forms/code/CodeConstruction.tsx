import React, { useEffect, useState } from 'react'


import { Button } from '@repo/ui/atoms/shadcn/Button';
import { useSession } from 'next-auth/react';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@repo/ui/molecules/shadcn/Accordion';
import { Label } from '@repo/ui/atoms/shadcn/Label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@repo/ui/molecules/shadcn/Select';
import { getYoutubeConnection } from '../../../../../../../actions/connections/youtube-connections';
import { getOpenAIConnection } from '../../../../../../../actions/connections/openai-connections';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@repo/ui/molecules/shadcn/Tabs';
import Image from 'next/image';
import NotionCode from './NotionCode';
import OpenAICode from './OpenAICode';
import YoutubeCode from './YoutubeCode';

const CodeConstruction = () => {
    

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
        }
        fetchYoutubeDetails()
        fetchOpenAIDetails()
    },[userId,selectedYoutubeAccount,selectedOpenAIAccount])
  return (
    <div>
        <Tabs className='w-full' defaultValue='Notion'>
      <TabsList className='flex items-center justify-start flex-wrap rounded-none my-4 gap-4 bg-inherit'>
          <TabsTrigger key="Notion" value="Notion" className='flex gap-1 border-b-2 shadow-md shadow-border/10 hover:bg-accent ' >
            <Image src='/notion.png' alt='Notion' width={20} height={20}/>
          </TabsTrigger>
          <TabsTrigger key="OpenAI" value="OpenAI" className='flex gap-1 border-b-2 shadow-md shadow-border/10 hover:bg-accent ' >
            <Image src='/openai.png' alt='OpenAI' width={20} height={20}/>
          </TabsTrigger>
          <TabsTrigger key="Youtube" value="Youtube" className='flex gap-1 border-b-2 shadow-md shadow-border/10 hover:bg-accent ' >
            <Image src='/youtube.png' alt='Youtube' width={20} height={20}/>
          </TabsTrigger>
      </TabsList>
      <TabsContent value='Notion'>
        <NotionCode/>
      </TabsContent>
      <TabsContent value='OpenAI'>
        <OpenAICode/>
      </TabsContent>
      <TabsContent value='Youtube'>
        <YoutubeCode/>
      </TabsContent>
    </Tabs>
    </div>
  )
}

export default CodeConstruction