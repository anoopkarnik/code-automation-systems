"use client"
import LoginCard from '@repo/ui/components/LoginCard';
import { Button } from '@repo/ui/components/ui/Button';
import { signIn,useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { login } from '../ actions/login';
import { DEFAULT_LOGIN_REDIRECT } from '../routes';


export default function() {
    const router = useRouter();
    const searchParams = useSearchParams()
    const urlError = searchParams.get('error') === "OAuthAccountNotLinked" ?
     "Email already in use with different provider" : "Some error occured. Please try again. or contact support"
    return (
        <LoginCard
            showEmail={true}
            showGithubProvider={true}
            showGoogleProvider={true}
            onEmailSubmit={login}
            onGithubProviderSubmit={async ()=>{
                await signIn('github',{callbackUrl: DEFAULT_LOGIN_REDIRECT});
            }}
            onGoogleProviderSubmit={async ()=>{
                await signIn('google',{callbackUrl: DEFAULT_LOGIN_REDIRECT});
            }}
            backFunction={()=>{router.push('/auth/register')}}
            errorMessage={urlError}
        />
    )
}