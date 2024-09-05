'use server'

import { createConnection, getConnectionByAccessTokenAndUserId, getConnectionsByUser, getConnectionsByUserAndType } from '@repo/prisma-db/repo/connection';
interface notionProps {
    access_token: string,
    notion_connected: any,
    workspace_id: any,
    workspace_icon: any,
    workspace_name: any,
    userId: any
}

export const onNotionConnection = async ({access_token, workspace_id, workspace_icon, workspace_name, userId}: any) => {
    if(!access_token) return {error: "Access Token not present in the query"}
    const notion_connected = await getConnectionByAccessTokenAndUserId(access_token,userId)
    if(notion_connected) return {success: "Notion Connection already exists"}
    const notion = await createConnection({type: 'Notion', userId, accessToken: access_token, workspaceName: workspace_name, workspaceIcon: workspace_icon, workspaceId: workspace_id})
    if(!notion) return {error: "Notion Connection not created successfully"}
    return {
        success: "Notion Connection created successfully",
        result: notion
    }
}

export const getNotionConnection = async (userId: string) => {
    if(!userId) return {error: "User Id not present in the query"}
    const connection = await getConnectionsByUserAndType(userId, 'Notion')
    return connection
}