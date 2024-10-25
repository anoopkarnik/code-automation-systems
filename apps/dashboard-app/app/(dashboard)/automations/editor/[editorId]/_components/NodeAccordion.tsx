'use client'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@repo/ui/molecules/shadcn/Accordion'
import React, { useEffect, useState } from 'react'
import {  getLatestEventByWorkflowIdAction } from '../../../../../actions/workflows/workflow'

const NodeAccordion = ({node}:any) => {

  const [eventMetadata,setEventMetadata] = useState<any>({})
  useEffect(() => {
    if (node){
      const getEvent = async () => {
        const res:any = await  getLatestEventByWorkflowIdAction(node.workflowId as string);
        if (node.triggerId){
          setEventMetadata(res?.metadata?.trigger);
        }
        else{
          setEventMetadata(res?.metadata?.[`action${node.sortingOrder}`]);
        }
      }
      getEvent();
    }

  },[node])

  return (
    <Accordion type="single" collapsible className='w-full'>
    <AccordionItem value="item-1">
      <AccordionTrigger className='py-1'>
        <div className='flex justify-between items-center w-full mr-2'>
          <div> Configure</div>
        </div>
      </AccordionTrigger>
      <AccordionContent>
      {
        node.metadata && Object.keys(node.metadata).map((key) => (
          <div key={key} className='flex justify-between items-center w-full mr-2 flex-wrap overflow-clip font-extralight'>
            <div>{key}</div>
            <div>{typeof node.metadata[key] === 'object' ? JSON.stringify(node.metadata[key]) : node.metadata[key]}</div>
            </div>
          ))
      }
      </AccordionContent>
    </AccordionItem>
    <AccordionItem value="item-2">
      <AccordionTrigger className='py-1'>
        <div className='flex justify-between items-center w-full mr-2'>
          <div> Logs</div>
        </div>
      </AccordionTrigger>
      <AccordionContent>
        <div className='flex flex-col'>
          {
              eventMetadata && eventMetadata.logs && eventMetadata.logs.map((log:any,index:any) => (
                <div key={index} className='flex justify-between items-center w-full mr-2 flex-wrap overflow-clip font-extralight'>
                  <div>{log}</div>
                </div>
              ))
            }
        </div>
      </AccordionContent>
    </AccordionItem>
    <AccordionItem value="item-3">
      <AccordionTrigger className='py-1'>
        <div className='flex justify-between items-center w-full mr-2'>
          <div> Results </div>
        </div>
      </AccordionTrigger>
      <AccordionContent>
        {
          eventMetadata && eventMetadata.result &&
            <div className='flex justify-between items-center w-full mr-2 flex-wrap overflow-clip font-extralight'>
              <div>
                {
                  typeof eventMetadata.result === 'object' &&  
                    Object.keys(eventMetadata.result).map((key) => (
                      <div className='flex justify-between items-center w-full mr-2 flex-wrap '>
                        <div>{key}</div>
                        <div>{JSON.stringify(eventMetadata.result[key])}</div>
                      </div>
                    ))
                }
                <div>{typeof eventMetadata.result === 'string' &&  eventMetadata.result}</div>
              </div>
            </div>
        }
      </AccordionContent>
    </AccordionItem>
  </Accordion>
  )
}
export default NodeAccordion