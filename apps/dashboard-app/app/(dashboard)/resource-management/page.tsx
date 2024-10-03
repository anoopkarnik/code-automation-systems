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

const ProjectsPage = () => {
  const isMobile = useMedia("(max-width: 1324px)", false);
  const [selectedValue, setSelectedValue] = useState('Overview')
  const router = useRouter()
  const connectionsContext = useContext(ConnectionsContext);
  const socialSphereDbId = connectionsContext?.notionNode?.socialSphereDb?.id
  const passwordsDbId = connectionsContext?.notionNode?.passwordsDb?.id
  const journalDbId = connectionsContext?.notionNode?.journalDb?.id
  const inventoryDbId = connectionsContext?.notionNode?.inventoryDb?.id
  const statusDbId = connectionsContext?.notionNode?.statusDb?.id
  const goalsDbId = connectionsContext?.notionNode?.goalsDb?.id
  const rewardsDbId = connectionsContext?.notionNode?.rewardsDb?.id
  const punishmentsDbId = connectionsContext?.notionNode?.punishmentsDb?.id


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
            {personalInfoItems.map((item:any) =>(
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
        {selectedValue === 'Notion Tables' && <NotionTable/>}
        {selectedValue === 'Passwords' && <NotionTable dbId={passwordsDbId}/>}
        {selectedValue === 'Journal' && <NotionTable dbId={journalDbId}/>}
        {selectedValue === 'Inventory' && <NotionTable dbId={inventoryDbId}/>}
        {selectedValue === 'Status' && <NotionTable dbId={statusDbId}/>}
        {selectedValue === 'Goals' && <NotionTable dbId={goalsDbId}/>}
        {selectedValue === 'Rewards' && <NotionTable dbId={rewardsDbId}/>}
        {selectedValue === 'Punishments' && <NotionTable dbId={punishmentsDbId}/>}
        {selectedValue === 'Settings' && <Settings/>}
      </div>
    )
  }

  return (
    <Tabs className='w-full' defaultValue='overview'>
      <TabsList className='flex items-center justify-start flex-wrap rounded-none my-4 gap-4 bg-inherit'>
        {personalInfoItems.map((item:any) =>(
            <TabsTrigger key={item.title} value={item.title} className='flex gap-1 border-b-2 shadow-md shadow-border/10 hover:bg-accent ' >
              <item.icon/>
              <div>{item.title}</div>
            </TabsTrigger>
        ))}
      </TabsList>
      <TabsContent value='Overview'>
        <Overview/>
      </TabsContent>
      <TabsContent value='Social Sphere'>
        <NotionTable dbId={socialSphereDbId}/>
      </TabsContent>
      <TabsContent value='Passwords'>
        <NotionTable dbId={passwordsDbId}/>
      </TabsContent>
      <TabsContent value='Journal'>
        <NotionTable dbId={journalDbId}/>
      </TabsContent>
      <TabsContent value='Inventory'>
        <NotionTable dbId={inventoryDbId}/>
      </TabsContent>
      <TabsContent value='Status'>
        <NotionTable dbId={statusDbId}/>
      </TabsContent>
      <TabsContent value='Goals'>
        <NotionTable dbId={goalsDbId}/>
      </TabsContent>
      <TabsContent value='Rewards'>
        <NotionTable dbId={rewardsDbId}/>
      </TabsContent>
      <TabsContent value='Punishments'>
        <NotionTable dbId={punishmentsDbId}/>
      </TabsContent>
      <TabsContent value='settings'>
        <Settings/>
      </TabsContent>
    </Tabs>
  )
}

export default ProjectsPage