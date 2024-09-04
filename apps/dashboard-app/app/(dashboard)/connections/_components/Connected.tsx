'use client'
import React, {  useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import ConnectedCard from '../../../../components/ConnectedCard'
import { getConnectionsAction } from '../../../actions/connections/common-connection'

const Connected = () => {

  const session = useSession()
  const [connections,setConnections] = useState<any>([])

  useEffect(() => {
    const getConnections = async () => {
      if (session?.data?.user?.id) {
        const connections = await getConnectionsAction(session.data.user.id);
        setConnections(connections);
      }
    };
    getConnections();
  }, []);

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