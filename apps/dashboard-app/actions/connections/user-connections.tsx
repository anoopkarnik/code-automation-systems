'use server'
import {  getConnectionByUser} from '@repo/prisma-db/repo/user'
export const getUserInfo = async (userId: string) => {
    const user_info:any = await getConnectionByUser (userId);
    return user_info;
}