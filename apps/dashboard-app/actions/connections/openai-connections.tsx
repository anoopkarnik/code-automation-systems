'use server'

import { createOpenAI,getOpenAIByAPIKey,getOpenAIByUserId } from '@repo/prisma-db/repo/openAi'

interface Props {
    apiKey: string,
    userId: string
}

export const onOpenAIConnection = async ({apiKey,userId}:Props) => {
        if(apiKey){
            const openai_connected = await getOpenAIByAPIKey(apiKey)
            if (!openai_connected){
                await createOpenAI({apiKey,openai_connected, userId})
            }
        }
    
    }

export const getOpenAIConnection = async (userId: string) => {
    const connection = await getOpenAIByUserId(userId)
    return connection
}