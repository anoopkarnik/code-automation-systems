"use client"

import ErrorCard from '@repo/ui/organisms/auth/ErrorCard';
import { useRouter } from 'next/navigation';


export default function ErrorClient() {
    const router = useRouter();

    return (
        <ErrorCard 
            backFunction={()=>{router.push('/auth/login')}}
        />
    )
}