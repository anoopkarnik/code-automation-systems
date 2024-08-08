import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@repo/ui/molecules/shadcn/Accordion'
import React from 'react'

const NodeAccordion = ({node}:any) => {
  console.log(node)
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
      </AccordionContent>
    </AccordionItem>
    <AccordionItem value="item-3">
      <AccordionTrigger className='py-1'>
        <div className='flex justify-between items-center w-full mr-2'>
          <div> Results </div>
        </div>
      </AccordionTrigger>
      <AccordionContent>
      </AccordionContent>
    </AccordionItem>
  </Accordion>
  )
}
export default NodeAccordion