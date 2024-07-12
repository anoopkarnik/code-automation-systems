'use client'
import React, { useContext, useEffect, useState } from 'react'
import { CONNECTIONS } from '../../../lib/constant'
import { useSession } from 'next-auth/react'
import { onNotionConnection } from '../../../actions/connections/notion-connections'
import { getUserInfo } from '../../../actions/connections/user-connections'
import { useSearchParams } from 'next/navigation'
import ConnectionClient from '../../../components/ConnectionClient'
import { onOpenAIConnection } from '../../../actions/connections/openai-connections'
import { ConnectionsContext } from '../../../providers/connections-provider'

type Props = {
  searchParams?: { [key: string]: string | undefined }
}

const Connections = () => {

  const params = useSearchParams();
  const access_token = params.get('access_token')
  const workspace_name = params.get('workspace_name')
  const workspace_icon = params.get('workspace_icon')
  const workspace_id = params.get('workspace_id')
  const database_id = params.get('database_id')
  const apiKey = params.get('apiKey')
  const session = useSession()
  const user = session?.data?.user
  const userId = user?.id


  const [connections,setConnections] = useState<Record<string,boolean>>({}) 

  useEffect(() =>{
    const onUserConnection = async () =>{
      // @ts-ignore
      await onNotionConnection({access_token,workspace_id,workspace_icon,workspace_name,database_id,userId})
      // @ts-ignore
      await onOpenAIConnection({apiKey,userId})
      const user_info = await getUserInfo(userId || '')
      const newConnections: Record<string, boolean> = {}
      user_info?.connections.forEach((connection: any) => {
        newConnections[connection.type] = true
      })
      setConnections(newConnections)
    }
    onUserConnection()
  },[access_token,workspace_id,workspace_icon,workspace_name,database_id,apiKey,userId])

  return (
    <div className='m-6'>
      <div>
        Connect all your apps directly from here. You may need to connect these apps regularly to refresh verfication.
      </div>
      <div className='mt-10 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4'>
        {CONNECTIONS.map((connection) => (
              <ConnectionClient
                key={connection.title}
                description={connection.description}
                title={connection.title}
                icon={connection.image}
                type={connection.title}
                connected={connections}
                published={connection.published}
                showModal={connection.showModal}
                formElements={connection.formElements}
              />
        ))}
      </div>
    </div>
  )
}

export default Connections;