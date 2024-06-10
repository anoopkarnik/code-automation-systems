"use client"
import { signIn } from 'next-auth/react';
import { redirect, useRouter } from 'next/navigation';
import QuoteClient from '../../../components/QuoteClient';
import RegisterClient from '../../../components/RegisterClient';

export default function() {

    return (
        <div className='grid grid-cols-1 lg:grid-cols-2 '>
            <div className='flex items-center justify-center bg-gradient-to-br from-primary/30 to-background'>
                <RegisterClient />
            </div>
            <div className='invisible lg:visible bg-white'>
                <QuoteClient/>
            </div>
        </div>
    )
}