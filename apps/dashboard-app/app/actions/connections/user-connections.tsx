'use server'
import {  getConnectionByUser} from '@repo/prisma-db/repo/user'

import { updateConnection,deleteConnection, deleteNotionDb, getConnectionById } from '@repo/prisma-db/repo/connection'
export const getUserInfo = async (userId: string) => {
    const user_info:any = await getConnectionByUser(userId);
    return user_info;
}

export const updateConnectionById = async (id: string, name: string) => {
    try{
        const conn = await updateConnection(id,name);
        return {
            success: `Notion Connection Name successfully updated to ${name}`,
            result: conn
        }
    }
    catch (error) {
        return {error: "Notion Connection Not not updated successfully"}
    }
}

export const deleteConnectionById = async (id: string) => {
    try{
        const conn = await getConnectionById(id);
        if (conn?.type === 'Notion') {
            await deleteNotionDb(id);
        }
        await deleteConnection(id);
        return {success: "Connection deleted successfully"}
    }
    catch (error) {
        return {error: "Connection not deleted successfully"}
    }
}