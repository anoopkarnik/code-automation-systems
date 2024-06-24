"use client"

import LoadingCard from '@repo/ui/organisms/common/LoadingCard';
import { useRouter } from 'next/navigation';


export default function LoadingClient() {
    const router = useRouter();

    return (
        <LoadingCard
        />
    )
}