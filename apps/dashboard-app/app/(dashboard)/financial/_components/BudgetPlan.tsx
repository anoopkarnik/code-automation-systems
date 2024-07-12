'use client'

import React, { useContext } from 'react'
import { ConnectionsContext } from '../../../../providers/connections-provider'
import NotionTable from './NotionTable'

const BudgetPlan = ({showFilters}:any) => {
    const connectionsContext = useContext(ConnectionsContext)
    const dbId = connectionsContext?.notionNode?.budgetPlanDb?.id

  return (
    <div className='flex flex-col w-full '>
        <NotionTable showFilters={showFilters} dbId={dbId}/>
    </div>
  )
}

export default BudgetPlan