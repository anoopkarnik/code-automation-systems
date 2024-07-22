'use server'

import { createYoutube, getYoutubeByAccessToken, getYoutubeByUserId } from '@repo/prisma-db/repo/youtube'


export const onYoutubeConnection = async ({access_token, refresh_token, scopes, userId}: any) => {
    if(access_token){
        const connected = await getYoutubeByAccessToken(access_token)
        if (!connected){
            const youtube = await createYoutube({name:'My Youtube Account', access_token, refresh_token, scopes, userId})   
        }
    }

}

export const getYoutubeConnection = async (userId: string) => {
    const connection = await getYoutubeByUserId(userId)
    return connection
}