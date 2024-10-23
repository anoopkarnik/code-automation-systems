"use client"
/* eslint-disable */

import React, { useEffect, useState } from 'react'
import { getPublicWorkflowsAction } from '../../../actions/workflows/workflow'
import PublicWorkflow from './PublicWorkflow'

const PublicWorkflows = () => {
    const [workflows,setWorkflows] = useState<any>([])

    useEffect(()=>{
        async function fetchWorkflows(){
            const flows = await getPublicWorkflowsAction();
            console.log(flows)
            setWorkflows(flows);
        }
        fetchWorkflows()
    },[])
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 w-full py-10 overflow-y-auto gap-4'>
        {workflows?.map((workflow:any) => (
            <PublicWorkflow key={workflow.id} workflow={workflow}/>
        ))}
    </div>
  )
}

export default PublicWorkflows