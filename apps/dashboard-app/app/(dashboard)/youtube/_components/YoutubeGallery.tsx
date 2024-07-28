'use client'

import React, {  useContext, useEffect, useState } from 'react'

import { useSession } from 'next-auth/react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@repo/ui/molecules/shadcn/Card'
import { Button } from '@repo/ui/molecules/shadcn/Button'
import { ConnectionsContext } from '../../../../providers/connections-provider'
import { queryAllNotionDatabase } from '@repo/notion/notion-client'
import { queryAllNotionDatabaseAction } from '../../../../actions/notion/notion'
import Image from 'next/image'

const YoutubeGallery = () => {
    const [cards, setCards] = useState<any>([])
    const session = useSession()
    const userId = session?.data?.user?.id
    const connectionsContext = useContext(ConnectionsContext)
    const channelsDbId = connectionsContext?.notionNode?.channelsDb?.id
    const apiToken = connectionsContext?.notionNode?.accessToken

    useEffect(() => {
        const updateCards = async () => { 
            if (!userId || !channelsDbId || !apiToken) return
            const channels = await queryAllNotionDatabaseAction({apiToken,database_id:channelsDbId})
            setCards(channels.results)
            console.log(channels.results)
        }
        updateCards()        
    },[userId,channelsDbId,apiToken])

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4' >
        {cards.length > 0 && (
          cards.map((card:any) => (
            <Card>
              <CardHeader>
                  <CardTitle className='flex items-center justify-between'>
                    <div>{card.Name}</div>
                    <div>{card.videosCount}</div>
                  </CardTitle>
              </CardHeader>
              <CardContent className='flex flex-col gap-4'>
                  <Image src={card.imageId} alt={card.Name} height={200} width={200} className="object-contain "/>
                  <CardDescription>{card.Description.substring(0,200) }.........</CardDescription>
                  <Button >View Channel</Button>
              </CardContent>
          </Card>
          )))}
    </div>
  )
}

export default YoutubeGallery