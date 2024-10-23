import {
  HomeIcon,
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
                <DropdownMenuLabel>
                  <div className="flex flex-col text-button">
                    <div>{user?.name}</div>
                    <div className="text-description">{user?.email}</div>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem className="cursor-pointer">
                        <HomeIcon className="mr-2 h-4 w-4" />
                        <span className="text-paragraph">Home</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem  className="cursor-pointer" onClick={()=>setShowModal(!showModal)}>
                        <Settings className="mr-2 h-4 w-4" />
                        <span className="text-paragraph">Settings</span>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logoutFunction} className="cursor-pointer">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span className="text-paragraph">Log out</span>
                </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            {showModal && <SettingsDialog onClose={()=>setShowModal(false)} user={user} resetFunction={resetFunction} />}
        </>
    )
  }
  