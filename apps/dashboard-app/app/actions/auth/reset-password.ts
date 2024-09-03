"use server"

import db from "@repo/prisma-db/client"
import { getResetTokenByToken } from "@repo/prisma-db/repo/forgot-password"
import bcrypt from "bcryptjs"


export const resetPassword = async (token:string,password:string) =>{
    const tokenObj = await getResetTokenByToken(token);
    if (!tokenObj){
        return {error: "Token doesn't exist!"}
    }
    const email = tokenObj.email;
    const hashedPassword = await bcrypt.hash(password, 10);
    await db.user.update({
        where: {email},
        data: {
            password: hashedPassword
        }
    })
    await db.resetPasswordToken.deleteMany({
        where: { email}
    })
    return {success: "Password reset!"}

}