"use server";

import { RegisterSchema } from '@repo/zod/index';
import * as z from 'zod';
import bcrypt from 'bcrypt';
import db from '@repo/prisma-db/client';
import { getUserByEmail } from '@repo/prisma-db/repo';

export const register = async (values:z.infer<typeof RegisterSchema>) =>{
    const validatedFields = RegisterSchema.safeParse(values);
    if (!validatedFields.success) {
        return {error: "Invalid Fields! Please check your inputs and try again."}
    }

    const { email,password,name} = validatedFields.data;
    const hashedPassword = await bcrypt.hash(password, 10);

    const existingUser = await getUserByEmail(email);
    
    if (existingUser) {
        return {error: "Email Already Taken!"}
    }
    await db.user.create({
        data:{
            email,
            password: hashedPassword,
            name
        }    
    })


    return {success: "User Created Successfully!"}
}