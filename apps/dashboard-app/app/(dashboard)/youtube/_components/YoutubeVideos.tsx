'use client'

import React, {  useContext, useEffect, useState } from 'react'

import { useSession } from 'next-auth/react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@repo/ui/molecules/shadcn/Card'
import { Button } from '@repo/ui/molecules/shadcn/Button'
import { ConnectionsContext } from '../../../../providers/connections-provider'
import {  queryNotionDatabaseAction } from '../../../../actions/notion/notion'
import Image from 'next/image'
import { format } from 'date-fns'
import Modal from './Modal'
import { Checkbox } from '@repo/ui/molecules/shadcn/Checkbox'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@repo/ui/molecules/shadcn/Tooltip'
import { modifyNotionPageAction } from '../../../../actions/connections/youtube-connections'
import { useRouter, useSearchParams } from 'next/navigation'

const YoutubeVideos = ({filterOption}:{filterOption:string}) => {
    const params = useSearchParams();
    const channelId = params.get('channelId')
    const [cards, setCards] = useState<any[]>([])
    const [hasMore, setHasMore] = useState<boolean>(true)
    const [nextCursor, setNextCursor] = useState<string | null>(null)
    const session = useSession()
    const userId = session?.data?.user?.id
    const connectionsContext = useContext(ConnectionsContext)
    const videosDbId = connectionsContext?.notionNode?.videosDb?.id
    const apiToken = connectionsContext?.notionNode?.accessToken
    const [selectedVideo, setSelectedVideo] = useState<string | null>(null)
    const [watched, setWatched] = useState<any>();
    const [liked, setLiked] = useState<any>();
    const router = useRouter()

    const fetchCards = async (cursor:string | null) => {
        if (!userId || !videosDbId || !apiToken) return
        const sorts = [{name: 'publishedAt', type: 'date', direction: 'descending'}]
        const filters:any = []
        if (channelId) {
          filters.push({
            name: 'channelId',
            type: 'rich_text',
            condition: 'equals',
            value: channelId
          })
        }
        if (filterOption === 'watched'){
          filters.push({
            name: 'Watched',
            type: 'number',
            condition: 'equals',
            value: 1
          })
        }
        else if (filterOption === 'liked'){
          filters.push({
            name: 'Liked',
            type: 'number',
            condition: 'equals',
            value: 1
          })
        }
        else if (filterOption === 'not watched'){
          filters.push({
            name: 'Watched',
            type: 'number',
            condition: 'equals',
            value: 0
          })
        }
        const response = await queryNotionDatabaseAction({apiToken,database_id:videosDbId,filters,sorts,cursor})
        setCards( response.results)
        setHasMore(response.has_more)
        setNextCursor(response.next_cursor)

    }

    useEffect(() => {
      if (!userId || !videosDbId || !apiToken) return
      console.log('fetching cards')
        fetchCards(null)  
    },[channelId,filterOption])

    const loadMore = () => {
      if (hasMore) {
          fetchCards(nextCursor)
      }
    }

    const handleViewVideo = (videoId: string) => {
      setSelectedVideo(videoId)
    }
  
    const closeModal = () => {
      setSelectedVideo(null)
    }

    const handleWatched = async (card:any) =>{
      let status = card.Status === 'Not Started' ? 'Watched' : 'Not Started'
      let properties:any = [
        {
          "name" : "Status",
          "type" : "status",
          "value": status
        }
      ]
      await modifyNotionPageAction({apiToken,page_id:card.id,properties})
      setCards([])
      await fetchCards(null)  
    }

    const handleLiked = async (card:any) =>{
      let status = card.Status === 'Rewatchable' ? 'Watched' : 'Rewatchable'
      let properties:any = [
        {
          "name" : "Status",
          "type" : "status",
          "value": status
        }
      ]
      await modifyNotionPageAction({apiToken,page_id:card.id,properties})
      setCards([])
      await fetchCards(null)  
    }

  return (
    <>
    {hasMore && (
        <div className='flex justify-center mb-4'>
            <Button onClick={loadMore}>Next Page</Button>
        </div>
    )}
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6' >
        {cards.length > 0 && (
          cards.map((card:any) => (
            <Card key={card.id} className='overflow-hidden flex flex-col'>
              <CardHeader>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                    <CardTitle className='text-lg font-bold truncate'>{card.Name}</CardTitle>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className='text-sm'>{card.Name}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                  
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
              <CardFooter className='flex flex-col items-center p-4 gap-2'>
                  <CardDescription> {format(card.publishedAt, 'dd MMMyy')}</CardDescription>
                  <div className='w-full flex items-center justify-center gap-4'>
                    <Button onClick={() => handleViewVideo(card.videoId)} >View Video</Button>
                    <div className='flex flex-col gap-1'>
                      <div className='flex items-start justify-start gap-2'>
                        <Checkbox id="terms" checked={card.Watched ? true : false}
                            onCheckedChange={()=>{
                            handleWatched(card)
                          }}/>
                        <p className='text-xs '>Watched</p>
                      </div>
                      <div className='flex items-start justify-start gap-2'>
                        <Checkbox id="terms" checked={card.Liked ? true : false}
                         onCheckedChange={()=>{
                            handleLiked(card)
                         }}/>
                        <p className='text-xs '>Liked</p>
                      </div>
                    </div>
                  </div>
              </CardFooter>
          </Card>
          )))}
    </div>

    <Modal show={!!selectedVideo} onClose={closeModal}>
        {selectedVideo && (
          <iframe
            width="560"
            height="315"
            src={`https://www.youtube.com/embed/${selectedVideo}`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        )}
      </Modal>
    </>
  )
}

export default YoutubeVideos