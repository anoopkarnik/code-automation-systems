"use client"
import RegisterCard from '@repo/ui/organisms/auth/RegisterCard';
import { useRouter } from 'next/navigation';
import { register } from '../../actions/auth/register';
import { signIn,useSession } from 'next-auth/react';
import { DEFAULT_LOGIN_REDIRECT } from '../../routes';

export default function RegisterClient() {
    const router = useRouter();

    return (
        <RegisterCard
            showEmail={true}
            showGithubProvider={true}
            showGoogleProvider={true}
            showLinkedinProvider={true}
            onEmailSubmit={register}
            onGithubProviderSubmit={async ()=>{
                await signIn('github',{callbackUrl: DEFAULT_LOGIN_REDIRECT});
            }}
            onGoogleProviderSubmit={async ()=>{
                await signIn('google',{callbackUrl: DEFAULT_LOGIN_REDIRECT});
            }}
            onLinkedinProviderSubmit={async ()=>{
                await signIn('linkedin',{callbackUrl: DEFAULT_LOGIN_REDIRECT});
            }}
            backFunction={()=>{router.push('/auth/login')}}
        />
    )
}