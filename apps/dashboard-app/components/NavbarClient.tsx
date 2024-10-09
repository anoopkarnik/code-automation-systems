'use client'

import { Navbar } from "@repo/ui/organisms/home/Navbar"
import { useTheme } from "next-themes"
import { useRouter } from "next/navigation";
import { resetPasswordSettings } from "../app/actions/settings/reset-password-settings";
import { getSession, signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useLocation } from "react-use";

export default function NavbarClient() {
    const { theme, setTheme } = useTheme()
    const router = useRouter();
    const [user, setUser] = useState<any>(null);
    const { data, status } = useSession();
    const [title, setTitle] = useState('');
    const location = useLocation();


    useEffect(() => {
        const refreshSession = async () => {
            const session = await getSession();
            const pathSegments = location?.pathname?.split('/').filter(Boolean);
            let extractedTitle:any = pathSegments && pathSegments.length > 0 ? pathSegments[pathSegments.length - 1] : '';
            extractedTitle = extractedTitle.replaceAll("-"," ")
            const formattedTitle = extractedTitle.charAt(0).toUpperCase() + extractedTitle.slice(1);
            setTitle(formattedTitle);
            setUser(session?.user);
        };

         refreshSession();
        
    }, [status,location.pathname]);
    return (
            <Navbar 
                title={title}
                screens={[]}
                user= {user}
                setTheme={setTheme}
                onSignin={()=>{router.push('/auth/login')}}
                onSignout={async() => await signOut()}
                resetFunction={resetPasswordSettings}
            />
    )
}
