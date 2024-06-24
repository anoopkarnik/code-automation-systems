"use client"
import LoginClient from '../../../components/auth/LoginClient';
import QuoteClient from '../../../components/auth/QuoteClient';
import { Suspense } from 'react';
import LoadingClient from '../../../components/LoadingClient';

export default function page() {

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