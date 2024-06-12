"use client"
import { signIn } from 'next-auth/react';
import { redirect, useRouter } from 'next/navigation';
import LoginClient from '../../../components/LoginClient';
import QuoteClient from '../../../components/QuoteClient';
import { Suspense } from 'react';
import LoadingClient from '../../../components/LoadingClient';

export default function() {

    return (
        <div className='min-h-screen grid grid-cols-1 lg:grid-cols-2 '>
            <div className='flex items-center justify-center bg-gradient-to-br from-violet-400/30 to-black/90 dark:bg-gradient-to-br'>
                <Suspense fallback={<LoadingClient/>}>
                    <LoginClient />
                </Suspense>
            </div>
            <div className='hidden lg:block bg-white'>
                <QuoteClient/>
            </div>
        </div>
    )
}