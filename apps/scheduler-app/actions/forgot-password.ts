"use server"

import { getResetTokenByEmail, getResetTokenByToken,createResetToken } from '@repo/prisma-db/repo/forgot-password';
import db from '@repo/prisma-db/client';
import { sendResetEmail } from '@repo/resend-email/mail';
import { get } from 'http';
import { getUserByEmail } from '@repo/prisma-db/repo/user';

export const ForgotPassword = async (email: string) => {
    const existingEmail = await getUserByEmail(email);
    if (!existingEmail){
        return {error: "Email doesn't exist!"}
    }
    try{
        const newToken = await createResetToken(email);
        await sendResetEmail(email, newToken.token);
        return {success: "Email with Reset Token sent!"}
    }
    catch (error){
        return {error: "Something went wrong!"}
    }

}