'use client'
import React, { useContext, useState }  from 'react'
import { knowledgeBaseItems, projectItems, plannerItems, personalInfoItems } from '../../../lib/constant'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@repo/ui/molecules/shadcn/Tabs'
import Overview from './_components/Overview'
import Settings from './_components/Settings'
import { useMedia } from "react-use";
import { Select, SelectContent, SelectItem, SelectTrigger } from '@repo/ui/molecules/shadcn/Select'
import { useRouter } from 'next/navigation'
import { ConnectionsContext } from '../../../providers/connections-provider'
import NotionTable from '../../../components/NotionTable'

const KnowledgeBasePage = () => {
  const isMobile = useMedia("(max-width: 1324px)", false);
  const [selectedValue, setSelectedValue] = useState('Overview')
  const router = useRouter()
  const connectionsContext = useContext(ConnectionsContext);
  const booksDbId = connectionsContext?.notionNode?.booksDb?.id
  const quickCaptureDbId = connectionsContext?.notionNode?.quickCaptureDb?.id
  const areasDbId = connectionsContext?.notionNode?.areasDb?.id
  const archiveDbId = connectionsContext?.notionNode?.archiveDb?.id 
  const interestingDbId = connectionsContext?.notionNode?.interestingDb?.id
  const podcastsDbId = connectionsContext?.notionNode?.podcastsDb?.id
  const videosDbId = connectionsContext?.notionNode?.videosDb?.id
  const skillTreesDbId = connectionsContext?.notionNode?.skillTreesDb?.id
  const channelsDbId = connectionsContext?.notionNode?.channelsDb?.id


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
            {knowledgeBaseItems.map((item:any) =>(
              <SelectItem key={item.title} value={item.title}>
                <div className='flex items-center justify-start gap-4 w-[200px]'>
                  <item.icon/>
                  <div>{item.title}</div>
                </div>
              </SelectItem>
            ))}

          </SelectContent>
        </Select>
        {selectedValue === 'Overview' && <Overview/>}
        {selectedValue === 'Books' && <NotionTable dbId={booksDbId}/>}
        {selectedValue === 'Quick Capture' && <NotionTable dbId={quickCaptureDbId}/>}
        {selectedValue === 'Areas' && <NotionTable dbId={areasDbId}/>}
        {selectedValue === 'Archive' && <NotionTable dbId={archiveDbId}/>}  
        {selectedValue === 'Interesting' && <NotionTable dbId={interestingDbId}/>}
        {selectedValue === 'Podcasts' && <NotionTable dbId={podcastsDbId}/>}
        {selectedValue === 'Videos' && <NotionTable dbId={videosDbId}/>}
        {selectedValue === 'Skill Trees' && <NotionTable dbId={skillTreesDbId}/>}
        {selectedValue === 'Channels' && <NotionTable dbId={channelsDbId}/>}
        {selectedValue === 'settings' && <Settings/>}
      </div>
    )
  }

  return (
    <Tabs className='w-full' defaultValue='overview'>
      <TabsList className='flex items-center justify-start flex-wrap rounded-none my-4 gap-4 bg-inherit'>
        {knowledgeBaseItems.map((item:any) =>(
            <TabsTrigger key={item.title} value={item.title} className='flex gap-1 border-b-2 shadow-md shadow-border/10 hover:bg-accent ' >
              <item.icon/>
              <div>{item.title}</div>
            </TabsTrigger>
        ))}
      </TabsList>
      <TabsContent value='Overview'>
        <Overview/>
      </TabsContent>
      <TabsContent value='Books'>
        <NotionTable dbId={booksDbId}/>
      </TabsContent>
      <TabsContent value='Quick Capture'>
        <NotionTable dbId={quickCaptureDbId}/>
      </TabsContent>
      <TabsContent value='Areas'>
        <NotionTable dbId={areasDbId}/>
      </TabsContent>
      <TabsContent value='Archive'>
        <NotionTable dbId={archiveDbId}/>
      </TabsContent>
      <TabsContent value='Interesting'>
        <NotionTable dbId={interestingDbId}/>
      </TabsContent>
      <TabsContent value='Podcasts'>
        <NotionTable dbId={podcastsDbId}/>
      </TabsContent>
      <TabsContent value='Videos'>
        <NotionTable dbId={videosDbId}/>
      </TabsContent>
      <TabsContent value='Skill Trees'>
        <NotionTable dbId={skillTreesDbId}/>
      </TabsContent>
      <TabsContent value='Channels'>
        <NotionTable dbId={channelsDbId}/>
      </TabsContent>
      <TabsContent value='settings'>
        <Settings/>
      </TabsContent>
    </Tabs>
  )
}

export default KnowledgeBasePage