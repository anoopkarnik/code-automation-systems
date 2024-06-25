"use client"
import QuoteClient from '../_components/QuoteClient';
import ErrorClient from '../_components/ErrorClient';

export default function page() {

    return (
        <div className='grid grid-cols-1 lg:grid-cols-2 '>
            <div className='flex items-center justify-center bg-gradient-to-br from-violet-400/30 to-black/90 dark:bg-gradient-to-br'>
                <ErrorClient />
            </div>
            <div className='invisible lg:visible bg-white'>
                <QuoteClient/>
            </div>
        </div>
    )
}