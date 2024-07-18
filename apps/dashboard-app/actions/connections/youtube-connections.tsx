'use server'

import { createYoutube, getYoutubeByAccessToken, getYoutubeByUserId } from '@repo/prisma-db/repo/youtube'
import { get } from 'http'


export const onYoutubeConnection = async ({access_token, refresh_token, scopes, userId}: any) => {
    if(access_token){
        console.log('access_token in actions', access_token)
        const connected = await getYoutubeByAccessToken(access_token)
        console.log('connected', connected)
        if (!connected){
            const youtube = await createYoutube({access_token, refresh_token, scopes, userId})   
        }
    }

}

export const getYoutubeConnection = async (userId: string) => {
    const connection = await getYoutubeByUserId(userId)
    return connection
}