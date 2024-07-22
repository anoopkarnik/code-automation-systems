import React, { use, useEffect, useState } from 'react'

import { set } from 'date-fns'
import { Card, CardDescription, CardHeader, CardTitle } from '@repo/ui/molecules/shadcn/Card'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@repo/ui/molecules/shadcn/Button'

import { Dialog,DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@repo/ui/molecules/shadcn/Dialog'
import AddConnectionsModal from './AddConnectionModal'


const ConnectionCard = ({connection}:any) => {

  const [appType, setAppType] = useState(connection.title)
  const [callbackUrl, setCallbackUrl] = useState('')
  const [oauthUrl, setOauthUrl] = useState('')  

  useEffect(() => {
    setAppType(connection.title)
    if (connection.title === 'OpenAI'){
      setCallbackUrl(process.env.NEXT_PUBLIC_URL+'/api/callback/openai')
      setOauthUrl('')
    }
    else if (connection.title === 'Notion'){
      setCallbackUrl('')
      setOauthUrl(process.env.NEXT_PUBLIC_NOTION_OAUTH_URL as string) 
    }
    else if (connection.title === 'Youtube'){
      setCallbackUrl(process.env.NEXT_PUBLIC_URL+'/api/callback/youtube')
      setOauthUrl(process.env.NEXT_PUBLIC_YOUTUBE_OAUTH_URL as string)
    }
  },[connection.title])

  return (
    <Card className="flex flex-col items-center justify-between ">
    <CardHeader className="flex flex-col items-center justify-center gap-2">
      <div className="flex flex-row gap-2">
        <Image src={connection.image} alt={connection.title} height={30} width={30}className="object-contain"/>
      </div>
      <div className='flex flex-col gap-4'>
        <CardTitle className="text-center text-lg">{connection.title}</CardTitle>
        <CardDescription className='min-w-[400px] max-w-[400px] text-center'>{connection.description}</CardDescription>
      </div>
    </CardHeader>
    { connection.published && <Button className="flex flex-col items-center gap-2 p-4 mx-4 mb-4">
     { connection.showModal? (
        <Dialog>
          <DialogTrigger>
            <div className=" rounded-lg px-3 py-2 font-bold text-white ">
              Connect
            </div>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className='flex text-4xl gap-4'>
                <Image src={connection.image} alt={connection.title} height={30} width={30} className="object-contain"/>
                <div>{connection.title}</div>
              </DialogTitle>
              <DialogDescription className='py-4 '>{connection.description}</DialogDescription>
            </DialogHeader>
            <AddConnectionsModal formElements={connection.formElements || []} callback_url={callbackUrl as string}/>
          </DialogContent>
        </Dialog>
      ):(
    <Link href={oauthUrl || ''} className=" rounded-lg bg-primary p-2 font-bold text-primary-foreground">
      Connect
    </Link>)}
    </Button>}
    {!connection.published && 
    <Button className="flex flex-col items-center gap-2 p-4 mx-4 mb-4">
      In Progress
    </Button> 
    }
  </Card>
  )
}

export default ConnectionCard