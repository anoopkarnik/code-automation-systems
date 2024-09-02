'use client'

import { Navbar } from "@repo/ui/organisms/home/Navbar"
import { useTheme } from "next-themes"
import { useRouter } from "next/navigation";
import { useCurrentUser } from "../hooks/useCurrentUser";
import { resetPasswordSettings } from "../actions/settings/reset-password-settings";
import { getSession, signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function NavbarClient() {
    const { theme, setTheme } = useTheme()
    const router = useRouter();
    const [user, setUser] = useState<any>(null);
    const { data, status } = useSession();

    useEffect(() => {
        const refreshSession = async () => {
            const session = await getSession();
            setUser(session?.user);
        };

         refreshSession();
        
    }, [status]);
    return (
            <Navbar 
                appName="Personal Automation Dashboard"
                appIcon="https://raw.githubusercontent.com/anoopkarnik/personal-apps/main/apps/dashboard-app/public/apps.png"
                screens={[
                ]}
                user= {user}
                setTheme={setTheme}
                onSignin={()=>{router.push('/auth/login')}}
                onSignout={async() => await signOut()}
                resetFunction={resetPasswordSettings}
            />
    )
}
