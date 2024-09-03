"use server"

import db from "@repo/prisma-db/client"

import {  getVerificationTokenByToken } from "@repo/prisma-db/repo/verification"
import { getUserByEmail } from "@repo/prisma-db/repo/user"

export const newVerification = async (token: string) =>{
    const existingToken = await getVerificationTokenByToken(token)
    if (!existingToken){
        return {error: "Token doesn't exist!"}
    }
    const hasExpired = new Date() > new Date(existingToken.expires)
    if (hasExpired){
        return {error: "Token already expired!"}
    }
    const existingUser = await getUserByEmail(existingToken.email)
    if (!existingUser){
        return {error: "Email doesn't exist!"}
    }

    await db.user.update({
        where : {id: existingUser.id},
        data: {
            emailVerified: new Date(),
            email: existingToken.email
        }
    })

    await db.verificationToken.delete({
        where: {id: existingToken.id}
    })

    return {success: "Email verified!"}

}
