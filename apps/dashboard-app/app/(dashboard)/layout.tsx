
import LeftSidebarClient from "../../components/LeftSidebarClient";
import NavbarClient  from "../../components/NavbarClient";

export default async function Layout({children}:{children: React.ReactNode}){

    return (
      <div className="flex min-h-screen max-h-screen overflow-hidden">
          <LeftSidebarClient />
          
          <div className="flex flex-col flex-grow  overflow-hidden">
            <NavbarClient />
            <div className="flex-grow overflow-auto ">
              {children}
            </div>
          </div>
      </div>
    )
}
