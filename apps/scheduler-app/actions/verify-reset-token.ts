'use server'
import { getResetTokenByToken } from "@repo/prisma-db/repo/forgot-password";

export const verifyResetToken = async(token: string)=>{
    const existingToken = await getResetTokenByToken(token);
    if (!existingToken){
        return {error: "Token doesn't exist!"}
    }
    const hasExpired = new Date() > new Date(existingToken.expires);
    if (hasExpired){
        return {error: "Token already expired!"}
    }
    return {success: "Token verified!"}
}