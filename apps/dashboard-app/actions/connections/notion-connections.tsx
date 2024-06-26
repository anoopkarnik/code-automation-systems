'use server'

import { createNotion, getNotionByAccessToken, getNotionByUserId } from '@repo/prisma-db/repo/notion'

interface notionProps {
    access_token: any,
    notion_connected: any,
    workspace_id: any,
    workspace_icon: any,
    workspace_name: any,
    database_id: any,
    userId: any
}

export const onNotionConnection = async ({access_token, notion_connected, workspace_id, workspace_icon, workspace_name, 
    database_id, userId}: notionProps) => {
        if(access_token){
            const notion_connected = await getNotionByAccessToken(access_token)
            if (!notion_connected){
                await createNotion({access_token, notion_connected, workspace_id, workspace_icon, workspace_name,
                     database_id, userId})
            }
        }
    
    }

export const getNotionConnection = async (userId: string) => {
    const connection = await getNotionByUserId(userId)
    return connection
}