"use server"

import db from "@repo/prisma-db/client"
import { getResetTokenByToken } from "@repo/prisma-db/repo/forgot-password"
import { getUserByEmail } from "@repo/prisma-db/repo/user"
import bcrypt from "bcryptjs"


export const resetPasswordSettings = async (email:string, currentPassword:string,
    newPassword:string) =>{
        const user = await getUserByEmail(email);
        if (!user) {
            return {error: "User not found!"}
        }
        if (!user.password) {
            return {error: "No password for this account!"}
        }
        const passwordsMatch = await bcrypt.compare(currentPassword, user.password);
        if (!passwordsMatch) {
            return {error: "Incorrect Password!"}
        }
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await db.user.update({
            where: {email},
            data: {
                password: hashedPassword
            }
        })
        return {success: "Password Updated!"}
}