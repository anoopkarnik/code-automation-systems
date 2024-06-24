'use client'

import { Navbar } from "@repo/ui/organisms/common/Navbar"
import { useTheme } from "next-themes"
import { useRouter } from "next/navigation";
import { useCurrentUser } from "../hooks/useCurrentUser";
import { resetPasswordSettings } from "../ actions/reset-password-settings";
import { signOut } from "next-auth/react";

export default function NavbarClient() {
    const { theme, setTheme } = useTheme()
    const router = useRouter();
    const user = useCurrentUser();

    return (
            <Navbar 
                appName="Personal Dashboard"
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
