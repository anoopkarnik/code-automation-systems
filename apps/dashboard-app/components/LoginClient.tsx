"use client"
import LoginCard from '@repo/ui/components/LoginCard';
import { Button } from '@repo/ui/components/ui/Button';
import { signIn,useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { login } from '../ actions/login';


export default function() {
    const router = useRouter();

    return (
        <LoginCard
            showEmail={true}
            showGithubProvider={true}
            showGoogleProvider={true}
            onEmailSubmit={login}
            onGithubProviderSubmit={()=>{}}
            onGoogleProviderSubmit={()=>{}}
            registerFunction={()=>{router.push('register')}}
        />
    )
}