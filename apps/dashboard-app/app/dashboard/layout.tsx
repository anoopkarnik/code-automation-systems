import NavbarClient  from "../../components/NavbarClient";

export default async function Layout({children}:{children: React.ReactNode}){

    return (
        <div className="w-full overflow-hidden">
            <NavbarClient />
            {children}
        </div>
    )
}
