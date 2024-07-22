'use client'

import React, {  useEffect, useState } from 'react'

import { getChannels } from '../../../../actions/connections/youtube-connections'
import { useSession } from 'next-auth/react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@repo/ui/molecules/shadcn/Card'
import { Button } from '@repo/ui/molecules/shadcn/Button'

const YoutubeGallery = ({selectedAccount}:any) => {
    const [cards, setCards] = useState<any>([])
    const session = useSession()
    const userId = session?.data?.user?.id

    useEffect(() => {
        const updateCards = async () => { 
            const channels = await getChannels(userId || '',selectedAccount )

            setCards(channels)
        }
        updateCards()        
    },[userId,selectedAccount])

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4' >
        {cards.length > 0 && (
          cards.map((card:any) => (
            <Card>
              <CardHeader>
                  <CardTitle>{card.name}</CardTitle>
              </CardHeader>
              <CardContent className='flex flex-col gap-4'>
                  <img src={card.imageId} alt={card.name} height={200} width={200} className="object-contain "/>
                  <CardDescription>{card.description.substring(0,200) }.........</CardDescription>
                  <Button >View Channel</Button>
              </CardContent>
          </Card>
          )))}
    </div>
  )
}

export default YoutubeGallery