import React from 'react'

import ConnectionCard from '@repo/ui/organisms/ConnectionCard'

type Props = {
    type: string
    icon: string
    title: string
    description: string
    callback?: () => void
    connected: {} & any
    formElements?: {
      label: string
      placeholder: string
      type: string
      name: string
    }[]
    published: boolean
    showModal: boolean
  }

const ConnectionClient = ({description,type,icon,title,connected,formElements,published,showModal}:Props) => {
  return (
    <ConnectionCard
        description={description}
        title={title}
        icon={icon}
        type={type}
        connected={connected}
        formElements={formElements}
        published={published}
        showModal={showModal}
        callback_url={(type==='OpenAI' ? process.env.NEXT_PUBLIC_URL+'/api/callback/openai' : '') || ''}
        oauth_url={(type==='Notion' ? process.env.NEXT_PUBLIC_NOTION_OAUTH_URL : '' )|| ''}

    />
  )
}

export default ConnectionClient