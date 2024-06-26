import React from 'react'

import ConnectionCard from '@repo/ui/organisms/ConnectionCard'

type Props = {
    type: string
    icon: string
    title: string
    description: string
    callback?: () => void
    connected: {} & any
  }

const ConnectionClient = ({description,type,icon,title,connected}:Props) => {
  return (
    <ConnectionCard
        description={description}
        title={title}
        icon={icon}
        type={type}
        connected={connected}
        oauth_url={process.env.NEXT_PUBLIC_NOTION_OAUTH_URL || ''}

    />
  )
}

export default ConnectionClient