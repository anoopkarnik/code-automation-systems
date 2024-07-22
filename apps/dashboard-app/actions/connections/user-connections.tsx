'use server'
import {  getConnectionByUser} from '@repo/prisma-db/repo/user'

import { updateConnection,deleteConnection, deleteNotionDb } from '@repo/prisma-db/repo/connection'
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
    if (conn.type === 'Notion') {
        await deleteNotionDb(id);
    }
    return conn;
}