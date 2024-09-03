'use client'

import React, {  useContext, useEffect, useState } from 'react'

import { useSession } from 'next-auth/react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@repo/ui/molecules/shadcn/Card'
import { Button } from '@repo/ui/atoms/shadcn/Button'
import { ConnectionsContext } from '../../../../providers/connections-provider'
import { queryAllNotionDatabaseAction } from '../../../actions/notion/notion'
import Image from 'next/image'
import LoadingCard from '@repo/ui/organisms/auth/LoadingCard'

const YoutubeChannels= ({changeTab}:{changeTab: (value:string, channelId: string)=> void}) => {
    const [cards, setCards] = useState<any>([])
    const session = useSession()
    const userId = session?.data?.user?.id
    const connectionsContext = useContext(ConnectionsContext)
    const channelsDbId = connectionsContext?.notionNode?.channelsDb?.id
    const apiToken = connectionsContext?.notionNode?.accessToken
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const updateCards = async () => { 
            if (!userId || !channelsDbId || !apiToken) return
            setLoading(true)
            let filters:any = []
            let sorts:any = []
            const channels = await queryAllNotionDatabaseAction({apiToken,database_id:channelsDbId,filters,sorts})
            setCards(channels.results)
            setLoading(false)
        }
        updateCards()        
    },[userId,channelsDbId,apiToken])

    const handleViewChannel = (card: any) => {
      changeTab('Videos',card.channelId)
    }

  if (loading) return <div>
    <LoadingCard title='Youtube Channels' description='Loading Subscribed Channels from your Youtube Account'/>
  </div>


  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mx-6' >
        {cards.length > 0 && (
          cards.map((card:any) => (
            <Card key={card.id} className='overflow-hidden flex flex-col'>
              <CardHeader>
                <CardTitle className='text-lg font-bold truncate'>{card.Name}</CardTitle>
                <CardDescription className="text-sm">
                  
                    {card.Watched}/{card.videosCount} videos watched
                </CardDescription>
              </CardHeader>
              <CardContent className='p-0 flex-grow'>
                  <div className="relative w-full pt-[80.25%] border border-border">
                      <Image 
                          src={card.imageId} 
                          alt={card.Name} 
                          layout="fill" 
                          objectFit="cover"
                          className="absolute top-0 left-0"
                      />
                    </div>

              </CardContent>
              <CardFooter className='flex flex-col items-center p-4'>
                {/* <CardDescription>{card.Description.substring(0,200) }.........</CardDescription> */}
                <Button onClick={() => handleViewChannel(card)}>View Channel</Button>
              </CardFooter>
            </Card>
          )))}
    </div>
  )
}

export default YoutubeChannels