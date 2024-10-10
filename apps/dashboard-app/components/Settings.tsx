'use client'
import React from 'react'
import DbSelection from './DbSelection'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@repo/ui/molecules/shadcn/Accordion'


const Settings = ({tables,notionTemplateUrl}:any) => {

  return (
    <div className='my-4 flex flex-col w-[95%] mx-[2.5%] '>
        <Accordion type="single" collapsible className='w-full'>
        <AccordionItem value='item-1'>
                <AccordionTrigger>
                    <div>Create your Notion DBs</div>
                </AccordionTrigger>
                <AccordionContent>
                    <ol>
                        <li>Create a Notion Account, if you do not already have an account. </li>
                        <li>Go to Connections SideTab and in the Connections Tab connect to your Notion account using Oauth. </li>
                        <li>Click on this link and duplicate the notion template which contains all the notion databases required
                            for this system to your workspace- <a href={notionTemplateUrl} target="_blank" className='text-blue-500'>Notion Template</a>
                        </li>
                        <li>Attach the new notion tables to the below keys.</li>
                    </ol>
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value='item-2'>
                <AccordionTrigger>
                    <div>Attach your Notion DBs</div>
                </AccordionTrigger>
                <AccordionContent>
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-2'>
                        {tables && Object.keys(tables).map((table:any) => (
                            <DbSelection key={table} title={table +" Notion Table"} name={table} fieldName={tables[table]}/>
                        ))}
                    </div>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    </div>
  )
} 

export default Settings