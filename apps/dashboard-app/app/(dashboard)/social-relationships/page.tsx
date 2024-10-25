'use client'
import React, { useEffect, useState }  from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@repo/ui/molecules/shadcn/Tabs'
import Overview from './_components/Overview'
import Settings from '../../../components/Settings'
import NotionTables from '../../../components/NotionTables'
import { useMedia } from "react-use";
import { Select, SelectContent, SelectItem, SelectTrigger } from '@repo/ui/molecules/shadcn/Select'
import { tablesInDatabase } from '../../../lib/constant'

const SocialRelationshipsPage = () => {
  let database = "Social & Relationships"
  let notionTemplateUrl = "https://anoopkarnik.notion.site/Social-and-Relationship-System-1121d3faa0a080ce87f0fd335e77228f"
  const isMobile = useMedia("(max-width: 1324px)", false);
  const [selectedValue, setSelectedValue] = useState('Overview')
  const [tables, setTables] = useState({})
  const handleSelect = (value:any) => {
    setSelectedValue(value)
  }

  useEffect(() =>{
    if (tablesInDatabase && tablesInDatabase[database]) {
      setTables(tablesInDatabase[database])
    }
  }, [database])

  if (isMobile){
    return (
      <div className='flex flex-col items-center w-full my-6'>
        <Select onValueChange={handleSelect}>
          <SelectTrigger className='my-4 mx-8 w-[200px]'>
            <div>{selectedValue}</div>
          </SelectTrigger>
          <SelectContent className='w-[200px]'>
              <SelectItem key="Overview" value="Overview">
                <div className='flex items-center justify-start gap-4 w-[200px]'>
                  <div>Overview</div>
                </div>
              </SelectItem>
              <SelectItem key="Notion Tables" value="Notion Tables">
                <div className='flex items-center justify-start gap-4 w-[200px]'>
                  <div>Notion Tables</div>
                </div>
              </SelectItem>
              <SelectItem key="Settings" value="Settings">
                <div className='flex items-center justify-start gap-4 w-[200px]'>
                  <div>Settings</div>
                </div>
              </SelectItem>
          </SelectContent>
        </Select>
        {selectedValue === 'Overview' && <Overview/>}
        {selectedValue === 'Notion Tables' && <NotionTables tables={tables}/>}
        {selectedValue === 'Settings' && <Settings tables={tables} notionTemplateUrl={notionTemplateUrl}/>}
      </div>
    )
  }

  return (
    <Tabs className='w-full' defaultValue='overview'>
      <TabsList className='flex items-center justify-start flex-wrap rounded-none my-4 gap-4 bg-inherit'>
          <TabsTrigger key="Overview" value="Overview" className='flex gap-1 border-b-2 shadow-md shadow-border/10 hover:bg-accent ' >
            <div>Overview</div>
          </TabsTrigger>
          <TabsTrigger key="Notion Tables" value="Notion Tables" className='flex gap-1 border-b-2 shadow-md shadow-border/10 hover:bg-accent ' >
            <div>Notion Tables</div>
          </TabsTrigger>
          <TabsTrigger key="Settings" value="Settings" className='flex gap-1 border-b-2 shadow-md shadow-border/10 hover:bg-accent ' >
            <div>Settings</div>
          </TabsTrigger>
      </TabsList>
      <TabsContent value='Overview'>
        <Overview/>
      </TabsContent>
      <TabsContent value='Notion Tables'>
        <NotionTables tables={tables}/>
      </TabsContent>
      <TabsContent value='Settings'>
        <Settings tables={tables}  notionTemplateUrl={notionTemplateUrl}/>
      </TabsContent>
    </Tabs>
  )
}

export default SocialRelationshipsPage