'use client'

import React, { useContext } from 'react'
import { ConnectionsContext } from '../../../../providers/connections-provider'
import NotionTable from './NotionTable'

const Transactions = ({showFilters}:any) => {
    const connectionsContext = useContext(ConnectionsContext)
    const dbId = connectionsContext?.notionNode?.transactionsDb?.id

  return (
    <div className='flex flex-col  '>
        <NotionTable showFilters={showFilters} dbId={dbId}/>
    </div>
  )
}

export default Transactions