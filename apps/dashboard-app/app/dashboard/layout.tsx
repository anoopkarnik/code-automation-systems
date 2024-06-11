import { NavbarClient } from "../../components/NavbarClient";
import {auth} from '@repo/next-auth/auth'

export default async function Layout({children}:{children: React.ReactNode}){
    const session = await auth() 
    return (
        <div className="w-full overflow-hidden">
            <NavbarClient />
            {children}
        </div>
    )
}
