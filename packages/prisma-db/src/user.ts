import db from '@repo/prisma-db/client';

export const getUserByEmail = async (email: string) => {
    try {
        console.log(email)
        const user = await db.user.findFirst({ where: {email}});
        return user;
    }
    catch (error) {
        return null;
    }
}

export const getUserById= async (id: string) => {
    try {
        const user = await db.user.findUnique({ where: {id}});
        return user;
    }
    catch (error) {
        return null;
    }
}