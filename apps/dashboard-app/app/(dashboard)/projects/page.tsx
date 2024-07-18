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
  const projectsDbId = connectionsContext?.notionNode?.projectsDb?.id
  const blogsDbId = connectionsContext?.notionNode?.blogsDb?.id
  const placeOfWorkDbId = connectionsContext?.notionNode?.placeOfWorkDb?.id



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
            {projectItems.map((item:any) =>(
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
        {selectedValue === 'Projects' && <NotionTable dbId={projectsDbId}/>}
        {selectedValue === 'Blogs' && <NotionTable dbId={blogsDbId}/>}
        {selectedValue === 'Place of Work' && <NotionTable dbId={placeOfWorkDbId}/>}
        {selectedValue === 'settings' && <Settings/>}
      </div>
    )
  }

  return (
    <Tabs className='w-full' defaultValue='overview'>
      <TabsList className='flex items-center justify-start flex-wrap rounded-none my-4 gap-4 bg-inherit'>
        {projectItems.map((item:any) =>(
            <TabsTrigger key={item.title} value={item.title} className='flex gap-1 border-b-2 shadow-md shadow-border/10 hover:bg-accent ' >
              <item.icon/>
              <div>{item.title}</div>
            </TabsTrigger>
        ))}
      </TabsList>
      <TabsContent value='Overview'>
        <Overview/>
      </TabsContent>
      <TabsContent value='Projects'>
        <NotionTable dbId={projectsDbId}/>
      </TabsContent>
      <TabsContent value='Blogs'>
        <NotionTable dbId={blogsDbId}/>
      </TabsContent>
      <TabsContent value='Place of Work'>
        <NotionTable dbId={placeOfWorkDbId}/>
      </TabsContent>
      <TabsContent value='settings'>
        <Settings/>
      </TabsContent>
    </Tabs>
  )
}

export default ProjectsPage