"use client"
import LoginCard from '@repo/ui/components/LoginCard';
import { signIn} from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { login } from '../ actions/login';
import { DEFAULT_LOGIN_REDIRECT } from '../routes';


export default function() {
    const router = useRouter();
    const searchParams = useSearchParams()
    const urlError = searchParams.get('error') === "OAuthAccountNotLinked" ?
     "Email already in use with different provider" : ""
    return (
        <LoginCard
            showEmail={true}
            showGithubProvider={true}
            showGoogleProvider={true}
            showLinkedinProvider={true}
            onEmailSubmit={login}
            onGithubProviderSubmit={async ()=>{
                await signIn('github',{callbackUrl: DEFAULT_LOGIN_REDIRECT});
            }}
            onGoogleProviderSubmit={async ()=>{
                await signIn('google',{callbackUrl: DEFAULT_LOGIN_REDIRECT});
            }}
            onLinkedinProviderSubmit={async ()=>{
                await signIn('linkedin',{callbackUrl: DEFAULT_LOGIN_REDIRECT});
            }}
            forgotPasswordFunction={()=>{router.push('/auth/forgot-password')}}
            backFunction={()=>{router.push('/auth/register')}}
            errorMessage={urlError}
        />
    )
}