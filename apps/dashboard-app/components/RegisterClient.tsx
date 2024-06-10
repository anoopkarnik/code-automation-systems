"use client"
import RegisterCard from '@repo/ui/components/RegisterCard';
import { Button } from '@repo/ui/components/ui/Button';
import { signIn,useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { register } from '../ actions/register';


export default function() {
    const router = useRouter();

    return (
        <RegisterCard
            showEmail={true}
            showGithubProvider={true}
            showGoogleProvider={true}
            onEmailSubmit={register}
            onGithubProviderSubmit={()=>{}}
            onGoogleProviderSubmit={()=>{}}
            loginFunction={()=>{router.push('login')}}
        />
    )
}