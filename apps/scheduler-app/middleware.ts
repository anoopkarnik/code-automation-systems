import authConfig from "@repo/next-auth/config"

import NextAuth from "next-auth";
import {NextResponse} from "next/server";

import {publicRoutes,authRoutes,apiAuthPrefix,DEFAULT_LOGIN_REDIRECT} from "./routes"

const { auth }:any = NextAuth(authConfig);

export default auth((req:any)=>{
    const { nextUrl} = req;
    const isLoggedIn = !!req.auth
    const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
    const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
    const isAuthRoute = authRoutes.includes(nextUrl.pathname);

    if (isApiAuthRoute){
        return NextResponse.next();
    }

    if (isAuthRoute){
        if (isLoggedIn){
            return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT,nextUrl));
        }
        return NextResponse.next();
    }

    if (!isLoggedIn && !isPublicRoute){
        return Response.redirect(new URL('/auth/login',nextUrl));
    }

    return NextResponse.next();
})

export const config = {
    matcher: ['/((?!.+\\.[\\w]+$|_next).*)','/','/(api|trpc)(.*)'],
}