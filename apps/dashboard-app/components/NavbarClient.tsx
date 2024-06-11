'use client'

import { Navbar } from "@repo/ui/components/Navbar"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { useRouter } from "next/navigation";
import { useSession} from "next-auth/react"
import { logout } from "../ actions/logout";
import {DEFAULT_LOGIN_REDIRECT} from "../routes" 
import { useEffect } from "react";       
import { useCurrentUser } from "../hooks/useCurrentUser";
import { resetPasswordSettings } from "../ actions/reset-password-settings";

export function NavbarClient() {
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
                onSignout={async () =>{await logout();router.push('/auth/login');}}
                resetFunction={resetPasswordSettings}
            />
    )
}
