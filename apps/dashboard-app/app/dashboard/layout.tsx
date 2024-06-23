import LeftSidebarClient from "../../components/LeftSidebarClient";
import NavbarClient  from "../../components/NavbarClient";

export default async function Layout({children}:{children: React.ReactNode}){

    return (
        <div className="w-full overflow-hidden">
            <NavbarClient />
            <div className="flex flex-col">
                <LeftSidebarClient/>
                {children}
            </div>
        </div>
    )
}
