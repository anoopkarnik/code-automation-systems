import React, { useContext } from 'react'
import { ConnectionsContext } from '../../../../providers/connections-provider'

const Overview = () => {

  const connectionsContext = useContext(ConnectionsContext);
  const apiToken = connectionsContext?.notionNode?.accessToken
  

  return (
    <div>Overview</div>
  )
}

export default Overview