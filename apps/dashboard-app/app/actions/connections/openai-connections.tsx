'use server'

import { createConnection, getConnectionByAPIKey, getConnectionsByUserAndType } from '@repo/prisma-db/repo/connection'


export const createOpenAIConnection = async ({apiKey,userId}:any) => {
    if(!apiKey) return {error: "API Key not present in the query"}
    const openai_connected = await getConnectionByAPIKey(apiKey)
    if (openai_connected) return {success: "OpenAI Connection already exists"}
    const openai = await createConnection({apiKey,type:'OpenAI', userId})
    if(!openai) return {error: "OpenAI Connection not created successfully"}
    return {
        success: "OpenAI Connection created successfully",
        result: openai
    }

}

export const getOpenAIConnection = async (userId: string) => {
    if(!userId) return {error: "User Id not present in the query"}
    const connection = await getConnectionsByUserAndType(userId, 'OpenAI')
    return connection
}