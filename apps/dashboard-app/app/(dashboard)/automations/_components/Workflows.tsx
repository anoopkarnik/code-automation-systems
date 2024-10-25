"use client"
/* eslint-disable */

import React, { useEffect, useState } from 'react'
import { getWorkflows } from '../../../actions/workflows/workflow'
import { useSession } from 'next-auth/react'
import Workflow from './Workflow'

const Workflows = () => {
    const [workflows,setWorkflows] = useState<any>([])
    const session = useSession();
    const userId = session.data?.user?.id;

    useEffect(()=>{
        async function fetchWorkflows(){
            const flows = await getWorkflows(userId || '');
            setWorkflows(flows);
        }
        fetchWorkflows()
    },[userId])
  return (
    <div className='grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 w-full py-10 overflow-y-auto gap-4'>
        {workflows?.map((workflow:any) => (
            <Workflow key={workflow.id} workflow={workflow}/>
        ))}
    </div>
  )
}

export default Workflows