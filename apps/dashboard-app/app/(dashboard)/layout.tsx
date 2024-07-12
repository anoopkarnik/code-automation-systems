
import LeftSidebarClient from "../../components/LeftSidebarClient";
import NavbarClient  from "../../components/NavbarClient";

export default async function Layout({children}:{children: React.ReactNode}){

    return (
        <div className="flex flex-col min-h-screen max-h-screen overflow-y-hidden">
            <NavbarClient />        
            <div className="flex w-full max-w-full overflow-x-hidden">
                <LeftSidebarClient/>
                <div className="flex max-w-full overflow-auto w-full">
                    {children}
                </div>
            </div>
        </div>
    )
}
