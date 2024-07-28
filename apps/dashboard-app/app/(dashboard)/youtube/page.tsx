'use client'
import React, {  useState }  from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@repo/ui/molecules/shadcn/Tabs'
import { useMedia } from "react-use";
import { Select, SelectContent, SelectItem, SelectTrigger } from '@repo/ui/molecules/shadcn/Select'
import { VideoIcon, VideoOffIcon } from 'lucide-react';
import YoutubeGallery from './_components/YoutubeGallery';
import { useSession } from 'next-auth/react';

const ProjectsPage = () => {
  const isMobile = useMedia("(max-width: 1324px)", false);
  const [selectedValue, setSelectedValue] = useState('Channels')
  const session = useSession();

  const handleSelect = (value:any) => {
    setSelectedValue(value)
  }


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
                  <div>Channels</div>
                </div>
              </SelectItem>
              <SelectItem value="Videos">
                <div className='flex items-center justify-start gap-4 w-[200px]'>
                  <VideoIcon/>
                  <div>Videos</div>
                </div>
              </SelectItem>
          </SelectContent>
        </Select>
        {selectedValue === 'Channels' && <YoutubeGallery/>}
        {selectedValue === 'Videos' && <YoutubeGallery/>}
      </div>
    )
  }

  return (
    <Tabs className='w-full' defaultValue='overview'>
      <TabsList className='flex items-center justify-start flex-wrap rounded-none mb-10 gap-4 bg-inherit'>
        <TabsTrigger key="Channels" value="Channels" className='flex gap-1 border-b-2 shadow-md shadow-border/10 hover:bg-accent ' >
            <VideoOffIcon/>
            <div>Channels</div>
        </TabsTrigger>
        <TabsTrigger key="Videos" value="Videos" className='flex gap-1 border-b-2 shadow-md shadow-border/10 hover:bg-accent ' >
            <VideoIcon/>
            <div>Videos</div>
        </TabsTrigger>
        
      </TabsList>
      <TabsContent value='Channels'>
        <YoutubeGallery/>
      </TabsContent>
      <TabsContent value='Videos'>
        <YoutubeGallery/>
      </TabsContent>
    </Tabs>

  )
}

export default ProjectsPage