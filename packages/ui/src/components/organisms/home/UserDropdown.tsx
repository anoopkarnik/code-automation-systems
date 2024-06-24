import {
    LogOut,
    Settings,
  } from "lucide-react"
  
  import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "../../molecules/shadcn/Dropdown"
import { SettingsDialog } from "../settings/SettingsDialog"
import { useState } from "react"
  
  export function UserDropdown({triggerChildren,logoutFunction,user,resetFunction}:any) {
    const [showModal, setShowModal] = useState(false)
    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                {triggerChildren}
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 static">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem onClick={()=>setShowModal(!showModal)}>
                        <Settings className="mr-2 h-4 w-4" />
                        <span>Settings</span>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logoutFunction}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            {showModal && <SettingsDialog onClose={()=>setShowModal(false)} user={user} resetFunction={resetFunction} />}
        </>
    )
  }
  