'use client'
import React, { useEffect, useState } from 'react'

import { Card, CardDescription, CardHeader, CardTitle } from '@repo/ui/molecules/shadcn/Card'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@repo/ui/atoms/shadcn/Button'

import { Dialog,DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@repo/ui/molecules/shadcn/Dialog'
import AddConnectionsModal from './AddConnectionModal'
import { useSession } from 'next-auth/react'
import { createOpenAIConnection } from '../app/actions/connections/openai-connections'
import { useRouter } from 'next/navigation'


const ConnectionCard = ({connection}:any) => {

  const [appType, setAppType] = useState(connection.title)
  const [callbackUrl, setCallbackUrl] = useState('')
  const [oauthUrl, setOauthUrl] = useState('')
  const session = useSession();
  const user = session?.data?.user
  const router = useRouter()

  const addConnection = async ({apiKey}:any) => {
    if (connection.title === 'OpenAI'){
      const response = await createOpenAIConnection({apiKey,userId:user?.id})
      location.reload()
    }
    else if (connection.title === 'Notion'){
      router.push('/connections/notion')
    }
  }

  useEffect(() => {
    setAppType(connection.title)
    if (connection.title === 'Notion'){
      setOauthUrl(process.env.NEXT_PUBLIC_NOTION_OAUTH_URL as string) 
    }
    else if (connection.title === 'Youtube'){
      setCallbackUrl(process.env.NEXT_PUBLIC_URL+'/api/callback/youtube')
      setOauthUrl(process.env.NEXT_PUBLIC_YOUTUBE_OAUTH_URL as string)
    }
  },[connection.title])

  const handleConnect = () => {
    console.log('oauthUrl',oauthUrl)
    if (oauthUrl) {
      location.assign(oauthUrl)
    }
  }

  return (
    <Card className="flex flex-col items-center justify-between ">
    <CardHeader className="flex flex-col items-center justify-center gap-2">
      <div className="flex flex-row gap-2">
        <Image src={connection.image} alt={connection.title} height={30} width={30}className="object-contain"/>
      </div>
      <div className='flex flex-col gap-4'>
        <CardTitle className="text-center text-lg">{connection.title}</CardTitle>
        <CardDescription className=' text-center'>{connection.description}</CardDescription>
      </div>
    </CardHeader>
    { connection.published && <div className="flex flex-col items-center gap-2 p-4 mx-4 ">
     { connection.showModal? (
        <Dialog>
          <DialogTrigger>
            <Button size="lg"  >
              Connect
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className='flex text-4xl gap-4'>
                <Image src={connection.image} alt={connection.title} height={30} width={30} className="object-contain"/>
                <div>{connection.title}</div>
              </DialogTitle>
              <DialogDescription className='py-4 '>{connection.description}</DialogDescription>
            </DialogHeader>
            <AddConnectionsModal formElements={connection.formElements || []} addConnection={addConnection} userId={user?.id}/>
          </DialogContent>
        </Dialog>
      ):(
      <div className=''>    
        <Button size="lg" onClick={handleConnect}>
          Connect
        </Button>
      </div>)}
    </div>}
    {!connection.published && 
    <div className="flex flex-col items-center gap-2 mb-4">
        <Button size="lg" >
          In Progress
        </Button>
    </div>
    }
  </Card>
  )
}

export default ConnectionCard