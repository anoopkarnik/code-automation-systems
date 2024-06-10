"use client"
import { signIn } from 'next-auth/react';
import { redirect, useRouter } from 'next/navigation';
import LoginClient from '../../../components/LoginClient';
import QuoteClient from '../../../components/QuoteClient';

export default function() {

    return (
        <div className='grid grid-cols-1 lg:grid-cols-2 '>
            <div className='flex items-center justify-center bg-gradient-to-br from-violet-400/30 to-black/90 dark:bg-gradient-to-br'>
                <LoginClient />
            </div>
            <div className='invisible lg:visible bg-white'>
                <QuoteClient/>
            </div>
        </div>
    )
}