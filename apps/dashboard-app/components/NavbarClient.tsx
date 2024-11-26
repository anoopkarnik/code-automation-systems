'use client'

import { Navbar } from "@repo/ui/organisms/home/Navbar"
import { useTheme } from "next-themes"
import { useRouter } from "next/navigation";
import { resetPasswordSettings } from "../app/actions/settings/reset-password-settings";
import { getSession, signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useLocation } from "react-use";
import { usePathname } from "next/navigation";


export default function NavbarClient() {
    const { theme, setTheme } = useTheme()
    const router = useRouter();
    const [user, setUser] = useState<any>(null);
    const { data:session, status } = useSession();
    const [title, setTitle] = useState('');
    const pathname = usePathname();
    

    useEffect(() => {
        const refreshSession = async () => {
            if(pathname?.includes('/editor/')){
                return 
            }
            const pathSegments = pathname?.split('/').filter(Boolean);
            let extractedTitle:any = pathSegments?.length > 0 ? pathSegments[pathSegments.length - 1]?.replaceAll("-","") : '';
            const formattedTitle = extractedTitle.charAt(0).toUpperCase() + extractedTitle.slice(1);
            setTitle(formattedTitle);
        };

         refreshSession();
        
    }, [status,pathname,session]);
    return (
            <Navbar 
                title={title}
                screens={[]}
                user= {session?.user}
                setTheme={setTheme}
                onSignin={()=>{router.push('/auth/login')}}
                onSignout={async() => await signOut()}
                resetFunction={resetPasswordSettings}
            />
    )
}
