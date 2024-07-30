'use client'
import React, {  useCallback, useState }  from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@repo/ui/molecules/shadcn/Tabs'
import { useMedia, useSearchParam } from "react-use";
import { Select, SelectContent, SelectItem, SelectTrigger } from '@repo/ui/molecules/shadcn/Select'
import { SettingsIcon, VideoIcon, VideoOffIcon } from 'lucide-react';
import { useSession } from 'next-auth/react';
import Settings from './_components/Settings';
import YoutubeChannels from './_components/YoutubeChannels';
import YoutubeVideos from './_components/YoutubeVideos';
import { useRouter, useSearchParams } from 'next/navigation';
import {RadioGroup, RadioGroupItem} from '@repo/ui/molecules/shadcn/Radio'
import { Label } from '@repo/ui/molecules/shadcn/Label';

const YoutubePage = () => {
  const isMobile = useMedia("(max-width: 1324px)", false);
  const [selectedValue, setSelectedValue] = useState('Channels')
  const session = useSession();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [filterOption, setFilterOption] = useState('all')

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams)
      params.set(name, value)
 
      return params.toString()
    },
    [searchParams]
  )

  const handleSelect = (value: string, channelId?: string) => {
    let queryString = createQueryString('tab', value)
    if (channelId) {
      queryString = createQueryString('channelId', channelId)
    } else {
      const params = new URLSearchParams(searchParams)
      params.delete('channelId')
      queryString = params.toString()
    }
    router.push('?' + queryString)
    setSelectedValue(value)
  }

  const handleFilterChange = (value:any) => {
    setFilterOption(value);
};


  if (isMobile){
    return (
      <div className='flex flex-col items-center w-full my-6'>
        <Select onValueChange={handleSelect}>
          <SelectTrigger className='my-4 mx-8 w-[200px]'>
            <div>{selectedValue}</div>
          </SelectTrigger>
          <SelectContent className='w-[200px]'>
              <SelectItem value="Channels">
                <div className='flex items-center justify-start gap-4 w-[200px]'>
                  <VideoOffIcon/>
                  <div>Subscribed Channels</div>
                </div>
              </SelectItem>
              <SelectItem value="Videos">
                <div className='flex items-center justify-start gap-4 w-[200px]'>
                  <VideoIcon/>
                  <div>Subscribed Videos</div>
                </div>
              </SelectItem>
              <SelectItem value="Settings">
                <div className='flex items-center justify-start gap-4 w-[200px]'>
                  <SettingsIcon/>
                  <div>Settings</div>
                </div>
              </SelectItem>
          </SelectContent>
        </Select>
        <Select onValueChange={handleFilterChange}>
          <SelectTrigger className='my-4 mx-8 w-[200px]'>
            <div>{filterOption}</div>
          </SelectTrigger>
          <SelectContent className='w-[200px]'>
              <SelectItem value="all">
                <div className='flex items-center justify-start gap-4 w-[200px]'>
                  <div>All</div>
                </div>
              </SelectItem>
              <SelectItem value="watched">
                <div className='flex items-center justify-start gap-4 w-[200px]'>
                  <div>Watched</div>
                </div>
              </SelectItem>
              <SelectItem value="liked">
                <div className='flex items-center justify-start gap-4 w-[200px]'>
                  <div>Liked</div>
                </div>
              </SelectItem>
              <SelectItem value="not wwatched">
                <div className='flex items-center justify-start gap-4 w-[200px]'>
                  <div>Not Watched</div>
                </div>
              </SelectItem>
          </SelectContent>
        </Select>
        {selectedValue === 'Channels' && <YoutubeChannels changeTab={handleSelect}/>}
        {selectedValue === 'Videos' && <YoutubeVideos filterOption={filterOption} />}
        {selectedValue === 'Settings' && <Settings/>}
      </div>
    )
  }

  return (
    <Tabs className='w-full' defaultValue='Channels' value ={selectedValue} onValueChange={handleSelect}>
      <TabsList className='flex items-center justify-start flex-wrap rounded-none mb-10 gap-4 bg-inherit'>
        <TabsTrigger key="Channels" value="Channels" className='flex gap-1 border-b-2 shadow-md shadow-border/10 hover:bg-accent ' >
            <VideoOffIcon/>
            <div>Subscribed Channels</div>
        </TabsTrigger>
        <TabsTrigger key="Videos" value="Videos" className='flex gap-1 border-b-2 shadow-md shadow-border/10 hover:bg-accent ' >
            <VideoIcon/>
            <div>Subscribed Videos</div>
        </TabsTrigger>
        <TabsTrigger key="Settings" value="Settings" className='flex gap-1 border-b-2 shadow-md shadow-border/10 hover:bg-accent ' >
            <SettingsIcon/>
            <div>Settings</div>
        </TabsTrigger>
        {selectedValue === 'Videos' &&
          <RadioGroup defaultValue='all' className='flex items-center' onValueChange={handleFilterChange}>
            <div className='flex gap-2 items-center'>
              <RadioGroupItem value='all'/>
              <Label>All</Label>
            </div>
            <div className='flex gap-2 items-center'>
              <RadioGroupItem value='watched'/>
              <Label>Watched</Label>
            </div>
            <div className='flex gap-2 items-center'>
              <RadioGroupItem value='liked'/>
              <Label>Liked</Label>
            </div>
            <div className='flex gap-2 items-center'>
              <RadioGroupItem value='not watched'/>
              <Label>Not Watched</Label>
            </div>
          </RadioGroup>
        }
      </TabsList>
      <TabsContent value='Channels'>
        <YoutubeChannels changeTab={handleSelect}/>
      </TabsContent>
      <TabsContent value='Videos'>
        <YoutubeVideos filterOption={filterOption}/>
      </TabsContent>
      <TabsContent value='Settings'>
        <Settings/>
      </TabsContent>
    </Tabs>

  )
}

export default YoutubePage