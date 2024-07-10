
import LeftSidebarClient from "../../components/LeftSidebarClient";
import NavbarClient  from "../../components/NavbarClient";

export default async function Layout({children}:{children: React.ReactNode}){

    return (
        <div className="flex min-h-screen max-h-screen overflow-y-hidden">
            <LeftSidebarClient/>
            <div className="flex flex-col w-full max-w-full overflow-x-hidden">
                <NavbarClient />
                <div className="flex max-w-full overflow-auto ">
                    {children}
                </div>
            </div>
        </div>
    )
}
