
import NextAuth from "next-auth"

import db from '@repo/prisma-db/client'
import authConfig from "./auth.config"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { getAccountByUserId, getUserById } from "@repo/prisma-db/repo/user"

 
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
            if (token.emailVerified && session.user){
                // @ts-ignore
                session.user.emailVerified = token.emailVerified;
            }
            if (token.provider && session.user){
                // @ts-ignore
                session.user.provider = token.provider;
            }
            // @ts-ignore
            session.user.createdAt = token.createdAt;
            // @ts-ignore
            session.user.updatedAt = token.updatedAt;
            return session;
        },
        async jwt({token}){
            if(!token.sub) return token;
            const existingUser = await getUserById(token.sub);
            if (!existingUser) return token;
            const account = await getAccountByUserId(existingUser.id);
            if(account){
                token.provider = account.provider;
            }
            token.role = existingUser.role;
            token.createdAt = existingUser.createdAt;
            token.updatedAt = existingUser.updatedAt;
            token.emailVerified = existingUser.emailVerified
            return token;
        }
    }
})