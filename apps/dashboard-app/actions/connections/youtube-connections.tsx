'use server'

import { createConnection, getConnectionByAccessToken, getConnectionsByUserAndType } from '@repo/prisma-db/repo/connection'
import axios from 'axios'
import { access } from 'fs'


export const onYoutubeConnection = async ({access_token, refresh_token, scopes, userId}: any) => {
    if(access_token){
        const connected = await getConnectionByAccessToken(access_token)
        if (!connected){
            const results = await GetChannelAndVideoIds(access_token)
            const youtube = await createConnection({type:'Youtube', accessToken: access_token, refreshToken:refresh_token, scopes, userId, results})
            return youtube;
        }
    }
    return null
}

export const GetChannelAndVideoIds = async (accessToken: string) => {
    let nextPageChannelToken = true
    let results:any = []
    while (nextPageChannelToken){
        let channels;
        if (nextPageChannelToken === true){
            channels = await fetch(`https://www.googleapis.com/youtube/v3/subscriptions?part=snippet&mine=true&maxResults=50`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })
        }
        else{
            channels = await fetch(`https://www.googleapis.com/youtube/v3/subscriptions?part=snippet&mine=true&maxResults=50&pageToken=${nextPageChannelToken}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })
        }
        const channelsJson = await channels.json()
        console.log(channelsJson)
        for (let channel of channelsJson.items){
            let nextPageToken = true
            let channelId = channel.snippet.channelId
            while (nextPageToken){
                let videos;
                if (nextPageToken === true){
                    videos = await fetch(`https://www.googleapis.com/youtube/v3/search?mine=true&maxResults=50&channelId=${channelId}`, {
                        headers: {
                            Authorization: `Bearer ${accessToken}`
                        }
                    })
                }
                else{
                    videos = await fetch(`https://www.googleapis.com/youtube/v3/searchh?channelId=${channelId}&mine=true&maxResults=50&pageToken=${nextPageToken}`, {
                        headers: {
                            Authorization: `Bearer ${accessToken}`
                        }
                    })
                }
                const videosJson = await videos.json()
                console.log(videosJson)
                for (let video of videosJson.items){
                    await results.push({channelId: channelId, videoId: video.id})
                }
                if (videosJson.nextPageToken){
                    nextPageToken = videosJson.nextPageToken
                }
                else{
                    break
                }
            }
        }
        
       
        if (channelsJson.nextPageToken){
            nextPageChannelToken = channelsJson.nextPageToken
        }
        else{
            break
        }
    }
    return results;
}


export const getYoutubeConnection = async (userId: string) => {
    const connections = await getConnectionsByUserAndType(userId, 'Youtube')
    let result:any = []
    connections?.forEach((conn: any) => {
        result.push({id: conn.id, name: conn.name, icon: '',access_token: conn.accessToken, refresh_token: conn.refreshToken, scopes: conn.scopes})
    })
    return result
}

export const getChannels = async (userId: string, selectedAccount: string) => {
    const connections = await getConnectionsByUserAndType(userId, 'Youtube')
    const clientId = process.env.NEXT_PUBLIC_YOUTUBE_CLIENT_ID
    const clientSecret = process.env.NEXT_PUBLIC_YOUTUBE_CLIENT_SECRET
    if (!connections || connections.length === 0) return []
    let account = connections.find((conn: any) => conn.name === selectedAccount)
    const refreshToken = account?.refreshToken
    const response = await axios.post(`https://oauth2.googleapis.com/token`,null, {
        params:{
            client_id: clientId,
            client_secret: clientSecret,
            refresh_token: refreshToken,
            grant_type: 'refresh_token'
        }
    })
    console.log(response.data)
    let accessToken = response.data.access_token
    let nextPageToken = true
    let results:any = []
    while (nextPageToken){
        let channels;
        if (nextPageToken === true){
            channels = await fetch(`https://www.googleapis.com/youtube/v3/subscriptions?part=snippet&mine=true&maxResults=50`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })
        }
        else{
            channels = await fetch(`https://www.googleapis.com/youtube/v3/subscriptions?part=snippet&mine=true&maxResults=50&pageToken=${nextPageToken}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })
        }
        const channelsJson = await channels.json()
        for (let channel of channelsJson.items){
            await results.push({id: channel.id, name: channel.snippet.title, description: channel.snippet.description,
                imageId: channel.snippet.thumbnails.high.url, channelId: channel.snippet.channelId})
        }
        if (channelsJson.nextPageToken){
            nextPageToken = channelsJson.nextPageToken
        }
        else{
            break
        }
    }
    return results
}

export const getVideosByChannel = async (userId: string, channelId: string) => {
    const connections = await getConnectionsByUserAndType(userId, 'Youtube')
    const clientId = process.env.NEXT_PUBLIC_YOUTUBE_CLIENT_ID
    const clientSecret = process.env.NEXT_PUBLIC_YOUTUBE_CLIENT_SECRET
    if (!connections || connections.length === 0) return []
    let account = connections[0]
    const refreshToken = account?.refreshToken
    const response = await axios.post(`https://oauth2.googleapis.com/token`,null, {
        params:{
            client_id: clientId,
            client_secret: clientSecret,
            refresh_token: refreshToken,
            grant_type: 'refresh_token'
        }
    })
    console.log(response.data)
    let accessToken = response.data.access_token
    let nextPageToken = true
    let results:any = []
    while (nextPageToken){
        let videos;
        if (nextPageToken === true){
            videos = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&type=video&maxResults=50`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })
        }
        else{
            videos = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&type=video&maxResults=50&pageToken=${nextPageToken}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })
        }
        const videosJson = await videos.json()
        for (let video of videosJson.items){
            await results.push({id: video.id.videoId, title: video.snippet.title, description: video.snippet.description,
                imageId: video.snippet.thumbnails.high.url})
        }
        if (videosJson.nextPageToken){
            nextPageToken = videosJson.nextPageToken
        }
        else{
            break
        }
    }
    return results
}