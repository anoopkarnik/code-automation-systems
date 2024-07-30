'use server'

import { createConnection, getConnectionByAccessToken, getConnectionByUserIdAndTypeAndName, getConnectionsByUserAndType } from '@repo/prisma-db/repo/connection'
import axios from 'axios'
import { getNotionConnection } from './notion-connections'
import { createNotionPageAction, queryAllNotionDatabaseAction } from '../notion/notion'
import { delay } from '../../lib/utils'
import { modifyNotionPage } from '@repo/notion/notion-client'

const MAX_RETRIES = 3;
const RETRY_DELAY = 1000;

export const onYoutubeConnection = async ({access_token, refresh_token, scopes, userId}: any) => {
    if(access_token && userId){
        console.log('Access Token', access_token)
        const connected = await getConnectionByAccessToken(access_token)
        if (connected) return {success: "Youtube Connection already exists"}
        const youtube:any = await createConnection({type:'Youtube', accessToken: access_token, refreshToken:refresh_token, scopes, userId})
        if(!youtube) return {error: "Youtube Connection not created successfully"}
        return {success: "Youtube Connection created successfully", result: youtube}
    
    }
    return null
}

export const getYoutubeConnection = async (userId: string) => {
    console.log('User Id', userId)
    const connections = await getConnectionsByUserAndType(userId, 'Youtube')
    let result:any = []
    connections?.forEach((conn: any) => {
        result.push({id: conn.id, name: conn.name, icon: '',access_token: conn.accessToken, refresh_token: conn.refreshToken, scopes: conn.scopes})
    })
    return result
}

export const getAndUpdateChannels = async (userId:string,name:string) =>{
        const connection = await getConnectionByUserIdAndTypeAndName(userId, 'Youtube', name)
        if (!connection) return {error: "Youtube Connection not found"}
        const refreshToken = connection.refreshToken
        if (!refreshToken) return {error: "Refresh Token not found for this Youtube Connection"}
        const accessToken = await getAccessTokenByRefreshToken(refreshToken)
        if (!accessToken) return {error: "Access Token not refreshed from Refresh Token of this Youtube Connection"}
        const notions:any = await getNotionConnection(userId)
        const notion = notions[0]
        if (!notion) return {error: "Notion Connection not found"}
        if (!notion.notionDb.channelsDb) return {error: "Channels Database not updated in Notion Connection"}
        let channelsDbId = notion.notionDb.channelsDb.id
        const youtubeChannels = await getChannels(accessToken)
        if (!youtubeChannels) return {error: "Youtube Channels not fetched via Youtube data API"}
        const youtubeChannelsDb = await createYoutubeChannnels({apiToken: notion.accessToken, dbId: channelsDbId, channels: youtubeChannels, youtubeAccountName:name})
        return {success: "Youtube Channels updated in Notion Database", result: youtubeChannelsDb}
}

export const getAndUpdateVideos = async (userId:string,name:string) =>{
    const connection = await getConnectionByUserIdAndTypeAndName(userId, 'Youtube', name)
    if (!connection) return {error: "Youtube Connection not found"}
    const refreshToken = connection.refreshToken
    if (!refreshToken) return {error: "Refresh Token not found for this Youtube Connection"}
    const accessToken = await getAccessTokenByRefreshToken(refreshToken)
    if (!accessToken) return {error: "Access Token not refreshed from Refresh Token of this Youtube Connection"}
    const notions:any = await getNotionConnection(userId)
    const notion = notions[0]
    if (!notion) return {error: "Notion Connection not found"}
    if (!notion.notionDb.videosDb) return {error: "Videos Database not updated in Notion Connection"}
    let videosDbId = notion.notionDb.videosDb.id
    if (!notion.notionDb.channelsDb) return {error: "Channels Database not updated in Notion Connection"}
    let channelsDbId = notion.notionDb.channelsDb.id
    const channelsDb = await queryAllNotionDatabaseAction({apiToken: notion.accessToken, database_id: channelsDbId})
    if (!channelsDb) return {error: "Channels Database not fetched from Notion Connection"}
    for (let channel of channelsDb.results){
        const youtubeVideos = await getVideos(accessToken, channel.uploadId)
        const youtubeVideosDb = await createVideos({apiToken: notion.accessToken, dbId: videosDbId, videos: youtubeVideos,channelId:channel.id})
        break
    }
    return {success: "Youtube Channel Videos updated in Notion Database"}
}

export const getChannels = async (access_token: string): Promise<any[]> => {
    const results: any[] = [];
    const baseUrl = 'https://www.googleapis.com/youtube/v3';
    const headers = { Authorization: `Bearer ${access_token}` };
  
    try {
      let nextPageToken: string | undefined;
      do {
        // Fetch subscriptions
        const subscriptionsUrl = `${baseUrl}/subscriptions?part=snippet&mine=true&maxResults=50${nextPageToken ? `&pageToken=${nextPageToken}` : ''}`;
        const subscriptionsResponse = await fetch(subscriptionsUrl, { headers });
        if (!subscriptionsResponse.ok) throw new Error(`HTTP error! status: ${subscriptionsResponse.status}`);
        const subscriptionsData = await subscriptionsResponse.json();
  
        // Fetch channel details in batches
        const channelIds = subscriptionsData.items.map((item: any) => item.snippet.resourceId.channelId).join(',');
        const channelsUrl = `${baseUrl}/channels?part=snippet,statistics,contentDetails&id=${channelIds}`;
        const channelsResponse = await fetch(channelsUrl, { headers });
        if (!channelsResponse.ok) throw new Error(`HTTP error! status: ${channelsResponse.status}`);
        const channelsData = await channelsResponse.json();
  
        // Process and store results
        subscriptionsData.items.forEach((subscription: any) => {
          const channel = channelsData.items.find((c: any) => c.id === subscription.snippet.resourceId.channelId);
          if (channel) {
            results.push({
              id: subscription.id,
              name: subscription.snippet.title,
              description: subscription.snippet.description,
              imageId: subscription.snippet.thumbnails.high.url,
              channelId: subscription.snippet.resourceId.channelId,
              publishedAt: channel.snippet.publishedAt,
              totalVideos: channel.statistics.videoCount,
              totalSubscribers: channel.statistics.subscriberCount,
              totalViews: channel.statistics.viewCount,
              uploadId: channel.contentDetails.relatedPlaylists.uploads
            });
          }
        });
  
        nextPageToken = subscriptionsData.nextPageToken;
      } while (nextPageToken);
  
      return results;
    } catch (error) {
      console.error('Error fetching channels:', error);
      throw error;
    }
  };

export const createYoutubeChannnels = async ({apiToken, dbId, channels,youtubeAccountName}:any) => {
    let results:any = []
    for (let channel of channels){
        let properties:any = [
            {name: 'Name', type:'title', value: channel.name},
            {name: 'Description', type:'text', value: channel.description},
            {name: 'imageId', type: 'file_url', value: channel.imageId},
            {name: 'channelId', type: 'text', value: channel.channelId },
            {name: 'publishedAt', type: 'date', value: channel.publishedAt},
            {name: 'videosCount', type: 'number', value: Number(channel.totalVideos)},
            {name: 'Subscribers', type: 'number', value: Number(channel.totalSubscribers)}, 
            {name: 'Views', type: 'number', value: Number(channel.totalViews)},
            {name: 'uploadId', type: 'text', value: channel.uploadId},
            {name: 'Author', type: 'text', value: channel.name},
            {name: 'Account', type: 'text', value: youtubeAccountName}
        ]
        let result = await createNotionPageAction({apiToken, dbId, properties})
        results.push(result)
    }   
    return results
}

export const getVideos = async (access_token: string, uploadId: string): Promise<any[]> => {
    const results: any[] = [];
    const baseUrl = 'https://www.googleapis.com/youtube/v3';
    const headers = { Authorization: `Bearer ${access_token}` };

    let nextPageToken: string | undefined;
    do {
        let retries = 0;
        while (retries < MAX_RETRIES) {
            try {
                // Fetch videos
                const videosUrl = `${baseUrl}/playlistItems?part=snippet&playlistId=${uploadId}&maxResults=50${nextPageToken ? `&pageToken=${nextPageToken}` : ''}`;
                const videosResponse = await fetch(videosUrl, { headers });
                if (!videosResponse.ok) throw new Error(`HTTP error! status: ${videosResponse.status}`);
                const videosData = await videosResponse.json();

                videosData.items.forEach((video: any) => {
                    results.push({
                        title: video.snippet.title,
                        channelId: video.snippet.channelId,
                        description: video.snippet.description,
                        imageId: video.snippet.thumbnails.high.url,
                        videoId: video.snippet.resourceId.videoId,
                        publishedAt: video.snippet.publishedAt,
                        channelTitle: video.snippet.channelTitle
                    });
                });
                nextPageToken = videosData.nextPageToken;
                break; // Success, exit retry loop
            } catch (error) {
                console.error(`Error fetching videos (attempt ${retries + 1}):`, error);
                if (retries === MAX_RETRIES - 1) {
                    throw error; // Throw error on last retry
                }
                retries++;
                await delay(RETRY_DELAY);
            }
        }
    } while (nextPageToken);

    return results;
};

export const createVideos = async ({apiToken, dbId, videos,channelId}:any) => {
    let results:any = []
    for (let video of videos){
        let properties:any = [
            {name: 'Name', type:'title', value: video.title},
            {name: 'imageId', type: 'file_url', value:  video.imageId},
            {name: 'channelId', type: 'text', value: video.channelId },
            {name: 'publishedAt', type: 'date', value: video.publishedAt},
            {name: 'Platform', type: 'select', value: 'Youtube'},
            {name: 'Status', type: 'status', value: 'Not started'},
            {name: 'URL', type: 'url', value: `https://www.youtube.com/watch?v=${video.videoId}`},
            {name: 'videoId', type: 'text', value: video.videoId},
            {name: 'Channel', type: 'text', value: video.channelTitle},
            {name: 'Youtube Channels', type: 'relation', value: [channelId]}
        ]
        let result = await createNotionPageAction({apiToken, dbId, properties})
        results.push(result)
    }   
    return results
}

const getAccessTokenByRefreshToken = async (refresh_token: string) => {
    try{
        const url = 'https://oauth2.googleapis.com/token'
        const data = {
            client_id: process.env.NEXT_PUBLIC_YOUTUBE_CLIENT_ID,
            client_secret: process.env.NEXT_PUBLIC_YOUTUBE_CLIENT_SECRET,
            refresh_token,
            grant_type: 'refresh_token'
        }
        const response = await axios.post(url, data)
        return response.data.access_token
    }catch(err){
        return null
    }
}

export const modifyNotionPageAction = async ({apiToken,page_id,properties}:any) => {
    const response = await modifyNotionPage({apiToken,page_id,properties})
    console.log('Modify Notion Page Response', response)
    return response;
}