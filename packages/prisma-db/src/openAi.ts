import db from './index'

interface openAIProps {
    apiKey: string,
    openai_connected: any,
    userId: string
}

export const getOpenAIByAPIKey = async (apiKey: string) => {
    if(apiKey){
        const connected = await db.openAI.findFirst({
            where:{
                apiKey: apiKey,
            },
            include:{
                connections: {
                    select: {
                        type: true
                    }
                }
            }
        })
        return connected;
    }
}

export const createOpenAI = async ({apiKey, openai_connected,userId}:openAIProps) =>{
        if (apiKey && !openai_connected){
            await db.openAI.create({
                data:{
                    userId: userId,
                    apiKey: apiKey,
                    connections: {
                        create: {
                            userId: userId,
                            type: "OpenAI"
                        }
                    }
                }
            })
        }
    }

export const getOpenAIByUserId = async (userId: string) => {
    const connection = await db.openAI.findFirst({
        where:{
            userId
        }
    })
    return connection
}