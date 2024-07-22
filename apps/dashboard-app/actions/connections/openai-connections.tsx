'use server'

import { createConnection, getConnectionByAPIKey, getConnectionsByUserAndType } from '@repo/prisma-db/repo/connection'


export const onOpenAIConnection = async ({apiKey,userId}:any) => {
        if(apiKey){
            const openai_connected = await getConnectionByAPIKey(apiKey)
            if (!openai_connected){
                const openai = await createConnection({apiKey,type:'OpenAI', userId})
                return openai;
            }
        }
    
    }

export const getOpenAIConnection = async (userId: string) => {
    const connection = await getConnectionsByUserAndType(userId, 'OpenAI')
    return connection
}