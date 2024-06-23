'use client'

import { Navbar } from "@repo/ui/components/Navbar"
import { useTheme } from "next-themes"
import { useRouter } from "next/navigation";
import { logout } from "../actions/logout";   
import { useCurrentUser } from "../hooks/useCurrentUser";
import { resetPasswordSettings } from "../actions/reset-password-settings";
import { signOut } from "next-auth/react";

export default function NavbarClient() {
    const { theme, setTheme } = useTheme()
    const router = useRouter();
    const user = useCurrentUser();

    return (
            <Navbar 
                appName="BWA"
                appIcon=""
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
