"use client"


import VerificationCard from '@repo/ui/organisms/auth/VerificationCard';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { newVerification } from '../../../actions/auth/new-verification';


export default function VerificationClient() {
    const router = useRouter();
    const [error, setError] = useState<string | undefined>()
    const [success, setSuccess] = useState<string | undefined>()
    const searchParams = useSearchParams();
    const token = searchParams.get('token');

    const onSubmit = useCallback(async()=>{
        if (success || error) return;
        if(!token){
            setError("Missing token!")
            return
        }
        try{
            const data = await newVerification(token)
            setSuccess(data?.success)
            setError(data?.error)
        }catch(e){
            setError("Something went wrong!")
        }
    },[token,success,error])

    useEffect(()=>{
        onSubmit()
    },[onSubmit])
    
    return (
        <VerificationCard
            error={error}
            success={success}
            backFunction={()=>{router.push('/auth/login')}}
        />
    )
}