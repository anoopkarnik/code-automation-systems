import LeftSidebarClient from "../../components/LeftSidebarClient";
import NavbarClient  from "../../components/NavbarClient";

export default async function Layout({children}:{children: React.ReactNode}){

    return (
        <div className="overflow-hidden flex">
            <LeftSidebarClient/>
            <div className="flex flex-col w-full ">
                <NavbarClient />
                <div className="flex">
                    {children}
                </div>
            </div>
        </div>
    )
}
