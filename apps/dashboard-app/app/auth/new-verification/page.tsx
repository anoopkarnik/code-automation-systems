"use client"
import { Suspense } from 'react';
import QuoteClient from '../../../components/QuoteClient';
import VerificationClient from '../../../components/VerificationClient';
import LoadingClient from '../../../components/LoadingClient';

export default function() {

    return (
        <div className='grid grid-cols-1 lg:grid-cols-2 '>
            <div className='flex items-center justify-center bg-gradient-to-br from-violet-400/30 to-black/90 dark:bg-gradient-to-br'>
                <Suspense fallback={<LoadingClient/>}>
                    <VerificationClient />
                </Suspense>
            </div>
            <div className='invisible lg:visible bg-white'>
                <QuoteClient/>
            </div>
        </div>
    )
}