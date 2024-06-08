import { NavbarClient } from "../../../components/NavbarClient";

export default function Layout({children}:{children: React.ReactNode}): JSX.Element
    {
        return (
            <div className="w-full overflow-hidden">
                <NavbarClient />
                {children}
            </div>
        )
    }
