'use server'

import { createNotion, getNotionByAccessToken, getNotionByUserId } from '@repo/prisma-db/repo/notion'

interface notionProps {
    access_token: string,
    notion_connected: any,
    workspace_id: any,
    workspace_icon: any,
    workspace_name: any,
    userId: any
}

export const onNotionConnection = async ({access_token, notion_connected, workspace_id, workspace_icon, workspace_name, 
    userId}: notionProps) => {
        if(access_token){
            const notion_connected = await getNotionByAccessToken(access_token)
            if (!notion_connected){
                await createNotion({access_token, notion_connected, workspace_id, workspace_icon, workspace_name, userId})
            }
        }
    
    }

export const getNotionConnection = async (userId: string) => {
    const connection = await getNotionByUserId(userId)
    return connection
}