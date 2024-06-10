
import NextAuth from "next-auth"

import db from '@repo/prisma-db/client'
import authConfig from "./auth.config"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { getUserById } from "@repo/prisma-db/repo/user"

 
export const { auth, handlers, signIn, signOut }:any = NextAuth({
    adapter: PrismaAdapter(db),
    session: { strategy: 'jwt'},
    ...authConfig,
    pages:{
        signIn: '/auth/login',
        error: '/auth/error',
    },
    callbacks:{
        async signIn({user,account}){
            //allow loging it it is not credentials provider
            if(account?.provider !=='credentials')return true;
            const existingUser = await getUserById(user?.id!);

            //prevent login if email is not verified
            if (!existingUser?.emailVerified) return false;
            return true;
        },
        async session({session,token}){
            if (token.sub && session.user){
                session.user.id = token.sub
            }
            if (token.role && session.user){
                // @ts-ignore
                session.user.role = token.role;
            }
            return session;
        },
        async jwt({token}){
            if(!token.sub) return token;
            const existingUser = await getUserById(token.sub);
            if (!existingUser) return token;
            token.role = existingUser.role;
            return token;
        }
    }
})