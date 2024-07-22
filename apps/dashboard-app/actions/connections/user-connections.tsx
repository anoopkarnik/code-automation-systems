'use server'
import {  getConnectionByUser} from '@repo/prisma-db/repo/user'

import { updateConnection,deleteConnection, deleteYoutubeConnection, deleteNotionConnection, deleteOpenAIConnection } from '@repo/prisma-db/repo/connection'
export const getUserInfo = async (userId: string) => {
    const user_info:any = await getConnectionByUser(userId);
    return user_info;
}

export const updateConnectionById = async (id: string, name: string) => {
    const conn = await updateConnection(id,name);
    return conn;
}

export const deleteConnectionById = async (id: string) => {
    const conn = await deleteConnection(id);
    if (conn.type === 'Youtube') {
        await deleteYoutubeConnection(conn.youtubeId as string);
    }
    else if (conn.type === 'OpenAI') {
        await deleteOpenAIConnection(conn.openaiId as string);
    }
    else if (conn.type === 'Notion') {
        await deleteNotionConnection(conn.notionId as string);
    }
    return conn;
}