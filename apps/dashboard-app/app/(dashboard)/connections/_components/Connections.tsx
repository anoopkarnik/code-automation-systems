'use client'
import React  from 'react'
import { CONNECTIONS } from '../../../../lib/constant'
import ConnectionCard from '../../../../components/ConnectionCard'

type Props = {
  searchParams?: { [key: string]: string | undefined }
}

const Connections = () => {

  return (
    <div className='m-6'>
      <div>
        Connect all your apps directly from here. You may need to connect these apps regularly to refresh verfication.
      </div>
      <div className='mt-10 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4'>
        {CONNECTIONS.map((connection) => (
              <ConnectionCard
                key={connection.title}
                connection={connection}
              />
        ))}
      </div>
    </div>
  )
}

export default Connections;