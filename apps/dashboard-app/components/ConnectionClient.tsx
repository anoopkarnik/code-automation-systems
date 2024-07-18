import React, { use, useEffect, useState } from 'react'

import ConnectionCard from '@repo/ui/organisms/ConnectionCard'
import { set } from 'date-fns'

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

  const [appType, setAppType] = useState(type)
  const [callbackUrl, setCallbackUrl] = useState('')
  const [oauthUrl, setOauthUrl] = useState('')  

  useEffect(() => {
    setAppType(type)
    if (type === 'OpenAI'){
      setCallbackUrl(process.env.NEXT_PUBLIC_URL+'/api/callback/openai')
      setOauthUrl('')
    }
    else if (type === 'Notion'){
      setCallbackUrl('')
      setOauthUrl(process.env.NEXT_PUBLIC_NOTION_OAUTH_URL as string) 
    }
    else if (type === 'Youtube'){
      setCallbackUrl(process.env.NEXT_PUBLIC_URL+'/api/callback/youtube')
      setOauthUrl(process.env.NEXT_PUBLIC_YOUTUBE_OAUTH_URL as string)
    }
  },[type])

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
        callback_url={callbackUrl}
        oauth_url={oauthUrl}

    />
  )
}

export default ConnectionClient