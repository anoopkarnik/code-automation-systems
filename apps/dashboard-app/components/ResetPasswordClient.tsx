"use client"


import VerificationCard from '@repo/ui/components/VerificationCard';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { newVerification } from '../ actions/new-verification';
import ResetPasswordCard from '@repo/ui/components/ResetPasswordCard';
import { resetPassword} from '../ actions/reset-password';
import { verifyResetToken } from '../ actions/verify-reset-token';
import ErrorCard from '@repo/ui/components/ErrorCard';


export default function() {
    const router = useRouter();
    const [error, setError] = useState<string | undefined>('')
    const [success, setSuccess] = useState<string | undefined>('')
    const searchParams = useSearchParams();
    const token = searchParams.get('token');
    
    useEffect(()=>{
        if (!token){
            setError("No token provided!")
        }
        verifyResetToken(token as string)
        .then((data:any)=>{
            setError(data?.error);
            setSuccess(data?.success);
        })
    },[])
    if (error){
        return (
            <ErrorCard
                errorMessage={error}
                backFunction={()=>{router.push('/auth/login')}}
            />
        )
    }
    else if (success){
        return (
            <ResetPasswordCard
                errorMessage={error}
                successMessage={success}
                token={token as string}
                resetFunction={resetPassword}
                backFunction={()=>{router.push('/auth/login')}}
            />
        )
    }

}