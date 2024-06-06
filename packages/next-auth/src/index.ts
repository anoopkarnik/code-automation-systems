import bcrypt from 'bcrypt';
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";

import { PrismaAdapter } from '@next-auth/prisma-adapter';
import db from '@repo/prisma-db/client';

export const NEXT_AUTH = {
    session: {
        strategy: "jwt",
    },
    adapter: PrismaAdapter(db),
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_PROVIDER_CLIENT_ID || "",
            clientSecret: process.env.GOOGLE_PROVIDER_CLIENT_SECRET || "",
            profile(profile) {
                return({
                    id: profile.sub,
                    name: `${profile.given_name} ${profile.family_name}`,
                    email: profile.email,
                    image: profile.picture,
                    role: profile.role? profile.role : "user"
                })
            }
        }),
        GithubProvider({
            clientId: process.env.GITHUB_PROVIDER_CLIENT_ID || "",
            clientSecret: process.env.GITHUB_PROVIDER_CLIENT_SECRET || "",
            profile(profile) {
                return({
                    id: profile.id.toString(),
                    name: profile.name ?? profile.login,
                    email: profile.email,
                    image: profile.avatar_url,
                    role: profile.role? profile.role : "user"
                })
            }
        
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        async jwt ({token,user}:any){
            return { ...token, ...user }
        },
        async session({session,token}:any){
            session.user.role = token.role
            return session
        }
    }
}