'use client'
import React, { useContext, useEffect, useState } from 'react'
import { ConnectionsContext } from '../../../../providers/connections-provider'
import DbSelection from './DbSelection'
import { updateAccountNotionDatabase } from '../_actions/notion'

const Settings = () => {
    const connectionsContext = useContext(ConnectionsContext)
    
    const updateAccountDb = async () => {
        await updateAccountNotionDatabase(connectionsContext.notionNode?.notionId,connectionsContext.notionNode?.accountsDb)
    }


  return (
    <div className='m-4'>
        <h1 className='text-2xl font-medium mb-4'>Create or Attach your Financial Notion DBs</h1>
        <DbSelection title='Accounts Notion Db' updateDb={updateAccountDb} name='Accounts'/>
          
    </div>
  )
}

export default Settings