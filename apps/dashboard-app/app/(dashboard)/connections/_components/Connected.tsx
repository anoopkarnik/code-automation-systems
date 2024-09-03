'use client'
import React, { useContext, useEffect, useState } from 'react'
import { CONNECTIONS } from '../../../../lib/constant'
import { useSession } from 'next-auth/react'
import { getUserInfo } from '../../../actions/connections/user-connections'
import { ConnectionsContext } from '../../../../providers/connections-provider'
import ConnectedCard from '../../../../components/ConnectedCard'

const Connected = () => {

  const session = useSession()
  const [connections,setConnections] = useState<any>([])

  useEffect(() => {
    const getConnections = async () => {
      if (session?.data?.user?.id) {
        const userInfo = await getUserInfo(session.data.user.id);
        setConnections(userInfo?.connections);
        const newConnections: any = [];
        if (!userInfo) {
          return;
        } 
        for (let connection of userInfo?.connections) {
          const cons = CONNECTIONS.find((con) => con.title === connection.type);
          if (cons) {
            const newConnection = { ...cons, ...connection };
            if (!connections.some((conn:any) => conn.id === newConnection.id)) {
              newConnections.push(newConnection);
            }
          }
        };
        setConnections(newConnections);
      }
    };

    getConnections();
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session,CONNECTIONS]);

  if (!session) {
    return <div>loading...</div>
  }

  return (
    <div className='m-6'>
      <div>
        These are the apps correctly corrected
      </div>
      <div className='mt-10 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4'>

        {connections?.map((connection:any) => (
              <ConnectedCard
                key={connection.title}
                connection={connection}
              />
        ))}
      </div>
    </div>
  )
}

export default Connected;