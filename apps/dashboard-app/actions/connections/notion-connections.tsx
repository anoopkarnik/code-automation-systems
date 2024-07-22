'use server'

import { createConnection, getConnectionByAccessToken, getConnectionsByUser, getConnectionsByUserAndType } from '@repo/prisma-db/repo/connection'
interface notionProps {
    access_token: string,
    notion_connected: any,
    workspace_id: any,
    workspace_icon: any,
    workspace_name: any,
    userId: any
}

export const onNotionConnection = async ({access_token, workspace_id, workspace_icon, workspace_name, userId}: any) => {
        if(access_token){
            const notion_connected = await getConnectionByAccessToken(access_token)
            if (!notion_connected){ 
                const notion = await createConnection({type: 'Notion', userId, accessToken: access_token, workspaceName: workspace_name, workspaceIcon: workspace_icon, workspaceId: workspace_id})
                return notion;
            }
        }
        return null
    }

export const getNotionConnection = async (userId: string) => {
    const connection = await getConnectionsByUserAndType(userId, 'Notion')
    return connection
}