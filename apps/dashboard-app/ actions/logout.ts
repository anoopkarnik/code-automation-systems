"use server";

import { signOut } from '@repo/next-auth/auth';
export const logout = async () =>{

    try{
        await signOut();
    }
    catch(err){
        throw err;
    }
}