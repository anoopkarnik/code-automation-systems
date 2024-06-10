"use client"
import { signIn } from 'next-auth/react';
import { redirect, useRouter } from 'next/navigation';
import LoginClient from '../../../components/LoginClient';
import QuoteClient from '../../../components/QuoteClient';

export default function() {

    return (
        <div className='grid grid-cols-1 lg:grid-cols-2 '>
            <div className='flex items-center justify-center bg-gradient-to-br from-primary/30 to-background'>
                <LoginClient />
            </div>
            <div className='invisible lg:visible bg-white'>
                <QuoteClient/>
            </div>
        </div>
    )
}