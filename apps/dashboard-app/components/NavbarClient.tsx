'use client'

import { Navbar } from "@repo/ui/components/Navbar"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import {signIn, signOut, useSession} from 'next-auth/react';
import { useRouter } from "next/navigation";


export function NavbarClient() {
    const { theme, setTheme } = useTheme()
    const session:any = useSession();
    const router = useRouter();
    async function handleSignOut() {
        await signOut();
        router.push('/api/auth/signin');
      }
    return (
            <Navbar 
                appName="Personal Dashboard"
                appIcon="https://raw.githubusercontent.com/anoopkarnik/personal-apps/main/apps/dashboard-app/public/apps.png"
                screens={[
                    {screenName: "Home"},
                    {screenName: "About"},
                    {screenName: "Contact"}
                ]}
                user= {session?.data?.user}
                setTheme={setTheme}
                onSignin={signIn}
                onSignout={handleSignOut}
            />
    )
}
