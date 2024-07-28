'use server'

import { createConnection, getConnectionByAccessToken, getConnectionsByUserAndType } from '@repo/prisma-db/repo/connection'
import axios from 'axios'
import { getNotionConnection } from './notion-connections'
import { createNotionPageAction } from '../notion/notion'
import { delay } from '../../lib/utils'

const MAX_RETRIES = 3;
const RETRY_DELAY = 1000;

export const onYoutubeConnection = async ({access_token, refresh_token, scopes, userId}: any) => {
    if(access_token && userId){
        console.log('Access Token', access_token)
        const connected = await getConnectionByAccessToken(access_token)
        if (!connected){
            const notions:any = await getNotionConnection(userId)
            const notion = notions[0]
            if (!notion) return null
            if (!notion.notionDb.channelsDb) return null
            if (!notion.notionDb.videosDb) return null
            let channelsDbId = notion.notionDb.channelsDb.id
            let videosDbId = notion.notionDb.videosDb.id
            const youtube:any = await createConnection({type:'Youtube', accessToken: access_token, refreshToken:refresh_token, scopes, userId})
            const youtubeChannels = await getChannels(access_token)
            const youtubeChannelsDb = await createYoutubeChannnels({apiToken: notion.accessToken, dbId: channelsDbId, channels: youtubeChannels, youtube})
            for ( let channel of youtubeChannelsDb){
                const youtubeVideos = await getVideos(access_token, channel.uploadId)
                const youtubeVideosDb = await createVideos({apiToken: notion.accessToken, dbId: videosDbId, videos: youtubeVideos,channelId:channel.id})
            }
            return youtube;
        }
    }
    return null
}

export const getYoutubeConnection = async (userId: string) => {
    const connections = await getConnectionsByUserAndType(userId, 'Youtube')
    let result:any = []
    connections?.forEach((conn: any) => {
        result.push({id: conn.id, name: conn.name, icon: '',access_token: conn.accessToken, refresh_token: conn.refreshToken, scopes: conn.scopes})
    })
    return result
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

export const createYoutubeChannnels = async ({apiToken, dbId, channels,youtube}:any) => {
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
            {name: 'Account', type: 'text', value: youtube.name}
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
            {name: 'Channel', type: 'text', value: video.channelTitle},
            {name: 'Youtube Channels', type: 'relation', value: [channelId]}
        ]
        let result = await createNotionPageAction({apiToken, dbId, properties})
        results.push(result)
    }   
    return results
}