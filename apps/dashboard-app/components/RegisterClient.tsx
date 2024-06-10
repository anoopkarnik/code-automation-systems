"use client"
import RegisterCard from '@repo/ui/components/RegisterCard';
import { Button } from '@repo/ui/components/ui/Button';
import { useRouter } from 'next/navigation';
import { register } from '../ actions/register';
import { signIn } from '@repo/next-auth/auth';
import { DEFAULT_LOGIN_REDIRECT } from '../routes';

export default function() {
    const router = useRouter();

    return (
        <RegisterCard
            showEmail={true}
            showGithubProvider={true}
            showGoogleProvider={true}
            onEmailSubmit={register}
            onGithubProviderSubmit={async ()=>{
                await signIn('github',{callbackUrl: DEFAULT_LOGIN_REDIRECT});
            }}
            onGoogleProviderSubmit={async ()=>{
                await signIn('google',{callbackUrl: DEFAULT_LOGIN_REDIRECT});
            }}
            backFunction={()=>{router.push('/auth/login')}}
        />
    )
}