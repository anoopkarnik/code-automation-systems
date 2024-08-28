'use client'
import React, { useEffect, useState } from 'react'
import DbSelection from '../../../../components/DbSelection'
import { Select, SelectContent, SelectItem, SelectTrigger } from '@repo/ui/molecules/shadcn/Select'
import { useSession } from 'next-auth/react'
import { getYoutubeConnection, getAndUpdateChannels, getAndUpdateVideos } from '../../../../actions/connections/youtube-connections'
import { Button } from '@repo/ui/molecules/shadcn/Button'
import { useToast } from '../../../../hooks/useToast'

const Settings = () => {

  const [selectedAccount, setSelectedAccount] = useState('Select Account')
  const [accounts, setAccounts] = useState<any>([])
  const session = useSession()
  const userId = session.data?.user?.id
  const [channels, setChannels] = useState<any>([])
  const {toast,dismiss } = useToast();

  useEffect(() =>{
    const updateAccounts = async () => {
      if (userId) {
        const accounts = await getYoutubeConnection(userId)
        setAccounts(accounts)
      }
    }
    updateAccounts()
     // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  const getChannels = async () => {
    if (!userId || selectedAccount === 'Select Account') return
    const loadingToastId = toast({
      title: 'Getting Channels',
      description: 'Please wait while we fetch your subscribed channels and update Notion DB',
      duration: 500000
    }).id
    const result = await getAndUpdateChannels(userId, selectedAccount)
    if (result?.success){
      toast({
        title: 'Success',
        variant: 'success',
        description: result.success,
        duration: 5000
      })
    }
    if (result?.error){
      toast({
        title: 'Error',
        description: result.error,
        variant: 'destructive',
        duration: 5000
      })
    }
    dismiss(loadingToastId)
  }
  const getVideos= async () => {
    if (!userId || selectedAccount === 'Select Account') return
    const loadingToastId = toast({
      title: 'Getting Videos',
      description: 'Please wait while we fetch your videos from your subscribed channels and update Notion DB',
      duration: 5000000
    }).id
    const result = await getAndUpdateVideos(userId, selectedAccount)
    if (result?.success){
      toast({
        title: 'Success',
        variant: 'success',
        description: result.success,
        duration: 50000
      })
    }
    if (result?.error){
      toast({
        title: 'Error',
        description: result.error,
        variant: 'destructive',
        duration: 50000
      })
    }
    dismiss(loadingToastId)
  }


  return (
    <div className='my-4 flex flex-col w-[95%] mx-[2.5%] '>
        <h1 className='text-2xl font-medium my-4 text-center'>Create or Attach your Youtube Notion DBs</h1>
        <div className='flex flex-col items-start'>
          <DbSelection title='Channels Notion Db' name='Channels' fieldName="channelsDb"/>
          <DbSelection title='Videos Notion Db'  name='Videos' fieldName="videosDb"/>
          <div className='flex flex-wrap items-center justify-center border-b-2 border-border py-10 gap-4 '>
            <div className='font-bold w-[200px]'> Insert in Channels Notion Db from Youtube Subscription Channels</div>
            <Select onValueChange={(value)=>setSelectedAccount(value)}>
              <SelectTrigger className='w-[380px] py-8'>
                <div>{selectedAccount}</div>
              </SelectTrigger>
              <SelectContent className='w-[380px]'>
                {accounts.map((account:any) => (
                    <SelectItem key={account.name} value={account.name}>
                        <div className='flex items-center justify-start gap-4 w-[200px]'>
                        <div>{account.name}</div>
                        </div>
                    </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button onClick={getChannels} size="lg">Get Channels</Button>
          </div>
          <div className='flex flex-wrap items-center justify-center border-b-2 border-border py-10 gap-4 '>
            <div className='font-bold w-[200px]'> Insert in Videos Notion Db from Videos of Youtube Channels</div>
            <Select onValueChange={(value)=>setSelectedAccount(value)}>
              <SelectTrigger className='w-[380px] py-8'>
                <div>{selectedAccount}</div>
              </SelectTrigger>
              <SelectContent className='w-[380px]'>
                {accounts.map((account:any) => (
                    <SelectItem key={account.name} value={account.name}>
                        <div className='flex items-center justify-start gap-4 w-[200px]'>
                        <div>{account.name}</div>
                        </div>
                    </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button onClick={getVideos} size="lg">Get Videos</Button>
          </div>
        </div> 
    </div>
  )
}

export default Settings