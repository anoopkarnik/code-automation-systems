"use client"

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import ResetPasswordCard from '@repo/ui/organisms/common/ResetPasswordCard';
import { resetPassword} from '../ actions/reset-password';
import { verifyResetToken } from '../ actions/verify-reset-token';
import ErrorCard from '@repo/ui/organisms/common/ErrorCard';


export default function ResetPasswordClient() {
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
    },[token,error,success])
    
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