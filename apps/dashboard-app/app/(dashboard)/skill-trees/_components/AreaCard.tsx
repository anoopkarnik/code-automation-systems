'use cient'
import { cn } from '@repo/ui/lib/utils'
import { Button } from '@repo/ui/molecules/shadcn/Button';
import { format } from 'date-fns';
import React, { useContext } from 'react'
import { calculateAndUpdateNextRevisionDate } from '../_action/notionUpdate';
import { ConnectionsContext } from '../../../../providers/connections-provider';

const AreaCard = ({page,type,testGrades,revisionTimeTaken}:any) => {
    const connectionsContext = useContext(ConnectionsContext);
    const apiToken = connectionsContext?.notionNode?.accessToken;
    const handlePageClick = (page: any) => {
        let id = page.Name.replaceAll(' ','-').replaceAll('/','-') + '-'+ page.id.replaceAll('-','');
        const url = `https://www.notion.so/${id}`; // Replace with your desired URL
        window.open(url, '_blank');
      };
  return (
    <div  className={cn(" p-4 my-2 mr-4 rounded-xl",
        (new Date() >= new Date(page['Review Date']) ) ? "bg-destructive/20" : "")} >
          <div className='flex items-center justify-start gap-2 flex-wrap'>
            {page.Name}
           <div className='font-extralight text-sm'>{page['Review Date'] ? format(page['Review Date'], "dd MMMyy") : ''} | </div>
           <div className='font-extralight text-sm'>{page?.['Self Grade Name']} | </div>
           <div className='font-extralight text-sm'>{page?.['Difficulty Name']} | </div>
           <div className='font-extralight text-sm'>{page?.['Total Line Count'].match(/\d+/)[0]} lines | </div>
           <div className='font-extralight text-sm'> {page?.['Repetitions']} repetitions done</div>
          </div>
          <div className='font-extralight text-sm'>{page.Description ? page.Description : 'No Description Available'}</div>
          <div className='mt-2'>
            {type==="Notes" && <Button variant='outline' onClick={() => calculateAndUpdateNextRevisionDate(page,apiToken)}>Revision Done</Button>}
            <Button variant='outline' onClick={() => handlePageClick(page)}>Open Notion Page</Button>
          </div>
      </div>
  )
}

export default AreaCard